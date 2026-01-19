# 📱 WhatsApp Chat AI Search

A powerful web application that enables intelligent searching through WhatsApp chat exports using AI-powered semantic search capabilities.

## ✨ Features

### 🎯 Core Functionality
- **Chat Import**: Upload WhatsApp chat export files (.txt format)
- **AI-Powered Search**: Two search modes available:
  - **Semantic Search**: Understands context and meaning (basic built-in or enhanced with OpenAI)
  - **Keyword Search**: Traditional text matching
- **Smart Filtering**: Filter by participant, date range, and more
- **Real-time Analytics**: View message counts, participant statistics, and date ranges

### 🔒 Privacy-First
- **100% Client-Side**: All processing happens in your browser
- **No Data Upload**: Your chats never leave your device
- **Optional API**: OpenAI integration is completely optional

### 🎨 User Experience
- Modern, dark-themed UI inspired by WhatsApp
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Relevance scoring for search results

## 🚀 Getting Started

### How to Export WhatsApp Chat

1. Open WhatsApp on your phone
2. Open the chat you want to export
3. Tap on the three dots (menu) → More → Export chat
4. Choose "Without Media"
5. Save or share the .txt file to your computer

### Using the Application

1. **Open the App**: Simply open `index.html` in your web browser
2. **Upload Chat**: Click "Choose File" and select your exported WhatsApp chat file
3. **Search & Explore**:
   - Use the search bar to find specific messages
   - Apply filters to narrow down results
   - View relevance scores for AI-powered searches

### AI Search Modes

#### Basic Semantic Search (Default)
- Built-in TF-IDF algorithm
- No API key required
- Works completely offline
- Good for general searches

#### Enhanced Semantic Search (OpenAI)
1. Click "⚙️ AI Settings"
2. Select "Semantic Search (AI-powered)"
3. Enter your OpenAI API key
4. Enjoy more accurate, context-aware search results

**Note**: Using OpenAI API incurs costs based on OpenAI's pricing. The app uses the `text-embedding-ada-002` model for embeddings.

## 🛠️ Technical Details

### Technologies Used
- **Pure JavaScript**: No frameworks required
- **HTML5 & CSS3**: Modern web standards
- **OpenAI Embeddings API** (optional): For enhanced semantic search

### Supported Chat Formats
The app automatically detects and parses multiple WhatsApp export formats:
- `[DD/MM/YYYY, HH:MM:SS] Sender: Message`
- `DD/MM/YYYY, HH:MM - Sender: Message`
- `M/D/YY, H:MM AM/PM - Sender: Message`

### Search Algorithm

#### Basic Semantic Search
- Tokenization and text normalization
- TF-IDF (Term Frequency-Inverse Document Frequency)
- Relevance scoring with partial matching
- Length normalization for fair comparison

#### OpenAI Semantic Search
- Vector embeddings for query and messages
- Cosine similarity calculation
- Threshold-based filtering (>50% similarity)
- Sorted by relevance score

## 📊 Features Breakdown

### Filters
- **By Participant**: Filter messages from specific people
- **By Date**: Today, Last Week, Last Month, Last Year
- **Combined Filters**: Use multiple filters simultaneously

### Statistics Dashboard
- Total message count
- Number of participants
- Date range of conversation

### Search Results
- Highlighted high-relevance messages
- Relevance percentage scores
- Sender and timestamp information
- Formatted message display

## 🎯 Use Cases

- Find specific conversations or topics quickly
- Locate important information in long chat histories
- Search for messages by context, not just keywords
- Analyze chat patterns and statistics
- Archive and organize personal conversations

## 🔐 Privacy & Security

- **No Server**: Everything runs locally in your browser
- **No Tracking**: No analytics or tracking scripts
- **Your Data**: Complete control over your chat data
- **Optional API**: You control if and when to use external APIs

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 🤝 Contributing

This is an open-source project. Feel free to:
- Report bugs
- Suggest features
- Submit improvements

## 📄 License

This project is open source and available for personal and educational use.

## 💡 Tips for Best Results

1. **Export Complete Chats**: Ensure your WhatsApp export is complete
2. **Use Descriptive Queries**: For semantic search, use natural language
3. **Combine Filters**: Use search + filters for precise results
4. **Try Both Modes**: Compare keyword vs semantic search results
5. **Save API Keys**: Browser will remember your settings for the session

## 🐛 Troubleshooting

### Chat Not Loading?
- Ensure the file is a valid WhatsApp export (.txt)
- Check that the export was done "Without Media"
- Try a different chat or re-export

### Search Not Working?
- Verify your search query is not empty
- Try switching between semantic and keyword modes
- Check your internet connection (for OpenAI API mode)

### OpenAI API Errors?
- Verify your API key is correct
- Check your OpenAI account has credits
- Monitor rate limits (app batches requests to help)

## 🎓 How It Works

1. **Parse**: App reads and parses WhatsApp chat format
2. **Index**: Messages are tokenized and indexed
3. **Search**: Query is processed using selected algorithm
4. **Rank**: Results are scored for relevance
5. **Display**: Top results shown with highlighting

## 🌟 Future Enhancements

Potential features for future versions:
- Export search results
- Advanced analytics and visualizations
- Support for multiple chat files
- Message clustering by topic
- Sentiment analysis
- Media preview support

---

**Made with ❤️ for WhatsApp users who value their chat history**

**Note**: This application is not affiliated with WhatsApp or Meta. It's an independent tool for personal chat analysis.
