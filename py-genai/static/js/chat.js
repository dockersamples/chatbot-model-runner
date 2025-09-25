document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const modelNameSpan = document.getElementById('model-name');
    const themeToggle = document.getElementById('theme-toggle');
    const clearChatButton = document.getElementById('clear-chat');
    const suggestions = document.querySelectorAll('.suggestion');
    
    // Track if a request is in progress
    let isRequestInProgress = false;

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        // Enable/disable send button based on input
        sendButton.disabled = this.value.trim() === '';
    });

    // Theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        themeToggle.innerHTML = isDarkMode ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    });

    // Clear chat history
    clearChatButton.addEventListener('click', function() {
        // Keep only the first welcome message
        while (chatBox.childNodes.length > 2) {
            chatBox.removeChild(chatBox.lastChild);
        }
        
        // Add suggestions back
        if (!document.querySelector('.suggestions')) {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'suggestions';
            suggestionsDiv.innerHTML = `
                <div class="suggestion">What can you do?</div>
                <div class="suggestion">Tell me about Docker</div>
                <div class="suggestion">How to use GenAI?</div>
            `;
            chatBox.appendChild(suggestionsDiv);
            
            // Re-attach event listeners to new suggestions
            document.querySelectorAll('.suggestion').forEach(suggestion => {
                suggestion.addEventListener('click', function() {
                    messageInput.value = this.textContent;
                    messageInput.dispatchEvent(new Event('input'));
                    sendMessage();
                });
            });
        }
    });

    // Get model info
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: "!modelinfo" }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.model) {
            modelNameSpan.textContent = data.model;
        } else {
            modelNameSpan.textContent = "AI Language Model";
        }
    })
    .catch(error => {
        modelNameSpan.textContent = "AI Language Model";
        console.error('Error fetching model info:', error);
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message || isRequestInProgress) return;
        
        // Set flag to prevent multiple requests
        isRequestInProgress = true;

        // Remove suggestions when user sends first message
        const suggestionsDiv = document.querySelector('.suggestions');
        if (suggestionsDiv) {
            chatBox.removeChild(suggestionsDiv);
        }

        // Add user message to chat
        addMessageToChat('user', message);
        messageInput.value = '';
        messageInput.style.height = '50px'; // Reset height
        sendButton.disabled = true;

        // Show loading indicator
        const loadingContainer = document.createElement('div');
        loadingContainer.className = 'message-container';
        loadingContainer.innerHTML = `
            <div class="bot-icon">
                <i class="fas fa-robot"></i>
            </div>
            <div class="loading">
                <span>Thinking</span>
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatBox.appendChild(loadingContainer);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Send message to API
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Remove loading indicator
            chatBox.removeChild(loadingContainer);
            
            // Add bot's response to chat
            if (data.error) {
                addMessageToChat('bot', 'Sorry, I encountered an error: ' + data.error);
            } else {
                // Format the response with markdown-like styling
                const formattedResponse = formatResponse(data.response);
                addMessageToChat('bot', formattedResponse, true);
            }
        })
        .catch(error => {
            // Remove loading indicator
            chatBox.removeChild(loadingContainer);
            
            // Show error message
            addMessageToChat('bot', 'Sorry, I encountered an error. Please try again.');
            console.error('Error:', error);
        })
        .finally(() => {
            // Reset request flag
            isRequestInProgress = false;
        });
    }

    function formatResponse(text) {
        // Simple markdown-like formatting
        // This is a basic implementation - for production, use a proper markdown parser
        
        // Format code blocks
        text = text.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
        
        // Format inline code
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Format bold text
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Format italic text
        text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        
        // Format links
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Format line breaks
        text = text.replace(/\n/g, '<br>');
        
        return text;
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function addMessageToChat(role, content, isHTML = false) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        
        if (role === 'user') {
            messageContainer.innerHTML = `
                <div class="message-content" style="margin-left: auto;">
                    <div class="user-message">
                        ${escapeHTML(content)}
                    </div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            `;
        } else {
            messageContainer.innerHTML = `
                <div class="bot-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="bot-message">
                        ${isHTML ? content : escapeHTML(content)}
                    </div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            `;
        }
        
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Add click event to suggestions
    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            messageInput.value = this.textContent;
            messageInput.dispatchEvent(new Event('input'));
            sendMessage();
        });
    });
});
