# ML Chatbot Data Folder

This folder contains placeholder conversation data for the ML/NLP chatbot.

## Purpose
- Store sample chatbot conversations
- Provide fallback responses for testing

## Files
- `sample_chat.json` - Example conversation pairs

## Conversation Format
```json
[
  {
    "user": "User question or message",
    "bot": "Bot response or answer"
  }
]
```

## Future Integration
Replace this placeholder data with real ML/NLP model:
1. Connect to actual NLP API (OpenAI, Anthropic, etc.)
2. Implement context-aware responses
3. Add conversation history tracking
4. Integrate with user profiles for personalized advice

## API Endpoint
`POST /api/ml/chatbot`
