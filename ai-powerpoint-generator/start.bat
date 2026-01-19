@echo off
echo ================================
echo AI PowerPoint Generator
echo ================================
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
cd backend
pip install -q -r requirements.txt

REM Check for .env file
if not exist ".env" (
    echo.
    echo Warning: .env file not found!
    echo Please create a .env file with your API keys.
    echo See ..\.env.example for template.
    echo.
)

REM Start the server
echo.
echo Starting server...
echo ================================
python main.py
