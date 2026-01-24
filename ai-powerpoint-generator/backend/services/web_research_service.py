import requests
from typing import List, Dict, Optional
from bs4 import BeautifulSoup
import json

class WebResearchService:
    """Service for researching topics using web search"""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

    def research_topic(self, topic: str, max_sources: int = 5) -> Dict[str, any]:
        """
        Research a topic using multiple web sources

        Args:
            topic: The topic to research
            max_sources: Maximum number of sources to gather

        Returns:
            Dictionary with researched information
        """
        print(f"Researching topic: {topic}")

        research_data = {
            "topic": topic,
            "key_facts": [],
            "statistics": [],
            "main_points": [],
            "sources": []
        }

        # Search using DuckDuckGo (no API key needed)
        search_results = self._search_duckduckgo(topic, max_results=max_sources)

        # Extract information from search results
        for idx, result in enumerate(search_results[:max_sources]):
            print(f"  Analyzing source {idx + 1}/{len(search_results[:max_sources])}")
            content = self._extract_content(result.get('url', ''))

            if content:
                research_data["main_points"].extend(content.get("points", []))
                research_data["key_facts"].extend(content.get("facts", []))
                research_data["sources"].append({
                    "title": result.get('title', 'Unknown'),
                    "url": result.get('url', ''),
                    "snippet": result.get('snippet', '')
                })

        # Deduplicate and limit points
        research_data["main_points"] = list(set(research_data["main_points"]))[:15]
        research_data["key_facts"] = list(set(research_data["key_facts"]))[:10]

        print(f"  ✓ Research complete: {len(research_data['main_points'])} points, {len(research_data['sources'])} sources")

        return research_data

    def _search_duckduckgo(self, query: str, max_results: int = 5) -> List[Dict]:
        """
        Search using DuckDuckGo HTML (no API key required)

        Args:
            query: Search query
            max_results: Maximum results to return

        Returns:
            List of search results
        """
        try:
            # DuckDuckGo HTML search
            url = "https://html.duckduckgo.com/html/"
            params = {"q": query}

            response = self.session.post(url, data=params, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.text, 'html.parser')
            results = []

            # Parse results
            for result_div in soup.find_all('div', class_='result')[:max_results]:
                title_elem = result_div.find('a', class_='result__a')
                snippet_elem = result_div.find('a', class_='result__snippet')

                if title_elem:
                    results.append({
                        'title': title_elem.get_text(strip=True),
                        'url': title_elem.get('href', ''),
                        'snippet': snippet_elem.get_text(strip=True) if snippet_elem else ''
                    })

            return results

        except Exception as e:
            print(f"  Search error: {e}")
            return []

    def _extract_content(self, url: str) -> Optional[Dict]:
        """
        Extract meaningful content from a webpage

        Args:
            url: URL to extract from

        Returns:
            Dictionary with extracted points and facts
        """
        try:
            if not url or len(url) < 10:
                return None

            response = self.session.get(url, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.text, 'html.parser')

            # Remove script and style elements
            for script in soup(["script", "style", "nav", "footer", "header"]):
                script.decompose()

            # Get text content
            text = soup.get_text(separator=' ', strip=True)

            # Extract meaningful sentences (simple approach)
            sentences = [s.strip() for s in text.split('.') if 20 < len(s.strip()) < 200]

            # Filter for informative sentences
            points = []
            facts = []

            for sentence in sentences[:30]:  # Limit processing
                sentence_lower = sentence.lower()

                # Look for factual/statistical content
                if any(indicator in sentence_lower for indicator in ['%', 'percent', 'million', 'billion', 'study', 'research', 'according']):
                    facts.append(sentence)
                # Look for important points
                elif any(indicator in sentence_lower for indicator in ['important', 'key', 'essential', 'significant', 'benefits', 'advantages']):
                    points.append(sentence)
                # General informative content
                elif len(points) < 5:
                    points.append(sentence)

            return {
                "points": points[:5],
                "facts": facts[:3]
            }

        except Exception as e:
            print(f"    Error extracting from {url[:50]}: {e}")
            return None

    def format_research_for_prompt(self, research_data: Dict) -> str:
        """
        Format research data for inclusion in AI prompt

        Args:
            research_data: Research data dictionary

        Returns:
            Formatted string for prompt
        """
        formatted = f"\n## RESEARCHED INFORMATION ABOUT '{research_data['topic']}':\n\n"

        if research_data.get('key_facts'):
            formatted += "### Key Facts & Statistics:\n"
            for fact in research_data['key_facts'][:5]:
                formatted += f"- {fact}\n"
            formatted += "\n"

        if research_data.get('main_points'):
            formatted += "### Main Points:\n"
            for point in research_data['main_points'][:10]:
                formatted += f"- {point}\n"
            formatted += "\n"

        formatted += "Use this researched information to create accurate, detailed, and current presentation content.\n"

        return formatted
