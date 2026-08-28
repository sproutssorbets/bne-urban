"""
Automatyczna wersja match_thumbs.py, uruchamiana przez GitHub Actions.

Różnice względem wersji ręcznej:
- medias.xml pobierany bezpośrednio z PhotoDeck (URL z tokenem w zmiennej
  środowiskowej PHOTODECK_MEDIAS_URL, ustawianej z GitHub Secrets)
- czyta i nadpisuje locations.csv w tym samym repo, w miejscu, gdzie skrypt
  jest uruchamiany (workflow robi wcześniej checkout repo)
- logika dopasowania (ref -> tytuł -> grupowanie -> thumbs -> count)
  identyczna jak w wersji ręcznej
- NOWE: wykrywa lokalizacje obecne w medias.xml, których jeszcze nie ma w
  locations.csv (żaden ref nie pasuje), i dopisuje dla nich nowy wiersz
  z gotowymi danymi. Pola, których nie da się wyciągnąć automatycznie —
  lat, lng (PhotoDeck nie eksponuje GPS) i suburb (PhotoDeck zwraca tylko
  ogólne "Brisbane" w polu city, nie konkretną dzielnicę) — zostają puste,
  do ręcznego uzupełnienia.
- NOWE: przegląda folder gps-drop/ w repo w poszukiwaniu zdjęć z zapisanym
  GPS i Sublocation (np. małych podglądów JPEG wyeksportowanych z
  Lightrooma po ustawieniu pinezki w module Map). Dopasowuje je po nazwie
  pliku (ref) do wierszy z pustym lat/lng/suburb, uzupełnia te pola,
  i usuwa przetworzone zdjęcia z folderu, żeby nie przetwarzać ich
  ponownie przy kolejnym uruchomieniu.
"""

import csv
import gzip
import os
import re
import shutil
import subprocess
import sys
import urllib.parse
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error
from datetime import datetime, timezone

MEDIAS_URL = os.environ.get("PHOTODECK_MEDIAS_URL")
CSV_PATH = "locations.csv"
GPS_DROP_DIR = "gps-drop"

if not MEDIAS_URL:
    print("Brak PHOTODECK_MEDIAS_URL w zmiennych środowiskowych — przerywam.", file=sys.stderr)
    sys.exit(1)


