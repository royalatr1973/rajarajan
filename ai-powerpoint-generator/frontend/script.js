// DOM Elements
const form = document.getElementById('presentationForm');
const topicInput = document.getElementById('topicInput');
const contentInput = document.getElementById('contentInput');
const progressSection = document.getElementById('progressSection');
const resultSection = document.getElementById('resultSection');
const errorSection = document.getElementById('errorSection');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const createNewBtn = document.getElementById('createNewBtn');
const retryBtn = document.getElementById('retryBtn');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const resultMessage = document.getElementById('resultMessage');
const errorMessage = document.getElementById('errorMessage');

let downloadUrl = '';
let currentFilename = '';

// Tab switching
document.querySelectorAll('input[name="inputType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'topic') {
            topicInput.classList.remove('hidden');
            contentInput.classList.add('hidden');
            document.getElementById('content').value = '';
        } else {
            topicInput.classList.add('hidden');
            contentInput.classList.remove('hidden');
            document.getElementById('topic').value = '';
        }
    });
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await generatePresentation();
});

// Create new presentation
createNewBtn.addEventListener('click', () => {
    resetForm();
});

// Retry after error
retryBtn.addEventListener('click', () => {
    resetForm();
});

// Download button
downloadBtn.addEventListener('click', () => {
    if (downloadUrl) {
        window.location.href = downloadUrl;
    }
});

// Reset form and UI
function resetForm() {
    form.reset();
    hideAllSections();
    form.style.display = 'block';
    generateBtn.classList.remove('loading');
}

// Hide all result sections
function hideAllSections() {
    progressSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    errorSection.classList.add('hidden');
}

// Show progress
function showProgress(message, progress = 0) {
    hideAllSections();
    form.style.display = 'none';
    progressSection.classList.remove('hidden');
    progressText.textContent = message;
    progressBar.style.width = `${progress}%`;
}

// Show success
function showSuccess(message, filename, url) {
    hideAllSections();
    resultSection.classList.remove('hidden');
    resultMessage.textContent = message;
    downloadUrl = url;
    currentFilename = filename;
}

// Show error
function showError(message) {
    hideAllSections();
    form.style.display = 'none';
    errorSection.classList.remove('hidden');
    errorMessage.textContent = message;
    generateBtn.classList.remove('loading');
}

// Simulate progress for better UX
function simulateProgress(duration, callback) {
    let progress = 0;
    const steps = [
        { progress: 20, message: 'Generating slide content with AI...' },
        { progress: 40, message: 'Creating slide structure...' },
        { progress: 60, message: 'Searching for relevant images...' },
        { progress: 80, message: 'Designing presentation layout...' },
        { progress: 95, message: 'Finalizing your presentation...' }
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            showProgress(step.message, step.progress);
            currentStep++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, duration / steps.length);

    return interval;
}

// Generate presentation
async function generatePresentation() {
    // Get form data
    const inputType = document.querySelector('input[name="inputType"]:checked').value;
    const topic = document.getElementById('topic').value.trim();
    const content = document.getElementById('content').value.trim();
    const numSlides = parseInt(document.getElementById('numSlides').value);
    const includeImages = document.getElementById('includeImages').checked;

    // Validate input
    if (inputType === 'topic' && !topic) {
        alert('Please enter a topic for your presentation');
        return;
    }

    if (inputType === 'content' && !content) {
        alert('Please paste some content for your presentation');
        return;
    }

    // Prepare request data
    const requestData = {
        num_slides: numSlides,
        include_images: includeImages
    };

    if (inputType === 'topic') {
        requestData.topic = topic;
    } else {
        requestData.content = content;
    }

    // Show loading state
    generateBtn.classList.add('loading');
    generateBtn.textContent = 'Generating...';

    // Start progress simulation
    const progressInterval = simulateProgress(8000);

    try {
        // Make API request
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        // Clear progress simulation
        clearInterval(progressInterval);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to generate presentation');
        }

        const result = await response.json();

        if (result.success) {
            showProgress('Complete!', 100);

            // Small delay before showing success
            setTimeout(() => {
                showSuccess(
                    result.message,
                    result.filename,
                    result.download_url
                );
            }, 500);
        } else {
            throw new Error(result.message || 'Failed to generate presentation');
        }
    } catch (error) {
        console.error('Error:', error);
        clearInterval(progressInterval);
        showError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
        generateBtn.classList.remove('loading');
        generateBtn.textContent = 'Generate Presentation';
    }
}

// Check API health on load
async function checkHealth() {
    try {
        const response = await fetch('/health');
        const data = await response.json();

        if (!data.api_status.openai_configured) {
            console.warn('OpenAI API not configured');
        }

        if (!data.api_status.google_configured) {
            console.warn('Google API not configured - images will not be included');
        }
    } catch (error) {
        console.error('Health check failed:', error);
    }
}

// Initialize
checkHealth();
