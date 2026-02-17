#!/usr/bin/env python3
"""
Temple Image Downloader
=======================
Downloads high-resolution temple images from Wikimedia Commons
for the Tamil Temples website.

Usage:
  python3 download-temple-images.py              # Download all missing images
  python3 download-temple-images.py --section murugan  # Download for one section
  python3 download-temple-images.py --force       # Re-download all images
  python3 download-temple-images.py --dry-run     # Show what would be downloaded

Requirements: pip install requests Pillow (optional: Pillow for resizing)
"""

import os
import sys
import json
import time
import argparse
import urllib.request
import urllib.parse
import urllib.error

# ============================================================
# Temple data - maps section/id to search terms
# ============================================================
TEMPLES = {
    "navagraha": {
        "1": "Suryanar Kovil temple",
        "2": "Thingalur Kailasanathar Temple",
        "3": "Vaitheeswaran Koil temple",
        "4": "Swetharanyeswarar Temple Thiruvenkadu",
        "5": "Apatsahayeswarar Temple Alangudi",
        "6": "Agneeswarar Temple Kanjanur",
        "7": "Dharbaranyeswarar Temple Thirunallar",
        "8": "Naganathaswamy Temple Thirunageswaram",
        "9": "Naganathar Temple Keezhaperumpallam",
    },
    "panchabhootha": {
        "1": "Ekambareswarar Temple Kanchipuram",
        "2": "Jambukeswarar Temple Thiruvanaikaval",
        "3": "Arunachaleswarar Temple Thiruvannamalai",
        "4": "Srikalahasti temple",
        "5": "Thillai Nataraja Temple Chidambaram",
    },
    "vinayagar": {
        "1": "Ucchi Pillayar Temple Trichy Rockfort",
        "2": "Pillayarpatti Karpaga Vinayagar Temple",
        "3": "Manakula Vinayagar Temple Pondicherry",
        "4": "Siddhivinayak Temple Mumbai",
        "5": "Thiruvalanchuzhi Vinayagar Temple",
        "6": "Thirupparankundram temple",
        "7": "Tiruchengode temple Namakkal",
        "8": "Selva Vinayagar Temple Thiruvaiyaru",
        "9": "Vellai Pillaiyar Temple Mylapore",
        "10": "Thirunageswaram temple",
        "11": "Saatchi Vinayagar Temple Kumbakonam",
        "12": "Karupar Swami Temple Ayyarpadi",
        "13": "Kanipakam Vinayagar Temple",
        "14": "Madhur Maha Ganapathi Temple",
        "15": "Patteeswarar Temple Kumbakonam",
        "16": "Avudaiyar Kovil temple",
        "17": "Thalaivasal temple Attur",
        "18": "Tiruchendur temple",
        "19": "Valampuri Vinayagar Temple Thanjavur",
        "20": "Ranjangudi temple Sivaganga",
        "21": "Eachanari Vinayagar Temple Coimbatore",
        "22": "Varasiddhi Vinayagar Temple Kanchipuram",
        "23": "Pillayar temple Kanchipuram",
        "24": "Vinayagar Temple Porur Chennai",
        "25": "Mahaganapathy Temple Tiruvidaimarudur",
    },
    "murugan": {
        "1": "Thirupparankundram Murugan Temple",
        "2": "Tiruchendur Murugan Temple",
        "3": "Palani Murugan Temple Dhandayuthapani",
        "4": "Swamimalai Murugan Temple",
        "5": "Thiruthani Murugan Temple",
        "6": "Pazhamudhircholai Murugan Temple",
        "7": "Marudhamalai Murugan Temple Coimbatore",
        "8": "Sikkal Singaravelan Temple",
        "9": "Kundrakudi Murugan Temple",
        "10": "Subrahmanya Temple Valliyoor",
        "11": "Ettukudi Murugan Temple",
        "12": "Viralimalai Murugan Temple",
        "13": "Thiruporur Murugan Temple Chennai",
        "14": "Kandha Kottam Chennai",
        "15": "Vayalur Murugan Temple Trichy",
        "16": "Thirumuruganpoondi Temple",
        "17": "Kumarakottam Temple Kanchipuram",
        "18": "Senganur Murugan Temple Karur",
        "19": "Thiruverkadu Murugan Temple Chennai",
        "20": "Pazhanisamy Temple Kodaikanal",
        "21": "Vadapalani Murugan Temple Chennai",
        "22": "Skandagiri Murugan Temple Salem",
        "23": "Malaikovil Murugan Temple Tiruvannamalai",
        "24": "Kundrathur Murugan Temple Chennai",
        "25": "Thirumuruganpundi temple Tiruchirappalli",
    },
    "amman": {
        "1": "Meenakshi Amman Temple Madurai",
        "2": "Kamakshi Amman Temple Kanchipuram",
        "3": "Samayapuram Mariamman Temple Trichy",
        "4": "Akilandeswari Temple Thiruvanaikaval",
        "5": "Kali Amman Temple Karur",
        "6": "Angala Parameswari Temple Melmalayanur",
        "7": "Karumariamman Temple Thiruverkadu Chennai",
        "8": "Punnainallur Mariamman Temple Thanjavur",
        "9": "Periyapalayathamman Temple Coimbatore",
        "10": "Kulothamman Temple Pazhaiyarai",
        "11": "Adhiparasakthi Temple Melmaruvathur",
        "12": "Bannari Mariamman Temple Erode",
        "13": "Thillai Kali Amman Temple Chidambaram",
        "14": "Mundakanni Amman Temple Kanchipuram",
        "15": "Vadivudai Amman Temple Tiruchirappalli",
        "16": "Mahalakshmi Temple Triplicane Chennai",
        "17": "Kapaleeshwarar Temple Mylapore",
        "18": "Ashtalakshmi Temple Besant Nagar Chennai",
        "19": "Kalikambal Temple Chennai",
        "20": "Kottai Mariamman Temple Dindigul",
        "21": "Sendamangalam temple Namakkal",
        "22": "Ponniyamman Temple Erode",
        "23": "Marundeeswarar Temple Tiruvanmiyur",
        "24": "Periyapalayathamman Temple Velachery Chennai",
        "25": "Kattu Muthaliamman Temple Puzhal",
    },
    "jyotirlinga": {
        "1": "Somnath temple Gujarat",
        "2": "Mallikarjuna temple Srisailam",
        "3": "Mahakaleshwar temple Ujjain",
        "4": "Omkareshwar temple",
        "5": "Kedarnath temple",
        "6": "Bhimashankar temple Maharashtra",
        "7": "Kashi Vishwanath Temple Varanasi",
        "8": "Trimbakeshwar Shiva Temple",
        "9": "Baidyanath temple Deoghar",
        "10": "Nageshwar Jyotirlinga temple",
        "11": "Ramanathaswamy Temple Rameswaram",
        "12": "Grishneshwar temple Ellora",
    },
    "sapthavidanga": {
        "1": "Thillai Nataraja Temple Chidambaram",
        "2": "Vadaaranyeswarar Temple Tiruvalangadu",
        "3": "Kutralanathar Temple Courtallam",
        "4": "Thyagarajar Temple Tiruvarur",
        "5": "Dharbaranyeswarar Temple Thirunallar",
        "6": "Kayarohanaswami Temple Nagapattinam",
        "7": "Nellaiappar Temple Tirunelveli",
    },
    "sapthasthanam": {
        "1": "Tiruchendur Murugan Temple",
        "2": "Thiruthani Murugan Temple",
        "3": "Swamimalai Murugan Temple",
        "4": "Palani Murugan Temple",
        "5": "Kundrathur Murugan Temple Chennai",
        "6": "Thirupparankundram Murugan Temple",
        "7": "Pazhamudhircholai Murugan Temple",
    },
    "ashtaveerattanam": {
        "1": "Thiruvadhigai temple Panruti",
        "2": "Kandiyur temple Thanjavur",
        "3": "Thiruvirkolam Cuddalore",
        "4": "Korukkai temple Mayiladuthurai",
        "5": "Vazhuvur temple Mayiladuthurai",
        "6": "Pariyalur temple Sirkazhi",
        "7": "Thirukkandalam temple Chidambaram",
        "8": "Thiruppararkundram temple Thiruvarur",
    },
    "panchasabhai": {
        "1": "Thillai Nataraja Temple Chidambaram",
        "2": "Meenakshi Temple Madurai Silver Hall",
        "3": "Nellaiappar Temple Tirunelveli",
        "4": "Kutralanathar Temple Courtallam",
        "5": "Vadaranyeswarar Temple Thiruvalangadu",
    },
    "panchaaranya": {
        "1": "Jambukeswarar Temple Thiruvanaikaval",
        "2": "Vedaaranyeswarar Temple Vedaranyam",
        "3": "Dharbaranyeswarar Temple Thirunallar",
        "4": "Mahavaneshwarar Temple",
        "5": "Sundararanyeswarar Temple",
    },
    "chardham": {
        "1": "Badrinath Temple",
        "2": "Jagannath Temple Puri",
        "3": "Dwarkadhish Temple Dwarka",
        "4": "Ramanathaswamy Temple Rameswaram",
    },
    "shaktipeethas": {
        "1": "Kamakshi Amman Temple Kanchipuram",
        "2": "Meenakshi Temple Madurai",
        "3": "Visalakshi Temple Varanasi",
        "4": "Kalighat Kali Temple Kolkata",
        "5": "Naina Devi Temple Himachal Pradesh",
        "6": "Jwala Ji Temple Kangra",
        "7": "Chamundeshwari Temple Mysore",
        "8": "Bhramaramba Temple Srisailam",
        "9": "Tarapith Temple Birbhum",
        "10": "Ambaji Temple Gujarat",
    },
    "navatirupathi": {
        "1": "Vaikundam Perumal Temple Sri Vaikundam",
        "2": "Vijayasana Perumal Temple",
        "3": "Thirupulingudu Perumal Temple",
        "4": "Srinivasa Perumal Temple Thirukulanthai",
        "5": "Aravinda Lochana Perumal Temple",
        "6": "Then Thirupperai Perumal Temple",
        "7": "Thirukkoloor Perumal Temple",
        "8": "Alwar Thirunagiri temple",
        "9": "Thothadrinatha Perumal Temple Nanguneri",
    },
}

