#!/bin/bash

echo "================================"
echo "AI PowerPoint Generator"
echo "================================"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
cd backend
pip install -q -r requirements.txt

# Check for .env file
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  Warning: .env file not found!"
    echo "Please create a .env file with your API keys."
    echo "See ../.env.example for template."
    echo ""
fi

# Start the server
echo ""
echo "Starting server..."
echo "================================"
python main.py
