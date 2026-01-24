import os
from typing import Optional

class Config:
    """Configuration class for API keys and settings"""

    # API Keys - Set these as environment variables or update directly
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY", "")
    GOOGLE_API_KEY: Optional[str] = os.getenv("GOOGLE_API_KEY", "")
    GOOGLE_CSE_ID: Optional[str] = os.getenv("GOOGLE_CSE_ID", "")

    # Application settings
    MAX_SLIDES: int = 15
    MIN_SLIDES: int = 3
    DEFAULT_SLIDES: int = 8

    # Image settings
    IMAGE_WIDTH: int = 800
    IMAGE_HEIGHT: int = 600
    MAX_IMAGES_PER_SLIDE: int = 1

    # Web research settings
    ENABLE_WEB_RESEARCH: bool = True
    MAX_RESEARCH_SOURCES: int = 5

    # Output directory
    OUTPUT_DIR: str = "../output"

    @classmethod
    def validate(cls) -> bool:
        """Validate that required API keys are set"""
        if not cls.OPENAI_API_KEY:
            print("Warning: OPENAI_API_KEY not set")
            return False
        if not cls.GOOGLE_API_KEY or not cls.GOOGLE_CSE_ID:
            print("Warning: Google API keys not set (GOOGLE_API_KEY, GOOGLE_CSE_ID)")
            return False
        return True

config = Config()
