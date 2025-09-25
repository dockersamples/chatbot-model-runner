# Improved Hello-GenAI Homepage

This is an enhanced version of the Hello-GenAI homepage with modern design and improved user experience.

## Key Improvements

### Design Enhancements
- Modern, responsive design that works on all device sizes
- Dark mode support with user preference saving
- Improved chat interface with message bubbles and timestamps
- Animated loading indicator
- Feature cards highlighting key capabilities
- Improved footer with useful links

### Functional Improvements
- Auto-resizing message input (textarea instead of input)
- Message suggestions for first-time users
- Clear chat history button
- Markdown-like formatting for bot responses (code blocks, bold, italic, links)
- Improved error handling and user feedback
- Better accessibility with proper semantic HTML and ARIA attributes

### Technical Improvements
- No external CSS dependencies (except Font Awesome for icons)
- CSS variables for easy theming
- Responsive design with mobile-first approach
- Improved JavaScript with better error handling
- Protection against XSS attacks with proper HTML escaping
- Support for multi-line messages with shift+enter

## Usage

The improved homepage includes several interactive elements:

1. **Theme Toggle**: Click the moon/sun icon in the header to switch between light and dark mode
2. **Message Suggestions**: Click on a suggestion to automatically send that message
3. **Clear Chat**: Click the trash icon in the chat header to clear the conversation
4. **Multi-line Input**: Press Shift+Enter to add a new line in your message
5. **API Documentation**: Access the API docs via the footer link
6. **Health Status**: Check the application health via the footer link

## Customization

The design uses CSS variables that can be easily customized:

```css
:root {
    --primary-color: #0078D7;
    --primary-dark: #005a9e;
    --secondary-color: #f3f3f3;
    --text-color: #333;
    --light-text: #666;
    --border-color: #ddd;
    --success-color: #4CAF50;
    --warning-color: #FFC107;
    --error-color: #F44336;
    --border-radius: 8px;
    --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}
```

To change the color scheme or other design elements, simply modify these variables.
