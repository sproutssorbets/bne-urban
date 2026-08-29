import csv
import xml.etree.ElementTree as ET

XML_PATH = "/home/claude/medias.xml"
CSV_IN = "/home/claude/locations.csv"
CSV_OUT = "/mnt/user-data/outputs/locations_with_thumbs.csv"

# 1. Wczytaj wszystkie media z XML, indeksując po nazwie pliku (bez rozszerzenia)
tree = ET.parse(XML_PATH)
root = tree.getroot()

media_by_filename = {}   # "PX-20260816-0697" -> dict(title, thumb, uuid)
media_by_title = {}       # title (bez daty) -> lista dict(thumb, date)

def strip_date(title):
    # "Edward Street / Charlotte Street, 16 August 2026" -> "Edward Street / Charlotte Street"
    return title.rsplit(",", 1)[0].strip()

def normalize_key(title_key):
    # skrzyżowania bywają zapisane w dwóch kolejnościach ("A / B" i "B / A"),
    # sortujemy alfabetycznie, żeby oba warianty trafiły do tej samej grupy
    if "/" in title_key:
        parts = [p.strip() for p in title_key.split("/")]
        return " / ".join(sorted(parts))
    return title_key

for m in root.iter("media"):
    filename = m.findtext("file-name", "").rsplit(".", 1)[0]
    title_full = m.findtext("title", "")
    title_key = normalize_key(strip_date(title_full))
    thumb = m.findtext("thumbnail-url", "")
    image = m.findtext("image-url", "")
    date_created = m.findtext("date-created", "")

    media_by_filename[filename] = {"title": title_key, "thumb": thumb}
    media_by_title.setdefault(title_key, []).append({"thumb": thumb, "image": image, "date": date_created})

# 2. Wczytaj CSV i dopasuj każdy wiersz przez ref -> prawdziwy tytuł -> wszystkie miniatury
rows = []
unmatched = []

with open(CSV_IN, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    fieldnames = list(reader.fieldnames)
    for col in ["thumbs", "images"]:
        if col not in fieldnames:
            fieldnames.append(col)
    for row in reader:
        ref = row.get("ref", "").strip()
        anchor = media_by_filename.get(ref)

        if anchor is None:
            unmatched.append((row.get("street"), ref))
            row["thumbs"] = ""
            row["images"] = ""
        else:
            true_title = anchor["title"]
            # sortuj chronologicznie po date-created, najstarsze pierwsze
            group = sorted(media_by_title.get(true_title, []), key=lambda x: x["date"])
            thumbs = [g["thumb"] for g in group]
            images = [g["image"] for g in group]
            row["thumbs"] = ";".join(thumbs)
            row["images"] = ";".join(images)
            # liczba zdjęć wynika teraz z faktycznego dopasowania, nie trzeba
            # jej już ręcznie liczyć ani wpisywać w CSV
            row["count"] = str(len(thumbs))
            if row.get("street", "").strip().lstrip("Intersection ").strip() != true_title \
               and row.get("street", "").strip() != true_title:
                # sygnalizuj rozbieżność między nazwą w CSV a prawdziwym tytułem w PhotoDeck
                pass  # obsłużone niżej w raporcie

        rows.append(row)

with open(CSV_OUT, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

# 3. Raport
print(f"Dopasowano {len(rows) - len(unmatched)} z {len(rows)} wierszy.")
if unmatched:
    print("Brak dopasowania (ref nie znaleziony w XML):")
    for street, ref in unmatched:
        print(f"  - {street}  (ref: {ref})")

print("\nRozbieżności nazwa w CSV vs prawdziwy tytuł w PhotoDeck:")
with open(CSV_IN, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        ref = row.get("ref", "").strip()
        anchor = media_by_filename.get(ref)
        if anchor:
            true_title = anchor["title"]
            csv_street = row.get("street", "").strip()
            csv_address = row.get("address", "").strip()
            if csv_address != true_title:
                print(f"  CSV: \"{csv_street}\"  |  address: \"{csv_address}\"  |  prawdziwy tytuł: \"{true_title}\"")
