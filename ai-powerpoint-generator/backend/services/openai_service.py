import json
from typing import List, Dict
from openai import OpenAI
from config import config

class OpenAIService:
    """Service for generating presentation content using OpenAI API"""

    def __init__(self):
        self.client = OpenAI(api_key=config.OPENAI_API_KEY)

    def generate_presentation_outline(self, topic: str, num_slides: int) -> List[Dict]:
        """
        Generate a complete presentation outline with slide content and image keywords

        Args:
            topic: The presentation topic
            num_slides: Number of slides to generate

        Returns:
            List of slide dictionaries with title, content, and image_keywords
        """
        prompt = f"""Create a professional PowerPoint presentation outline for the topic: "{topic}"

Generate exactly {num_slides} slides (including a title slide and conclusion slide).

For each slide, provide:
1. A compelling title
2. 3-5 bullet points with engaging content (make them concise and impactful)
3. 1-3 keywords for finding relevant images

Return the response as a JSON array with this exact structure:
[
  {{
    "slide_number": 1,
    "title": "Presentation Title",
    "content": ["Point 1", "Point 2", "Point 3"],
    "image_keywords": ["keyword1", "keyword2"]
  }},
  ...
]

Make the content professional, engaging, and visually suitable for a presentation.
The first slide should be a title slide with the main topic.
The last slide should be a conclusion or summary slide."""

        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are a professional presentation designer. Create engaging, well-structured presentation content. Always respond with valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=3000
            )

            content = response.choices[0].message.content.strip()

            # Extract JSON from response (handle code blocks)
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()

            slides = json.loads(content)
            return slides

        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Response content: {content}")
            # Fallback to basic structure
            return self._generate_fallback_outline(topic, num_slides)
        except Exception as e:
            print(f"Error generating presentation: {e}")
            return self._generate_fallback_outline(topic, num_slides)

    def _generate_fallback_outline(self, topic: str, num_slides: int) -> List[Dict]:
        """Generate a basic fallback outline if AI generation fails"""
        slides = [
            {
                "slide_number": 1,
                "title": topic,
                "content": ["A comprehensive overview", "Professional insights", "Key takeaways"],
                "image_keywords": [topic.lower(), "professional", "business"]
            }
        ]

        for i in range(2, num_slides):
            slides.append({
                "slide_number": i,
                "title": f"Key Point {i-1}",
                "content": [
                    f"Important aspect {i-1}",
                    "Supporting details",
                    "Relevant information"
                ],
                "image_keywords": [topic.lower(), f"aspect{i}"]
            })

        slides.append({
            "slide_number": num_slides,
            "title": "Conclusion",
            "content": [
                "Summary of key points",
                "Thank you for your attention",
                "Questions?"
            ],
            "image_keywords": ["thank you", "conclusion", "questions"]
        })

        return slides

    def enhance_content(self, content: str, num_slides: int) -> List[Dict]:
        """
        Enhance pasted content and convert to presentation format

        Args:
            content: User-provided content to convert
            num_slides: Desired number of slides

        Returns:
            List of slide dictionaries
        """
        prompt = f"""Convert the following content into a professional PowerPoint presentation with exactly {num_slides} slides.

Content:
{content}

Create a well-structured presentation with:
1. A title slide
2. Content slides breaking down the main points
3. A conclusion slide

Return the response as a JSON array with this exact structure:
[
  {{
    "slide_number": 1,
    "title": "Presentation Title",
    "content": ["Point 1", "Point 2", "Point 3"],
    "image_keywords": ["keyword1", "keyword2"]
  }},
  ...
]

Make the content professional, concise, and visually suitable for slides."""

        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are a professional presentation designer. Create engaging, well-structured presentation content from provided text. Always respond with valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=3000
            )

            content_response = response.choices[0].message.content.strip()

            # Extract JSON from response
            if "```json" in content_response:
                content_response = content_response.split("```json")[1].split("```")[0].strip()
            elif "```" in content_response:
                content_response = content_response.split("```")[1].split("```")[0].strip()

            slides = json.loads(content_response)
            return slides

        except Exception as e:
            print(f"Error enhancing content: {e}")
            return self.generate_presentation_outline("Content Overview", num_slides)
