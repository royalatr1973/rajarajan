// WhatsApp Chat AI Search Application

class WhatsAppChatSearch {
    constructor() {
        this.messages = [];
        this.filteredMessages = [];
        this.participants = new Set();
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // File input
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileUpload(e));

        // Search
        document.getElementById('searchBtn').addEventListener('click', () => this.performSearch());
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });

        // Filters
        document.getElementById('senderFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('dateFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearFilters());

        // AI Settings
        document.getElementById('toggleSettings').addEventListener('click', () => this.toggleSettings());
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        document.getElementById('fileName').textContent = file.name;
        document.getElementById('loading').style.display = 'block';

        try {
            const text = await this.readFile(file);
            this.messages = this.parseWhatsAppChat(text);

            if (this.messages.length === 0) {
                alert('No messages found in the file. Please make sure it\'s a valid WhatsApp chat export.');
                document.getElementById('loading').style.display = 'none';
                return;
            }

            this.filteredMessages = [...this.messages];
            this.updateUI();

            document.getElementById('uploadSection').style.display = 'none';
            document.getElementById('searchSection').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
        } catch (error) {
            console.error('Error processing file:', error);
            alert('Error processing file. Please make sure it\'s a valid WhatsApp chat export.');
            document.getElementById('loading').style.display = 'none';
        }
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    parseWhatsAppChat(text) {
        const messages = [];
        const lines = text.split('\n');

        // Different WhatsApp export formats
        // Format 1: [DD/MM/YYYY, HH:MM:SS] Sender: Message
        // Format 2: DD/MM/YYYY, HH:MM - Sender: Message
        // Format 3: M/D/YY, H:MM AM/PM - Sender: Message

        const patterns = [
            /\[(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]\s*([^:]+):\s*(.+)/i,
            /(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s*-\s*([^:]+):\s*(.+)/i,
        ];

        let currentMessage = null;

        for (let line of lines) {
            let matched = false;

            for (let pattern of patterns) {
                const match = line.match(pattern);
                if (match) {
                    // Save previous message if exists
                    if (currentMessage) {
                        messages.push(currentMessage);
                    }

                    const [, date, time, sender, message] = match;
                    this.participants.add(sender.trim());

                    currentMessage = {
                        date: date.trim(),
                        time: time.trim(),
                        sender: sender.trim(),
                        message: message.trim(),
                        timestamp: this.parseTimestamp(date, time),
                        fullText: line
                    };

                    matched = true;
                    break;
                }
            }

            // If no match and we have a current message, it's a continuation
            if (!matched && currentMessage && line.trim()) {
                currentMessage.message += '\n' + line.trim();
                currentMessage.fullText += '\n' + line;
            }
        }

        // Add the last message
        if (currentMessage) {
            messages.push(currentMessage);
        }

        return messages;
    }

    parseTimestamp(dateStr, timeStr) {
        try {
            // Try to parse the date in various formats
            const parts = dateStr.split('/');
            let month, day, year;

            if (parts.length === 3) {
                // Could be DD/MM/YYYY or MM/DD/YYYY
                // Assume DD/MM/YYYY for international format
                day = parseInt(parts[0]);
                month = parseInt(parts[1]) - 1; // JS months are 0-indexed
                year = parseInt(parts[2]);

                // Handle 2-digit years
                if (year < 100) {
                    year += 2000;
                }
            }

            // Parse time
            let timeParts = timeStr.replace(/\s*(AM|PM)/i, '').split(':');
            let hours = parseInt(timeParts[0]);
            let minutes = parseInt(timeParts[1]);

            // Handle AM/PM
            if (timeStr.toUpperCase().includes('PM') && hours !== 12) {
                hours += 12;
            } else if (timeStr.toUpperCase().includes('AM') && hours === 12) {
                hours = 0;
            }

            return new Date(year, month, day, hours, minutes);
        } catch (error) {
            console.error('Error parsing timestamp:', error);
            return new Date();
        }
    }

    updateUI() {
        this.updateStats();
        this.populateSenderFilter();
        this.displayMessages(this.filteredMessages);
    }

    updateStats() {
        document.getElementById('totalMessages').textContent = this.messages.length;
        document.getElementById('participantCount').textContent = this.participants.size;

        if (this.messages.length > 0) {
            const dates = this.messages.map(m => m.timestamp).filter(d => d);
            const minDate = new Date(Math.min(...dates));
            const maxDate = new Date(Math.max(...dates));

            const formatDate = (date) => {
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            };

            document.getElementById('dateRange').textContent = `${formatDate(minDate)} - ${formatDate(maxDate)}`;
        }
    }

    populateSenderFilter() {
        const select = document.getElementById('senderFilter');
        select.innerHTML = '<option value="">All Participants</option>';

        Array.from(this.participants).sort().forEach(sender => {
            const option = document.createElement('option');
            option.value = sender;
            option.textContent = sender;
            select.appendChild(option);
        });
    }

    async performSearch() {
        const query = document.getElementById('searchInput').value.trim();

        if (!query) {
            this.filteredMessages = [...this.messages];
            this.applyFilters();
            return;
        }

        document.getElementById('loading').style.display = 'block';

        const aiMode = document.querySelector('input[name="aiMode"]:checked').value;

        if (aiMode === 'semantic') {
            await this.semanticSearch(query);
        } else {
            this.keywordSearch(query);
        }

        this.applyFilters();
        document.getElementById('loading').style.display = 'none';
    }

    keywordSearch(query) {
        const lowerQuery = query.toLowerCase();
        this.filteredMessages = this.messages.filter(msg =>
            msg.message.toLowerCase().includes(lowerQuery) ||
            msg.sender.toLowerCase().includes(lowerQuery)
        );
    }

    async semanticSearch(query) {
        const apiKey = document.getElementById('apiKey').value.trim();

        if (apiKey) {
            // Use OpenAI API for semantic search
            await this.openAISemanticSearch(query, apiKey);
        } else {
            // Use basic semantic search with TF-IDF and similarity
            this.basicSemanticSearch(query);
        }
    }

    async openAISemanticSearch(query, apiKey) {
        try {
            // Get embeddings for the query
            const queryEmbedding = await this.getOpenAIEmbedding(query, apiKey);

            // Get embeddings for messages (batch process to avoid rate limits)
            const messagesWithScores = [];

            for (let i = 0; i < this.messages.length; i += 20) {
                const batch = this.messages.slice(i, i + 20);
                const embeddings = await Promise.all(
                    batch.map(msg => this.getOpenAIEmbedding(msg.message, apiKey))
                );

                batch.forEach((msg, idx) => {
                    const similarity = this.cosineSimilarity(queryEmbedding, embeddings[idx]);
                    messagesWithScores.push({
                        ...msg,
                        relevanceScore: similarity
                    });
                });
            }

            // Sort by relevance and filter
            this.filteredMessages = messagesWithScores
                .filter(msg => msg.relevanceScore > 0.5)
                .sort((a, b) => b.relevanceScore - a.relevanceScore);

        } catch (error) {
            console.error('OpenAI API error:', error);
            alert('Error using OpenAI API. Falling back to basic semantic search.');
            this.basicSemanticSearch(query);
        }
    }

    async getOpenAIEmbedding(text, apiKey) {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-embedding-ada-002',
                input: text
            })
        });

        if (!response.ok) {
            throw new Error('OpenAI API request failed');
        }

        const data = await response.json();
        return data.data[0].embedding;
    }

    cosineSimilarity(vec1, vec2) {
        const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
        const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
        const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
        return dotProduct / (mag1 * mag2);
    }

    basicSemanticSearch(query) {
        // Implement TF-IDF based semantic search
        const queryTerms = this.tokenize(query);

        const messagesWithScores = this.messages.map(msg => {
            const messageTerms = this.tokenize(msg.message);
            const score = this.calculateRelevanceScore(queryTerms, messageTerms, msg.message);
            return {
                ...msg,
                relevanceScore: score
            };
        });

        // Sort by relevance and filter low scores
        this.filteredMessages = messagesWithScores
            .filter(msg => msg.relevanceScore > 0.1)
            .sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    tokenize(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2);
    }

    calculateRelevanceScore(queryTerms, messageTerms, messageText) {
        let score = 0;
        const messageLower = messageText.toLowerCase();

        queryTerms.forEach(term => {
            // Exact match bonus
            if (messageLower.includes(term)) {
                score += 2;
            }

            // Term frequency
            const termCount = messageTerms.filter(t => t === term).length;
            score += termCount;

            // Partial matches
            messageTerms.forEach(msgTerm => {
                if (msgTerm.includes(term) || term.includes(msgTerm)) {
                    score += 0.5;
                }
            });
        });

        // Normalize by message length
        return score / (1 + Math.log(messageTerms.length + 1));
    }

    applyFilters() {
        let filtered = [...this.filteredMessages];

        // Sender filter
        const senderFilter = document.getElementById('senderFilter').value;
        if (senderFilter) {
            filtered = filtered.filter(msg => msg.sender === senderFilter);
        }

        // Date filter
        const dateFilter = document.getElementById('dateFilter').value;
        if (dateFilter) {
            const now = new Date();
            filtered = filtered.filter(msg => {
                const msgDate = msg.timestamp;
                if (!msgDate) return false;

                switch (dateFilter) {
                    case 'today':
                        return msgDate.toDateString() === now.toDateString();
                    case 'week':
                        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return msgDate >= weekAgo;
                    case 'month':
                        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                        return msgDate >= monthAgo;
                    case 'year':
                        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                        return msgDate >= yearAgo;
                    default:
                        return true;
                }
            });
        }

        this.displayMessages(filtered);
    }

    clearFilters() {
        document.getElementById('senderFilter').value = '';
        document.getElementById('dateFilter').value = '';
        document.getElementById('searchInput').value = '';
        this.filteredMessages = [...this.messages];
        this.displayMessages(this.filteredMessages);
    }

    displayMessages(messages) {
        const container = document.getElementById('messagesContainer');
        const resultsCount = document.getElementById('resultsCount');

        if (messages.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">No messages found</div>';
            resultsCount.textContent = 'No results';
            return;
        }

        resultsCount.textContent = `Showing ${messages.length} message${messages.length !== 1 ? 's' : ''}`;

        container.innerHTML = messages.map(msg => {
            const hasRelevance = msg.relevanceScore !== undefined;
            const scorePercent = hasRelevance ? Math.round(msg.relevanceScore * 100) : 0;

            return `
                <div class="message-card ${hasRelevance && msg.relevanceScore > 0.7 ? 'highlight' : ''}">
                    <div class="message-header">
                        <span class="sender">${this.escapeHtml(msg.sender)}</span>
                        <span class="timestamp">${msg.date} ${msg.time}</span>
                    </div>
                    <div class="message-text">${this.escapeHtml(msg.message)}</div>
                    ${hasRelevance ? `<span class="relevance-score">Relevance: ${scorePercent}%</span>` : ''}
                </div>
            `;
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    toggleSettings() {
        const panel = document.getElementById('settingsPanel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

// Initialize the app
const app = new WhatsAppChatSearch();
