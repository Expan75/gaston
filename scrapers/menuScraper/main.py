import os
from bs4 import BeautifulSoup
from requests import get
from typing import Iterator

def fetch(url: str) -> str:
    return get(url).text

def clear(raw_html: str) -> str:
    return BeautifulSoup(raw_html, 'lxml').stripped_strings

def dump(text_lines: Iterator[str], source: str) -> None:
    os.makedirs("menus", exist_ok=True)
    filename = os.path.join("menus", source)
    with open(filename, "w") as f:
        for line in text_lines:
            f.write(line.lower())
            f.write("\n")

def domain(url: str) -> str:
    return url.split("/")[2]

def scrape(url):
    source = domain(url)
    html = fetch(url)
    text = clear(html)
    dump(text, source)

if __name__ == '__main__':
    url = "http://restaurantmutantur.se"
    scrape(url)