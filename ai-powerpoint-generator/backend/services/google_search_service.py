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

    def search_image(self, keywords: List[str], num_results: int = 3, start_index: int = 1) -> List[str]:
        """
        Search for images using Google Custom Search API

        Args:
            keywords: List of keywords to search for
            num_results: Number of results to fetch (max 3 per request)
            start_index: Starting index for results (for pagination)

        Returns:
            List of image URLs found, or empty list
        """
        if not self.api_key or not self.cse_id:
            print("Google API credentials not configured")
            return []

        # Combine keywords into search query
        query = " ".join(keywords)

        params = {
            "key": self.api_key,
            "cx": self.cse_id,
            "q": query,
            "searchType": "image",
            "num": min(num_results, 3),  # Google allows max 10, but 3 is safer
            "start": start_index,
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
                # Get all image links
                image_urls = [item["link"] for item in data["items"]]
                return image_urls
            else:
                print(f"No images found for keywords: {keywords}")
                return []

        except requests.exceptions.RequestException as e:
            print(f"Error searching for image: {e}")
            return []
        except Exception as e:
            print(f"Unexpected error in image search: {e}")
            return []

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

    def get_image_for_slide(self, keywords: List[str], max_attempts: int = 5) -> Optional[io.BytesIO]:
        """
        Search and download an image for a slide with retry logic

        Args:
            keywords: List of keywords for the image search
            max_attempts: Maximum number of attempts (default 5)

        Returns:
            BytesIO object containing the image, or None
        """
        print(f"Searching for image with keywords: {keywords}")

        # Strategy: Try different combinations of keywords across multiple attempts
        keyword_combinations = self._generate_keyword_combinations(keywords, max_attempts)

        attempt = 0
        for keyword_combo in keyword_combinations:
            attempt += 1
            print(f"  Attempt {attempt}/{max_attempts}: Trying '{' '.join(keyword_combo)}'")

            # Search for images with this keyword combination
            image_urls = self.search_image(keyword_combo, num_results=3)

            # Try to download each image URL until one succeeds
            for idx, image_url in enumerate(image_urls):
                print(f"    Testing image {idx + 1}/{len(image_urls)}...")
                image_data = self.download_image(image_url)

                if image_data:
                    print(f"  ✓ Success! Image downloaded on attempt {attempt}")
                    return image_data

            # If we've exhausted this attempt, try the next keyword combination
            if attempt >= max_attempts:
                break

        print(f"  ✗ Failed to find suitable image after {attempt} attempts")
        return None

    def _generate_keyword_combinations(self, keywords: List[str], max_combinations: int) -> List[List[str]]:
        """
        Generate different keyword combinations for retry attempts

        Args:
            keywords: Original list of keywords
            max_combinations: Maximum number of combinations to generate

        Returns:
            List of keyword combinations to try
        """
        if not keywords:
            return [["professional", "business"]]

        combinations = []

        # Attempt 1: Use all keywords
        if len(keywords) > 0:
            combinations.append(keywords[:])

        # Attempt 2: Use first 2-3 keywords with "professional"
        if len(keywords) >= 2:
            combinations.append(keywords[:2] + ["professional"])

        # Attempt 3: Use different subset of keywords
        if len(keywords) >= 3:
            combinations.append([keywords[0], keywords[2], "high quality"])
        elif len(keywords) >= 2:
            combinations.append([keywords[0], keywords[1], "stock photo"])

        # Attempt 4: Use most important keyword with generic terms
        if len(keywords) >= 1:
            combinations.append([keywords[0], "professional", "business", "concept"])

        # Attempt 5: Fallback to first keyword with very generic terms
        if len(keywords) >= 1:
            combinations.append([keywords[0], "corporate", "modern"])

        # Ensure we have at least one combination
        if not combinations:
            combinations.append(["professional", "business", "presentation"])

        # Return only the number of combinations requested
        return combinations[:max_combinations]
