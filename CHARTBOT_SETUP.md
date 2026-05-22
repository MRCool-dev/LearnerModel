# Chart Bot Setup Guide

## What's New

Your React/Vite project now includes a **Chart Bot powered by Google Gemini API**. It's a conversational AI assistant that helps you create, analyze, and visualize data.

## Getting Started

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click **"Create API Key"**
3. Copy your API key

### 2. Add API Key to `.env.local`

Edit `c:\Users\INFLIBNET\Desktop\node\.env.local`:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key.

### 3. Start the Dev Server

```bash
npm run dev
```

Your app will run at `http://localhost:5173/`.

### 4. Access Chart Bot

- Click the **📊 Chart Bot** button in the bottom-right corner of the home page
- Or the app will show the Chart Bot directly on load if configured to do so

## Features

- **Chat Interface**: Ask the bot to create charts, analyze data, or suggest visualizations
- **Chart Code Generation**: Get ready-to-use Chart.js code snippets
- **Data Analysis**: Upload or paste data for intelligent visualization suggestions
- **Real-time Responses**: Powered by Google Gemini Pro model

## Example Prompts

Try asking the bot:

- "Create a bar chart showing sales by month"
- "How should I visualize quarterly revenue trends?"
- "Analyze this data: [paste your data]"
- "What's the best chart type for comparing categories?"
- "Generate a scatter plot for correlation analysis"

## Files Created/Modified

- **`src/ChartBot.jsx`** — Main Chat Bot component
- **`.env.local`** — API key configuration (add your key here)
- **`src/main.jsx`** — Updated to include routing between home and chart bot

## Customization

### Change the Model

Edit `src/ChartBot.jsx` line 61:

```javascript
const model = genAI.current.getGenerativeModel({ model: "gemini-pro" });
```

Available models:
- `gemini-pro` (default)
- `gemini-pro-vision` (for image analysis)
- `gemini-1.5-pro` (newer, more capable)

### Modify the System Prompt

Edit the `systemPrompt` variable in `src/ChartBot.jsx` (around line 63) to customize the bot's behavior.

### Style Customization

All colors use CSS variables from `D` object at the top of `ChartBot.jsx`. Modify them to match your brand.

## Troubleshooting

### "API key not found" Error

- Check that `VITE_GEMINI_API_KEY` is set in `.env.local`
- Restart the dev server after adding the key

### No Response from Bot

- Check your API key is valid at [Google AI Studio](https://aistudio.google.com)
- Check browser console for error messages (F12)
- Ensure you have an active internet connection

### Rate Limiting

Google Gemini has free tier limits. If you hit them:
- Wait a few minutes before trying again
- Consider upgrading to a paid plan at [Google Cloud Console](https://console.cloud.google.com)

## Security Note

**Never commit `.env.local` to version control.** Add it to `.gitignore`:

```
.env.local
```

Your API key is sensitive — treat it like a password!

## Next Steps

1. ✅ Add your API key to `.env.local`
2. ✅ Run `npm run dev`
3. ✅ Click **📊 Chart Bot** and start chatting!
4. 📦 Optional: Integrate with your actual data sources
5. 🎨 Optional: Customize the UI to match your brand

Enjoy your Chart Bot! 🚀
