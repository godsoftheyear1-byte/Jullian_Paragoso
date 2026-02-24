# AI Chat Setup with Ollama

This portfolio includes an AI chatbot that knows all about Jullian Paragoso using Ollama.

## Your Current Setup

You already have Ollama installed with these models:
- `hooper216xo/openclaw:latest` (Currently configured)
- `deepseek-v3.1:671b-cloud`
- `gemma3:27b-cloud`

The AI chat is configured to use `hooper216xo/openclaw:latest`.

## Quick Start

1. **Make sure Ollama is running:**
   - Ollama should start automatically on Windows
   - If not, open a terminal and run: `ollama serve`

2. **Run your portfolio:**
   ```bash
   npm install
   npm run dev
   ```

3. **Click "Ask My AI"** button or the floating purple AI button to start chatting!

## How It Works

The AI chatbot:
- Uses Ollama's local API (no cloud, completely private)
- Has detailed knowledge about Jullian's skills, experience, and projects
- Can answer questions about hiring and availability
- Responds in a friendly, professional manner
- Runs entirely on your machine

## Changing the AI Model

To use a different model, edit `src/components/AIChat.jsx` and change this line:

```javascript
model: 'hooper216xo/openclaw:latest',  // Change to your preferred model
```

Available models on your system:
- `hooper216xo/openclaw:latest`
- `deepseek-v3.1:671b-cloud`
- `gemma3:27b-cloud`

Or download new models:
```bash
ollama pull llama3.2
ollama pull mistral
ollama pull phi3
```

## Troubleshooting

**"Sorry, I'm having trouble connecting"**
- Check if Ollama is running: Open Task Manager and look for "ollama"
- Restart Ollama: Run `ollama serve` in terminal
- Test connection: Run `ollama list` to see your models

**Slow responses**
- First response is always slower as the model loads into memory
- Subsequent responses should be much faster (2-5 seconds)
- The AI is optimized for quick responses with concise answers
- If still slow, try restarting Ollama: Close it and run `ollama serve`
- Cloud models (with `-cloud` suffix) may have different performance

**Model not working**
- Try a different model from your list
- Pull a new model: `ollama pull llama3.2`

## Performance Tips

To make the AI respond faster:
1. Keep Ollama running in the background (don't close it)
2. First response loads the model (10-15 seconds), then it's cached
3. Subsequent responses are much faster (2-5 seconds)
4. The AI is configured for concise, quick responses
5. Restart your computer if Ollama seems slow

## Testing Ollama

Test in terminal:
```bash
ollama run hooper216xo/openclaw:latest
```

Type a message and press Enter. Type `/bye` to exit.

## Features

- 💬 Real-time chat interface
- 🤖 AI knows all about Jullian's skills and projects
- 🎨 Beautiful navy blue themed UI
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🔒 100% private - runs locally on your machine
- 💼 Can answer questions about hiring Jullian

Enjoy chatting with Jullian's AI! 🚀