# Wikimedia Commons API base
COMMONS_API = "https://commons.wikimedia.org/w/api.php"
# Wikipedia API for page images
WIKI_API = "https://en.wikipedia.org/w/api.php"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGES_DIR = os.path.join(BASE_DIR, "images")

MAX_WIDTH = 800  # Resize to max 800px width


def search_wikimedia_commons(query, limit=5):
    """Search Wikimedia Commons for images matching the query."""
    params = {
        "action": "query",
        "list": "search",
        "srsearch": query,
        "srnamespace": "6",  # File namespace
        "srlimit": str(limit),
        "format": "json",
    }
    url = COMMONS_API + "?" + urllib.parse.urlencode(params)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "TempleImageBot/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            results = data.get("query", {}).get("search", [])
            # Filter for image files
            image_titles = []
            for r in results:
                title = r.get("title", "")
                if any(title.lower().endswith(ext) for ext in [".jpg", ".jpeg", ".png"]):
                    image_titles.append(title)
            return image_titles
    except Exception as e:
        print(f"  Search error: {e}")
        return []


def search_wikipedia_image(query):
    """Search Wikipedia for a page and get its main image."""
    params = {
        "action": "query",
        "titles": query,
        "prop": "pageimages",
        "piprop": "original",
        "format": "json",
    }
    url = WIKI_API + "?" + urllib.parse.urlencode(params)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "TempleImageBot/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            pages = data.get("query", {}).get("pages", {})
            for page_id, page in pages.items():
                if page_id != "-1":
                    original = page.get("original", {})
                    if original.get("source"):
                        return original["source"]
    except Exception as e:
        print(f"  Wikipedia search error: {e}")
    return None


