# 🎨 AI PowerPoint Generator

An intelligent web application that automatically generates professional PowerPoint presentations using AI. Simply provide a topic or paste content, and the app creates engaging slides with AI-generated content and relevant images.

## ✨ Features

- **AI-Powered Content Generation**: Uses OpenAI's GPT-4 to create engaging, well-structured presentation content
- **Automatic Image Integration**: Fetches high-quality, relevant images using Google Custom Search API
- **Professional Layouts**: Beautiful slide designs with proper formatting and visual hierarchy
- **Flexible Input**: Create presentations from a topic or paste your own content
- **Customizable**: Choose the number of slides (3-15) and toggle image inclusion
- **Fast & Easy**: Generate complete presentations in seconds with a user-friendly interface

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for Python
- **python-pptx**: PowerPoint generation library
- **OpenAI API**: GPT-4 for content generation
- **Google Custom Search API**: Image retrieval
- **Pillow**: Image processing

### Frontend
- **HTML5/CSS3**: Modern, responsive UI
- **Vanilla JavaScript**: Interactive frontend with no dependencies
- **RESTful API**: Clean communication between frontend and backend

## 📋 Prerequisites

Before you begin, ensure you have the following:

1. **Python 3.8+** installed on your system
2. **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
3. **Google Custom Search API Key** - [Get one here](https://developers.google.com/custom-search/v1/overview)
4. **Google Custom Search Engine ID** - [Create one here](https://programmablesearchengine.google.com/controlpanel/create)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-powerpoint-generator
```

### 2. Set Up Python Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Configure API Keys

Create a `.env` file in the `backend` directory:

```bash
cp ../.env.example .env
```

Edit the `.env` file and add your API keys:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
GOOGLE_API_KEY=your-google-api-key-here
GOOGLE_CSE_ID=your-custom-search-engine-id-here
```

Alternatively, you can set environment variables:

```bash
# On macOS/Linux:
export OPENAI_API_KEY="your-key-here"
export GOOGLE_API_KEY="your-key-here"
export GOOGLE_CSE_ID="your-cse-id-here"

# On Windows (PowerShell):
$env:OPENAI_API_KEY="your-key-here"
$env:GOOGLE_API_KEY="your-key-here"
$env:GOOGLE_CSE_ID="your-cse-id-here"
```

### 5. Run the Application

```bash
# Make sure you're in the backend directory
cd backend

# Run the server
python main.py
```

The application will start at `http://localhost:8000`

## 📖 Usage

### Web Interface

1. Open your browser and navigate to `http://localhost:8000`
2. Choose between:
   - **Topic**: Enter a topic for AI to create content from scratch
   - **Custom Content**: Paste your own content to be structured into slides
3. Select the number of slides (3-15)
4. Toggle "Include AI-sourced images" on/off
5. Click "Generate Presentation"
6. Wait for the AI to generate your presentation
7. Download the PowerPoint file

### API Endpoints

#### Generate Presentation
```http
POST /api/generate
Content-Type: application/json

{
  "topic": "Climate Change",
  "num_slides": 8,
  "include_images": true
}
```

Or with custom content:
```http
POST /api/generate
Content-Type: application/json

{
  "content": "Your content here...",
  "num_slides": 8,
  "include_images": true
}
```

#### Download Presentation
```http
GET /api/download/{filename}
```

#### List Presentations
```http
GET /api/presentations
```

#### Health Check
```http
GET /health
```

## 🎯 How It Works

1. **Input Processing**: User provides a topic or content
2. **Content Generation**: OpenAI GPT-4 generates structured slide content with titles, bullet points, and image keywords
3. **Image Retrieval**: Google Custom Search API fetches relevant high-quality images based on keywords
4. **Presentation Assembly**: python-pptx creates a professional PowerPoint with:
   - Attractive title slide with gradient background
   - Content slides with two-column layouts (text + image)
   - Proper formatting, colors, and typography
5. **Download**: User receives a complete, ready-to-use PowerPoint file

## 🔧 Configuration

### Slide Settings

Edit `backend/config.py` to customize:

```python
MAX_SLIDES = 15          # Maximum number of slides
MIN_SLIDES = 3           # Minimum number of slides
DEFAULT_SLIDES = 8       # Default number of slides
IMAGE_WIDTH = 800        # Image width in pixels
IMAGE_HEIGHT = 600       # Image height in pixels
```

### Google Custom Search Setup

1. Go to [Google Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Create a new search engine
3. Enable "Image Search" in settings
4. Set "Search the entire web" option
5. Copy your Search Engine ID (GOOGLE_CSE_ID)
6. Get your API key from [Google Cloud Console](https://console.cloud.google.com/)

## 📁 Project Structure

```
ai-powerpoint-generator/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── config.py               # Configuration settings
│   ├── requirements.txt        # Python dependencies
│   └── services/
│       ├── openai_service.py   # OpenAI integration
│       ├── google_search_service.py  # Google Search integration
│       └── ppt_service.py      # PowerPoint generation
├── frontend/
│   ├── index.html              # Web interface
│   ├── style.css               # Styling
│   └── script.js               # Frontend logic
├── output/                     # Generated presentations
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## 🎨 Customization

### Modify Slide Design

Edit `backend/services/ppt_service.py`:

- Change colors in `RGBColor()` calls
- Adjust dimensions with `Inches()` values
- Modify fonts and sizes with `Pt()` values
- Customize layouts in `_create_title_slide()` and `_create_content_slide()`

### Adjust AI Behavior

Edit prompts in `backend/services/openai_service.py`:

- Modify the content generation prompt
- Change temperature for more/less creative outputs
- Adjust max_tokens for longer/shorter content

## 🐛 Troubleshooting

### API Key Issues
- Verify your API keys are correctly set in the `.env` file or environment variables
- Check that your OpenAI API key has sufficient credits
- Ensure your Google Custom Search API is enabled and has quota remaining

### Image Not Loading
- Check Google Custom Search API quota (100 free searches per day)
- Verify your Custom Search Engine is configured for image search
- Ensure "Search the entire web" is enabled

### PowerPoint Generation Errors
- Ensure python-pptx is installed correctly
- Check that the output directory exists and is writable
- Verify image data is valid before adding to slides

### Port Already in Use
```bash
# Change the port in main.py or kill the process using port 8000
# On Linux/Mac:
lsof -ti:8000 | xargs kill -9
# On Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

## 📝 Example Topics

Try these topics to see the AI in action:

- "Digital Marketing Strategies for 2024"
- "Introduction to Machine Learning"
- "Sustainable Energy Solutions"
- "Effective Project Management"
- "Healthy Lifestyle Habits"
- "Basics of Cryptocurrency"

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your API keys confidential
- Use environment variables in production
- Regularly rotate your API keys
- Monitor API usage to avoid unexpected charges

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Google for Custom Search API
- python-pptx library developers
- FastAPI framework

## 💡 Tips for Best Results

1. **Be Specific**: Use detailed topics for better content generation
2. **Optimal Slide Count**: 5-10 slides work best for most presentations
3. **Review & Edit**: Always review the generated content and customize as needed
4. **Image Quality**: Images are sourced from the web; verify copyright before public use
5. **Content Length**: Keep pasted content under 3000 words for best results

## 📞 Support

For issues, questions, or suggestions, please open an issue in the GitHub repository.

---

**Built with ❤️ using OpenAI, Google APIs, and Python**
