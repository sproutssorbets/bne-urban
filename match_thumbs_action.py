"""
Automatyczna wersja match_thumbs.py, uruchamiana przez GitHub Actions.

Różnice względem wersji ręcznej:
- medias.xml pobierany bezpośrednio z PhotoDeck (URL z tokenem w zmiennej
  środowiskowej PHOTODECK_MEDIAS_URL, ustawianej z GitHub Secrets)
- czyta i nadpisuje locations.csv w tym samym repo, w miejscu, gdzie skrypt
  jest uruchamiany (workflow robi wcześniej checkout repo)
- logika dopasowania (ref -> tytuł -> grupowanie -> thumbs -> count)
  identyczna jak w wersji ręcznej
"""

import csv
import os
import sys
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error

MEDIAS_URL = os.environ.get("PHOTODECK_MEDIAS_URL")
CSV_PATH = "locations.csv"

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
    if not body.lstrip().startswith(b"<"):
        # to, co przyszło, nie wygląda na XML — pokaż fragment, żeby było
        # widać w logu co faktycznie zwrócił serwer (np. stronę błędu HTML)
        print(f"UWAGA: odpowiedź nie zaczyna się od '<'. Pierwsze 500 znaków: {body[:500]!r}", file=sys.stderr)
    return body


def strip_date(title):
    return title.rsplit(",", 1)[0].strip()


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
        media_by_title.setdefault(title_key, []).append({"thumb": thumb, "date": date_created})

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