def get_image_url(file_title):
    """Get the actual download URL for a Wikimedia Commons file."""
    params = {
        "action": "query",
        "titles": file_title,
        "prop": "imageinfo",
        "iiprop": "url|size|mime",
        "iiurlwidth": str(MAX_WIDTH),
        "format": "json",
    }
    url = COMMONS_API + "?" + urllib.parse.urlencode(params)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "TempleImageBot/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            pages = data.get("query", {}).get("pages", {})
            for page_id, page in pages.items():
                if page_id != "-1":
                    imageinfo = page.get("imageinfo", [{}])[0]
                    # Prefer thumbnail URL at our desired width if available
                    thumb_url = imageinfo.get("thumburl")
                    full_url = imageinfo.get("url")
                    mime = imageinfo.get("mime", "")
                    if "image" in mime:
                        return thumb_url or full_url
    except Exception as e:
        print(f"  URL lookup error: {e}")
    return None


def download_image(url, filepath):
    """Download an image from a URL to a filepath."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "TempleImageBot/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
            if len(data) < 1000:
                print(f"  Skipping: file too small ({len(data)} bytes)")
                return False
            with open(filepath, "wb") as f:
                f.write(data)
            size_kb = len(data) / 1024
            print(f"  Downloaded: {size_kb:.0f} KB -> {filepath}")
            return True
    except Exception as e:
        print(f"  Download error: {e}")
        return False


def try_resize(filepath):
    """Try to resize image if Pillow is available."""
    try:
        from PIL import Image
        img = Image.open(filepath)
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            new_size = (MAX_WIDTH, int(img.height * ratio))
            img = img.resize(new_size, Image.LANCZOS)
            img.save(filepath, "JPEG", quality=85)
            print(f"  Resized to {new_size[0]}x{new_size[1]}")
    except ImportError:
        pass  # Pillow not available, skip resize
    except Exception as e:
        print(f"  Resize warning: {e}")


def download_temple_image(section, num, search_term, force=False, dry_run=False):
    """Download a single temple image."""
    section_dir = os.path.join(IMAGES_DIR, section)
    os.makedirs(section_dir, exist_ok=True)
    filepath = os.path.join(section_dir, f"{num}.jpg")

    if os.path.exists(filepath) and not force:
        size = os.path.getsize(filepath)
        if size > 1000:
            print(f"  [{section}/{num}] Already exists ({size/1024:.0f} KB), skipping")
            return True

    print(f"  [{section}/{num}] Searching: {search_term}")

    if dry_run:
        print(f"  Would download to: {filepath}")
        return True

    # Strategy 1: Search Wikipedia for the temple page image
    wiki_url = search_wikipedia_image(search_term)
    if wiki_url:
        print(f"  Found Wikipedia image")
        if download_image(wiki_url, filepath):
            try_resize(filepath)
            return True

    # Strategy 2: Search Wikimedia Commons
    titles = search_wikimedia_commons(search_term)
    if not titles:
        # Try simpler search terms
        simpler = search_term.split("Temple")[0].strip() + " Temple"
        titles = search_wikimedia_commons(simpler)

    for title in titles:
        img_url = get_image_url(title)
        if img_url:
            print(f"  Found: {title}")
            if download_image(img_url, filepath):
                try_resize(filepath)
                return True

    # Strategy 3: Try Wikipedia search
    params = {
        "action": "query",
        "list": "search",
        "srsearch": search_term,
        "srlimit": "3",
        "format": "json",
    }
    url = WIKI_API + "?" + urllib.parse.urlencode(params)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "TempleImageBot/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            results = data.get("query", {}).get("search", [])
            for r in results:
                title = r.get("title", "")
                # Get page image
                img_params = {
                    "action": "query",
                    "titles": title,
                    "prop": "pageimages",
                    "piprop": "original",
                    "format": "json",
                }
                img_url_str = WIKI_API + "?" + urllib.parse.urlencode(img_params)
                req2 = urllib.request.Request(img_url_str, headers={"User-Agent": "TempleImageBot/1.0"})
                with urllib.request.urlopen(req2, timeout=15) as resp2:
                    data2 = json.loads(resp2.read().decode())
                    pages = data2.get("query", {}).get("pages", {})
                    for pid, page in pages.items():
                        orig = page.get("original", {})
                        if orig.get("source"):
                            print(f"  Found via Wikipedia search: {title}")
                            if download_image(orig["source"], filepath):
                                try_resize(filepath)
                                return True
    except Exception as e:
        print(f"  Wikipedia search error: {e}")

    print(f"  No image found for [{section}/{num}]")
    return False


def main():
    parser = argparse.ArgumentParser(description="Download temple images from Wikimedia Commons")
    parser.add_argument("--section", "-s", help="Download for specific section only")
    parser.add_argument("--force", "-f", action="store_true", help="Re-download existing images")
    parser.add_argument("--dry-run", "-n", action="store_true", help="Show what would be downloaded")
    parser.add_argument("--delay", "-d", type=float, default=1.0, help="Delay between downloads (seconds)")
    args = parser.parse_args()

    sections_to_process = TEMPLES.keys()
    if args.section:
        if args.section not in TEMPLES:
            print(f"Unknown section: {args.section}")
            print(f"Available: {', '.join(TEMPLES.keys())}")
            sys.exit(1)
        sections_to_process = [args.section]

    total = sum(len(v) for k, v in TEMPLES.items() if k in sections_to_process)
    success = 0
    failed = 0

    print(f"{'[DRY RUN] ' if args.dry_run else ''}Downloading images for {total} temples across {len(list(sections_to_process))} sections")
    print(f"Output directory: {IMAGES_DIR}")
    print("=" * 60)

    for section in sections_to_process:
        temples = TEMPLES[section]
        print(f"\n--- {section.upper()} ({len(temples)} temples) ---")

        for num, search_term in sorted(temples.items(), key=lambda x: int(x[0])):
            result = download_temple_image(section, num, search_term, args.force, args.dry_run)
            if result:
                success += 1
            else:
                failed += 1

            if not args.dry_run:
                time.sleep(args.delay)  # Be polite to Wikimedia servers

    print("\n" + "=" * 60)
    print(f"Done! Success: {success}, Failed: {failed}, Total: {total}")
    if failed > 0:
        print("Re-run with different search terms for failed images.")


if __name__ == "__main__":
    main()
