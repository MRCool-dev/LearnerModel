# LearnerModel

An interactive educational web application featuring **live JavaScript/Node.js demos**, **quizzes**, **code examples**, and an **AI-powered Chart Bot**. Built with React + Vite using a sophisticated design system inspired by Organic Brutalism.

## Features

### 📚 Interactive Learning Content
- **Event Loop Visualization** — Step-by-step animated demo of JavaScript's event loop, microtasks, and timer queue
- **Quizzes** — Interactive multiple-choice with instant feedback and explanations
- **Case Studies** — Expandable problem/solution scenarios
- **Code Blocks** — Syntax-highlighted snippets with copy-to-clipboard functionality
- **Educational Components** — Tips, alerts, callouts, and advice boxes for key concepts

### 🤖 Chart Bot (AI Integration)
An intelligent chat interface powered by **Groq AI** (GPT OSS 20B) for asking questions about data visualization, charts, and technical topics. Responses are optimized for brevity and clarity.

### 🎨 Design System: "The Precision Authority"
A high-contrast, Swiss-inspired design language emphasizing:
- **Organic Brutalism** — Intentional asymmetry, dramatic typography, and clean white space
- **Monochromatic Base** — Deep charcoal (`#000000`, `#0b1c30`) with accent colors only for signal (success/warning)
- **Typography Split** — Manrope for headlines, Inter for data and body text
- **No Decorative Borders** — Hierarchy through color and spacing, not lines

See [DESIGN.md](DESIGN.md) for the complete design specification.

## Tech Stack

- **Frontend:** React 18.2, Vite 5.0, @vitejs/plugin-react
- **Styling:** CSS-in-JS (inline styles) + global CSS
- **AI Integration:** Groq SDK (groq-sdk 1.2.0)
- **Additional:** OpenAI SDK, bcryptjs, jsonwebtoken, Express (in dependencies but not actively used)

## Getting Started

### Prerequisites
- Node.js 16+ (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone <repository>
cd node
npm install
```

### Environment Setup

Create a `.env.local` file in the project root:

```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Obtain a Groq API key from [console.groq.com](https://console.groq.com/).

### Development

```bash
npm run dev
```

Starts the development server on `http://localhost:5173` with hot-reload enabled.

### Production

```bash
npm run build    # Create optimized bundle in dist/
npm run preview  # Preview the production build locally
```

## Project Structure

```
node/
├── src/
│   ├── main.jsx           # React DOM entry point
│   ├── App.jsx            # Main app (docs, demos, design system showcase)
│   ├── ChartBot.jsx       # Groq AI-powered chat component
│   ├── App.css            # Component styles
│   ├── index.css          # Global styles
├── index.html             # Root HTML
├── vite.config.js         # Vite configuration
├── CLAUDE.md              # Claude Code guidance (codebase documentation)
├── DESIGN.md              # Design system specification
├── package.json
└── .env.local             # Environment variables (not in git)
```

## Key Components

### App (src/App.jsx)
The main educational content hub featuring:
- **EventLoopDemo** — Animated JavaScript event loop visualization
- **QuizCard** — Interactive multiple-choice questions with immediate feedback
- **CaseStudy** — Expandable problem/solution comparisons
- **CodeBlock** — Copy-enabled code snippets with labels
- **Primitive UI Blocks** — Tip, EasyBox, BigIdea for content structure

### ChartBot (src/ChartBot.jsx)
AI-powered chat interface with:
- Groq API integration for real-time responses
- Message history tracking
- Error handling and user-friendly error messages
- Smooth message scrolling with timestamps
- Loading states with animated indicator

## Styling & Design Tokens

The app uses CSS custom properties for theming. Colors are defined as design tokens and can be updated globally:

```javascript
const D = {
  bg: "var(--surface)",
  primary: "var(--primary)",
  green: "var(--secondary)",
  // ... more tokens
};
```

**Color Palette:**
- **Primary (Text):** `#000000` (charcoal)
- **Background:** `#f8f9ff` (cool white)
- **Surface Levels:** Container layers with increasing contrast
- **Signal Colors:** Green (`#006d35`) for success, Orange (`#ffb77d`) for warnings

## Development Tips

### Adding New Components
1. Create a new `.jsx` file in `src/`
2. Import and use in `App.jsx` or as a standalone page
3. Use design tokens from the `D` object for consistent styling
4. Test in dev mode with hot-reload

### Customizing the Chat Bot
Edit the system prompt in `src/ChartBot.jsx` (inside `sendMessage()`) to change bot behavior, tone, or constraints.

### Updating Design
- Global changes → modify CSS custom properties
- Component-specific → use inline `style` prop or `.css` files
- Add animations → use `<style>` tags within components or `.css` files

## Troubleshooting

**Chart Bot shows "API key not found" error:**
- Verify `.env.local` has `VITE_GROQ_API_KEY=your_key`
- Restart the dev server after updating `.env.local`
- Check that the key is valid and has sufficient quota

**Styles not updating:**
- Vite caches CSS; hard-refresh the browser (Ctrl+Shift+R)
- Check that CSS variable definitions are loaded

**Build fails:**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version with `node --version` (16+ required)

## Documentation

- **[CLAUDE.md](CLAUDE.md)** — Codebase architecture, patterns, and guidance for AI Code Assistants
- **[DESIGN.md](DESIGN.md)** — Complete design system specification and usage rules

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimized production bundle |
| `npm run preview` | Preview production build locally |

## License

MIT

## Author

Created with ❤️ for learning and teaching JavaScript/Node.js fundamentals.

