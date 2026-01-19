from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List
import os
import asyncio
from datetime import datetime

from config import config
from services.openai_service import OpenAIService
from services.google_search_service import GoogleSearchService
from services.ppt_service import PowerPointService

app = FastAPI(title="AI PowerPoint Generator", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
frontend_path = os.path.join(os.path.dirname(__file__), "../frontend")
if os.path.exists(frontend_path):
    app.mount("/static", StaticFiles(directory=frontend_path), name="static")

# Initialize services
openai_service = OpenAIService()
google_service = GoogleSearchService()
ppt_service = PowerPointService()


class PresentationRequest(BaseModel):
    """Request model for presentation generation"""
    topic: Optional[str] = None
    content: Optional[str] = None
    num_slides: int = 8
    include_images: bool = True


class PresentationResponse(BaseModel):
    """Response model for presentation generation"""
    success: bool
    message: str
    filename: Optional[str] = None
    download_url: Optional[str] = None


@app.get("/")
async def root():
    """Serve the frontend"""
    frontend_file = os.path.join(frontend_path, "index.html")
    if os.path.exists(frontend_file):
        return FileResponse(frontend_file)
    return {"message": "AI PowerPoint Generator API", "version": "1.0.0"}


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    api_status = {
        "openai_configured": bool(config.OPENAI_API_KEY),
        "google_configured": bool(config.GOOGLE_API_KEY and config.GOOGLE_CSE_ID)
    }
    return {
        "status": "healthy",
        "api_status": api_status
    }


@app.post("/api/generate", response_model=PresentationResponse)
async def generate_presentation(request: PresentationRequest):
    """
    Generate a PowerPoint presentation based on topic or content

    Args:
        request: PresentationRequest with topic/content and settings

    Returns:
        PresentationResponse with download URL
    """
    try:
        # Validate request
        if not request.topic and not request.content:
            raise HTTPException(
                status_code=400,
                detail="Either 'topic' or 'content' must be provided"
            )

        # Validate number of slides
        if request.num_slides < config.MIN_SLIDES or request.num_slides > config.MAX_SLIDES:
            raise HTTPException(
                status_code=400,
                detail=f"Number of slides must be between {config.MIN_SLIDES} and {config.MAX_SLIDES}"
            )

        # Check API configuration
        if not config.OPENAI_API_KEY:
            raise HTTPException(
                status_code=500,
                detail="OpenAI API key not configured. Please set OPENAI_API_KEY environment variable."
            )

        # Generate slide content using OpenAI
        print(f"Generating presentation content...")
        if request.topic:
            slides_data = openai_service.generate_presentation_outline(
                request.topic,
                request.num_slides
            )
        else:
            slides_data = openai_service.enhance_content(
                request.content,
                request.num_slides
            )

        if not slides_data:
            raise HTTPException(
                status_code=500,
                detail="Failed to generate presentation content"
            )

        print(f"Generated {len(slides_data)} slides")

        # Fetch images for slides if requested
        images = {}
        if request.include_images and config.GOOGLE_API_KEY and config.GOOGLE_CSE_ID:
            print("Fetching images for slides...")
            for slide in slides_data:
                slide_num = slide.get("slide_number")
                keywords = slide.get("image_keywords", [])

                if keywords and slide_num > 1:  # Skip title slide
                    print(f"Searching image for slide {slide_num}: {keywords}")
                    image_data = google_service.get_image_for_slide(keywords)
                    if image_data:
                        images[slide_num] = image_data
                        print(f"✓ Image found for slide {slide_num}")
                    else:
                        print(f"✗ No image found for slide {slide_num}")

        # Generate PowerPoint
        print("Creating PowerPoint presentation...")
        title = request.topic or "Presentation"
        filename = ppt_service.create_presentation(slides_data, images, title)

        download_url = f"/api/download/{filename}"

        return PresentationResponse(
            success=True,
            message="Presentation generated successfully",
            filename=filename,
            download_url=download_url
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error generating presentation: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate presentation: {str(e)}"
        )


@app.get("/api/download/{filename}")
async def download_presentation(filename: str):
    """
    Download a generated presentation

    Args:
        filename: Name of the presentation file

    Returns:
        FileResponse with the PowerPoint file
    """
    file_path = os.path.join("../output", filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation"
    )


@app.get("/api/presentations")
async def list_presentations():
    """List all generated presentations"""
    output_dir = "../output"

    if not os.path.exists(output_dir):
        return {"presentations": []}

    files = [
        {
            "filename": f,
            "created": datetime.fromtimestamp(os.path.getctime(os.path.join(output_dir, f))).isoformat(),
            "size": os.path.getsize(os.path.join(output_dir, f))
        }
        for f in os.listdir(output_dir)
        if f.endswith(".pptx")
    ]

    # Sort by creation time, newest first
    files.sort(key=lambda x: x["created"], reverse=True)

    return {"presentations": files}


@app.delete("/api/presentations/{filename}")
async def delete_presentation(filename: str):
    """Delete a generated presentation"""
    file_path = os.path.join("../output", filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    try:
        os.remove(file_path)
        return {"success": True, "message": "Presentation deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete file: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    # Validate configuration
    config.validate()

    # Create output directory
    os.makedirs("../output", exist_ok=True)

    print("=" * 60)
    print("AI PowerPoint Generator API")
    print("=" * 60)
    print(f"OpenAI API: {'✓ Configured' if config.OPENAI_API_KEY else '✗ Not configured'}")
    print(f"Google API: {'✓ Configured' if (config.GOOGLE_API_KEY and config.GOOGLE_CSE_ID) else '✗ Not configured'}")
    print("=" * 60)
    print("Starting server at http://localhost:8000")
    print("=" * 60)

    uvicorn.run(app, host="0.0.0.0", port=8000)