def fetch_xml(url):
    req = urllib.request.Request(url, headers={"User-Agent": "photoindex-thumb-sync/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            status = resp.status
            body = resp.read()
    except urllib.error.HTTPError as e:
        print(f"HTTP error {e.code} przy pobieraniu medias.xml", file=sys.stderr)
        print(f"Treść odpowiedzi (pierwsze 500 znaków): {e.read()[:500]!r}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Błąd połączenia przy pobieraniu medias.xml: {e.reason}", file=sys.stderr)
        sys.exit(1)

    print(f"Pobrano medias.xml, status HTTP {status}, {len(body)} bajtów", file=sys.stderr)

    # Serwer bywa skonfigurowany tak, by zawsze wysyłać zawartość spakowaną
    # gzipem, niezależnie od nagłówka Accept-Encoding — urllib, w przeciwieństwie
    # do przeglądarki, nie dekompresuje tego automatycznie. Rozpoznajemy to po
    # sygnaturze magicznych bajtów gzipa (0x1f 0x8b) na początku odpowiedzi.
    if body[:2] == b"\x1f\x8b":
        body = gzip.decompress(body)
        print(f"Odpowiedź była spakowana gzipem — rozpakowano do {len(body)} bajtów", file=sys.stderr)

    if not body.lstrip().startswith(b"<"):
        # to, co przyszło, nie wygląda na XML — pokaż fragment, żeby było
        # widać w logu co faktycznie zwrócił serwer (np. stronę błędu HTML)
        print(f"UWAGA: odpowiedź nie zaczyna się od '<'. Pierwsze 500 znaków: {body[:500]!r}", file=sys.stderr)
    return body


def strip_date(title):
    return title.rsplit(",", 1)[0].strip()


def ref_from_filename(filename):
    base = re.sub(r"\.[A-Za-z0-9]+$", "", filename)
    base = re.sub(r"\s+copy$", "", base, flags=re.IGNORECASE)
    return base.strip()


def read_gps_drop_folder():
    """Uruchamia ExifTool na folderze gps-drop/ i zwraca
    {ref: (suburb, lat, lng)} dla każdego znalezionego zdjęcia z GPS."""
    if not os.path.isdir(GPS_DROP_DIR):
        return {}, []

    files = [f for f in os.listdir(GPS_DROP_DIR) if os.path.isfile(os.path.join(GPS_DROP_DIR, f))]
    if not files:
        return {}, []

    try:
        result = subprocess.run(
            ["exiftool", "-csv", "-filename", "-sublocation", "-gpslatitude", "-gpslongitude", "-n", GPS_DROP_DIR],
            capture_output=True, text=True, check=True,
        )
    except FileNotFoundError:
        print("ExifTool nie jest zainstalowany na tym runnerze — pomijam gps-drop/.", file=sys.stderr)
        return {}, []
    except subprocess.CalledProcessError as e:
        print(f"ExifTool zwrócił błąd przy przetwarzaniu gps-drop/: {e.stderr}", file=sys.stderr)
        return {}, []

    gps_data = {}
    processed_files = []
    reader = csv.DictReader(result.stdout.splitlines())
    for row in reader:
        filename = row.get("FileName", "").strip()
        lat = row.get("GPSLatitude", "").strip()
        lng = row.get("GPSLongitude", "").strip()
        suburb = (row.get("Sublocation") or row.get("Sub-location") or "").strip()
        if not filename or not lat or not lng:
            continue
        ref = ref_from_filename(filename)
        gps_data[ref] = (suburb, lat, lng)
        processed_files.append(filename)

    return gps_data, processed_files


def normalize_key(title_key):
    if "/" in title_key:
        parts = [p.strip() for p in title_key.split("/")]
        return " / ".join(sorted(parts))
    return title_key


def main():
    xml_bytes = fetch_xml(MEDIAS_URL)
    root = ET.fromstring(xml_bytes)

    media_by_filename = {}
    media_by_title = {}

    for m in root.iter("media"):
        filename = m.findtext("file-name", "").rsplit(".", 1)[0]
        title_full = m.findtext("title", "")
        title_key = normalize_key(strip_date(title_full))
        thumb = m.findtext("thumbnail-url", "")
        date_created = m.findtext("date-created", "")

        media_by_filename[filename] = {"title": title_key, "thumb": thumb}
        media_by_title.setdefault(title_key, []).append(
            {"thumb": thumb, "date": date_created, "filename": filename}
        )

    if not os.path.exists(CSV_PATH):
        print(f"Nie znaleziono {CSV_PATH} w repo — przerywam.", file=sys.stderr)
        sys.exit(1)

    rows = []
    changed = False
    unmatched = []

    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames if "thumbs" in reader.fieldnames else reader.fieldnames + ["thumbs"]
        for row in reader:
            ref = row.get("ref", "").strip()
            anchor = media_by_filename.get(ref)

            if anchor is None:
                unmatched.append((row.get("street"), ref))
            else:
                true_title = anchor["title"]
                group = sorted(media_by_title.get(true_title, []), key=lambda x: x["date"])
                thumbs = [g["thumb"] for g in group]
                new_thumbs = ";".join(thumbs)
                new_count = str(len(thumbs))

                if row.get("thumbs", "") != new_thumbs or row.get("count", "") != new_count:
                    changed = True
                row["thumbs"] = new_thumbs
                row["count"] = new_count

            rows.append(row)

    if unmatched:
        print("Brak dopasowania (ref nie znaleziony w medias.xml):", file=sys.stderr)
        for street, ref in unmatched:
            print(f"  - {street} (ref: {ref})", file=sys.stderr)

    # --- Wykrywanie nowych lokalizacji, których jeszcze nie ma w CSV ---
    # Zbierz wszystkie ref-y już obecne w locations.csv (niezależnie od tego,
    # czy się dopasowały, czy nie — liczy się sama obecność w pliku).
    existing_refs = {row.get("ref", "").strip() for row in rows}

    new_rows_added = []
    for title_key, group in media_by_title.items():
        group_sorted = sorted(group, key=lambda x: x["date"])
        # jeśli którykolwiek plik z tej grupy jest już w CSV, lokalizacja
        # jest znana — pomijamy (obsłuży ją pętla dopasowania powyżej)
        if any(g["filename"] in existing_refs for g in group_sorted):
            continue

        anchor = group_sorted[0]  # najstarsze zdjęcie w grupie jako punkt odniesienia
        thumbs = ";".join(g["thumb"] for g in group_sorted)

        try:
            dt = datetime.strptime(anchor["date"], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
            date_str = f"{dt.day}/{dt.month}/{dt.year}"
        except ValueError:
            date_str = ""

        today = datetime.now(timezone.utc)
        update_batch = f"{today.day} {today.strftime('%B')} {today.year}"

        new_row = {
            "street": title_key,
            "suburb": "",  # PhotoDeck nie podaje konkretnej dzielnicy — do uzupełnienia ręcznie
            "lat": "",     # PhotoDeck nie eksponuje GPS — do uzupełnienia ręcznie (np. przez match_gps.py)
            "lng": "",
            "date": date_str,
            "count": str(len(group_sorted)),
            "address": title_key,
            "ref": anchor["filename"],
            "archiveUrl": "https://www.photoindex.au/?search=" + urllib.parse.quote_plus(title_key),
            "licenseUrl": "https://www.photoindex.au/licensing",
            "thumb": "",
            "shoot_dates": date_str,
            "update_batch": update_batch,
            "thumbs": thumbs,
        }
        rows.append(new_row)
        new_rows_added.append(title_key)
        changed = True

    if new_rows_added:
        print(f"\nDodano {len(new_rows_added)} nowych lokalizacji (brak lat/lng/suburb — uzupełnij ręcznie):", file=sys.stderr)
        for street in new_rows_added:
            print(f"  - {street}", file=sys.stderr)

    # --- Uzupełnianie GPS/suburb z folderu gps-drop/ ---
    gps_data, processed_files = read_gps_drop_folder()
    filled_from_drop = []
    if gps_data:
        for row in rows:
            if row.get("lat", "").strip():
                continue  # to pole już ma współrzędne, nie nadpisujemy
            ref = row.get("ref", "").strip()
            if ref in gps_data:
                suburb, lat, lng = gps_data[ref]
                row["lat"] = lat
                row["lng"] = lng
                if suburb:
                    row["suburb"] = suburb
                filled_from_drop.append(row.get("street"))
                changed = True

    if filled_from_drop:
        print(f"\nUzupełniono GPS/suburb z gps-drop/ dla {len(filled_from_drop)} lokalizacji:", file=sys.stderr)
        for street in filled_from_drop:
            print(f"  - {street}", file=sys.stderr)

    if processed_files:
        for fname in processed_files:
            fpath = os.path.join(GPS_DROP_DIR, fname)
            if os.path.exists(fpath):
                os.remove(fpath)
        print(f"Usunięto {len(processed_files)} przetworzonych plików z {GPS_DROP_DIR}/", file=sys.stderr)
        changed = True  # usunięcie plików z gps-drop/ też trzeba zacommitować

    if not changed:
        print("Brak zmian — locations.csv już aktualny.")
        # sygnalizuje workflow'owi, że nie ma nic do zacommitowania
        with open(os.environ.get("GITHUB_OUTPUT", os.devnull), "a") as gh_out:
            gh_out.write("changed=false\n")
        return

    with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Zaktualizowano {CSV_PATH}: {len(rows)} wierszy.")
    with open(os.environ.get("GITHUB_OUTPUT", os.devnull), "a") as gh_out:
        gh_out.write("changed=true\n")


if __name__ == "__main__":
    main()
