import requests
from typing import List, Optional
from config import config
import io
from PIL import Image

class GoogleSearchService:
    """Service for fetching images using Google Custom Search API"""

    def __init__(self):
        self.api_key = config.GOOGLE_API_KEY
        self.cse_id = config.GOOGLE_CSE_ID
        self.base_url = "https://www.googleapis.com/customsearch/v1"

    def search_image(self, keywords: List[str], num_results: int = 1) -> Optional[str]:
        """
        Search for an image using Google Custom Search API

        Args:
            keywords: List of keywords to search for
            num_results: Number of results to fetch

        Returns:
            URL of the first high-quality image found, or None
        """
        if not self.api_key or not self.cse_id:
            print("Google API credentials not configured")
            return None

        # Combine keywords into search query
        query = " ".join(keywords)

        params = {
            "key": self.api_key,
            "cx": self.cse_id,
            "q": query,
            "searchType": "image",
            "num": num_results,
            "imgSize": "large",
            "imgType": "photo",
            "safe": "active",
            "fileType": "jpg,png"
        }

        try:
            response = requests.get(self.base_url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

            if "items" in data and len(data["items"]) > 0:
                # Get the first image link
                image_url = data["items"][0]["link"]
                return image_url
            else:
                print(f"No images found for keywords: {keywords}")
                return None

        except requests.exceptions.RequestException as e:
            print(f"Error searching for image: {e}")
            return None
        except Exception as e:
            print(f"Unexpected error in image search: {e}")
            return None

    def download_image(self, image_url: str) -> Optional[io.BytesIO]:
        """
        Download an image from a URL and return as BytesIO

        Args:
            image_url: URL of the image to download

        Returns:
            BytesIO object containing the image data, or None
        """
        try:
            response = requests.get(image_url, timeout=15, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
            response.raise_for_status()

            # Verify it's a valid image
            image = Image.open(io.BytesIO(response.content))
            image.verify()

            # Return the image as BytesIO
            return io.BytesIO(response.content)

        except Exception as e:
            print(f"Error downloading image from {image_url}: {e}")
            return None

    def get_image_for_slide(self, keywords: List[str]) -> Optional[io.BytesIO]:
        """
        Search and download an image for a slide

        Args:
            keywords: List of keywords for the image search

        Returns:
            BytesIO object containing the image, or None
        """
        # Search for image
        image_url = self.search_image(keywords)

        if image_url:
            # Download the image
            return self.download_image(image_url)

        return None
