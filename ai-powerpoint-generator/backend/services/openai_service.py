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
        prompt = f"""Create an exceptional, professional PowerPoint presentation outline for the topic: "{topic}"

Generate exactly {num_slides} slides (including a title slide and conclusion slide).

IMPORTANT GUIDELINES:
1. Make content highly engaging, insightful, and valuable
2. Use specific facts, statistics, and concrete examples where appropriate
3. Each bullet point should be concise but meaningful (8-15 words)
4. Avoid generic statements - be specific and actionable
5. Use professional business language appropriate for presentations

For each slide, provide:
1. A compelling, specific title (not generic)
2. 3-5 high-impact bullet points with substantive content
3. 2-4 HIGHLY SPECIFIC image search keywords that will find professional, relevant photos
   - For image keywords, be very specific (e.g., "business team collaboration office" instead of just "business")
   - Include descriptive adjectives and context (e.g., "modern renewable solar panels farm" instead of "solar energy")
   - Think about what would make a great professional stock photo for this topic

Return the response as a JSON array with this exact structure:
[
  {{
    "slide_number": 1,
    "title": "Presentation Title",
    "content": ["Point 1", "Point 2", "Point 3"],
    "image_keywords": ["specific keyword phrase 1", "specific keyword phrase 2", "specific keyword phrase 3"]
  }},
  ...
]

CONTENT QUALITY REQUIREMENTS:
- First slide: Title slide with topic and 2-3 compelling subtitle points about what the presentation covers
- Middle slides: Deep, substantive content with specific insights
- Last slide: Strong conclusion with key takeaways and call-to-action
- Make it presentation-ready - someone should be able to present directly from these slides

IMAGE KEYWORD REQUIREMENTS:
- Use 3-4 keywords per slide (not just 1-2)
- Be descriptive and specific (e.g., "professional business handshake partnership" vs "business")
- Include visual context that helps find the RIGHT image
- Think like a photographer describing the shot"""

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are an expert presentation designer with deep knowledge across all subjects. Create highly engaging, insightful, and well-structured presentation content that is both professional and memorable. Always respond with valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.8,
                max_tokens=4000
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
        prompt = f"""Convert the following content into an exceptional, professional PowerPoint presentation with exactly {num_slides} slides.

Content:
{content}

IMPORTANT GUIDELINES:
1. Extract the most important and valuable insights from the content
2. Make each bullet point concise but meaningful (8-15 words)
3. Organize information logically and create a compelling narrative
4. Use professional business language
5. Generate HIGHLY SPECIFIC image keywords (3-4 per slide) that will find relevant professional photos

Create a well-structured presentation with:
1. A compelling title slide with 2-3 subtitle points
2. Content slides with substantive, specific bullet points (not generic)
3. A strong conclusion slide with key takeaways

Return the response as a JSON array with this exact structure:
[
  {{
    "slide_number": 1,
    "title": "Presentation Title",
    "content": ["Point 1", "Point 2", "Point 3"],
    "image_keywords": ["specific descriptive phrase 1", "specific descriptive phrase 2", "specific descriptive phrase 3"]
  }},
  ...
]

IMAGE KEYWORD REQUIREMENTS:
- Use 3-4 descriptive keyword phrases per slide
- Be specific with visual context (e.g., "modern office team collaboration meeting" vs "office")
- Think about what professional stock photo would match the slide content
- Include descriptive adjectives and context

Make the content professional, concise, presentation-ready, and visually suitable for slides."""

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are an expert presentation designer with deep knowledge across all subjects. Create highly engaging, insightful, and well-structured presentation content from provided text that is both professional and memorable. Always respond with valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.8,
                max_tokens=4000
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
