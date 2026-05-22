# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React + Vite educational web application featuring **interactive demos** and **design system documentation**. The project integrates Groq AI for a chat-based "Chart Bot" component and showcases a sophisticated design system called **"The Precision Authority"** — an Organic Brutalism aesthetic with Swiss-inspired typography and high-contrast visuals.

This is a modern frontend-focused project with no backend framework or database — all rendering is client-side React.

## Stack & Core Technologies

- **Frontend:** React 18.2, Vite 5.0 (bundler), @vitejs/plugin-react
- **Styling:** CSS-in-JS (inline styles in React components) + App.css global styles
- **AI Integration:** Groq SDK (groq-sdk 1.2.0) for chat completions via GPT OSS 20B
- **Type Safety:** TypeScript types available (@types/react, @types/react-dom)
- **Additional Libraries:** OpenAI SDK, bcryptjs, jsonwebtoken, Express (in dependencies but not actively used)

## Running the Application

```bash
# Development server with hot-reload
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

The dev server runs on `http://localhost:5173` by default (Vite standard).

## Environment Configuration

The application requires a `.env.local` file with:

```
VITE_GROQ_API_KEY=<your-groq-api-key>
```

This is loaded via `import.meta.env.VITE_GROQ_API_KEY` in components. Missing keys will display an error banner in the UI rather than crashing.

## Architecture & Code Structure

### Entry Point
- **`index.html`** — Root HTML file; mounts React at `<div id="root"></div>`
- **`src/main.jsx`** — React DOM initialization; renders `<App />` component
- **`src/App.jsx`** — Main application (347KB file containing docs, demos, design system showcase)

### Components

| Component | File | Purpose |
|-----------|------|---------|
| `ChartBot` | `src/ChartBot.jsx` | Groq-powered chat interface for data visualization queries |
| `App` (main) | `src/App.jsx` | Educational documentation with live demos (EventLoopDemo, QuizCard, CaseStudy, etc.) |

### Styling

- **`src/index.css`** — Global resets and baseline styles
- **`src/App.css`** — Component-scoped styles for App demo content
- **Design Tokens** — CSS custom properties (CSS vars) defined in App.jsx: `--surface`, `--primary`, `--secondary`, `--on-surface-variant`, etc.

The design system uses **Organic Brutalism** principles with a monochromatic charcoal base (`#000000`, `#0b1c30`) and a clean background (`#f8f9ff`). Typography is split between **Manrope** (headlines, display) and **Inter** (data, body). See [DESIGN.md](DESIGN.md) for the complete design specification.

### Primitive Components (in App.jsx)

Interactive building blocks used to structure demo content:

- **`CodeBlock`** — Syntax-highlighted code snippet with "copy" button
- **`Tip`** — Alert/advice box with icon, title, and content
- **`EasyBox`** — Colored info card for key concepts
- **`BigIdea`** — Numbered, left-bordered callout for important points
- **`QuizCard`** — Interactive multiple-choice with instant feedback
- **`CaseStudy`** — Expandable problem/solution cards
- **`EventLoopDemo`** — Animated step-through of JavaScript's event loop (with live execution)

These are **not exported**; they're local to the App component.

## Key Design Patterns

### CSS Variables for Design Tokens

All colors are stored as CSS custom properties (top of App.jsx):

```javascript
const D = {
  bg: "var(--surface)",
  primary: "var(--primary)",
  green: "var(--secondary)",
  // ... etc
};
```

This centralizes theming. To update colors globally, modify the CSS var definitions (currently in App.jsx; consider moving to global CSS for larger projects).

### Inline Styles + CSS-in-JS

Components use React inline styles (`style={...}`) for component-scoped styling. This avoids class name collisions and keeps styling logic near the JSX. Global/shared styles go in `.css` files.

**When adding new components:**
- Simple, isolated styling → use inline `style` prop
- Shared styles across components → add to `.css` files
- Complex animations or pseudo-selectors (`:hover`, `::before`) → define in `<style>` tags within the component

### Groq AI Integration (ChartBot)

The ChartBot component:

1. **Initializes Groq client** in `useEffect` from the `VITE_GROQ_API_KEY` environment variable
2. **Sends chat history** with a system prompt restricting responses to ~200 words in plain text (no markdown, no tables)
3. **Model used:** `openai/gpt-oss-20b` (via Groq's API)
4. **Error handling:** Displays user-friendly error messages; logs to browser console

The system prompt enforces brevity to keep the UI clean. Modify the prompt in `sendMessage()` to change bot behavior.

## Important Constraints & Patterns

### No Backend Framework
There is no Express/Node server deployed. The Express and auth libraries in `package.json` are unused. If backend features are needed, create a separate `server.js` or consider alternatives (Vite has SSR support, but it's not currently configured).

### No Test Suite
There are no Jest, Vitest, or other test runners configured. Tests would need to be added to `package.json` and integrated.

### State Management
App state is managed with React hooks (`useState`, `useRef`, `useEffect`). For larger apps, consider Context API or libraries like Redux/Zustand.

### File Size Note
`src/App.jsx` is large (347KB) because it contains all educational content and components inline. If this grows further, consider:
- Splitting components into separate files in `src/components/`
- Creating a `src/docs/` directory for lesson modules

### URL Parameters & Routing
No client-side router (React Router) is configured. The app is a single page. If you need routing, add `react-router-dom` and restructure entry points.

## Development Practices

### Adding New Components
1. Create a new `.jsx` file in `src/`
2. Import in `src/App.jsx` or `src/main.jsx`
3. Use inline styles (matching the design system tokens in `D`) or add to a `.css` file if shared
4. Test in dev with `npm run dev`

### Updating Styles
- Global resets/typography → `src/index.css`
- App-specific styles → `src/App.css`
- Component styles → inline `style` prop (preferred for isolation)
- Design token changes → update the `D` object and CSS custom property definitions

### Working with Groq API
- API key is sensitive; keep it in `.env.local`, never commit it
- Test responses in development; Groq has rate limits
- Update the system prompt in `ChartBot.jsx` to customize behavior
- If using different models, update the `model` field in the `create()` call

## Common Tasks

**Start development:**
```bash
npm install  # if needed
npm run dev
```

**Build for production:**
```bash
npm run build
npm run preview  # test the build locally
```

**Add a new component:**
1. Create `src/MyComponent.jsx`
2. Import in `src/App.jsx` or `src/main.jsx`
3. Use design tokens from `D` object for consistent styling

**Customize design:**
1. Update CSS custom properties (look for `--primary`, `--surface`, etc. definitions)
2. Update the `D` object in App.jsx to reference new tokens
3. Or modify individual component styles inline

**Debug Groq integration:**
- Check that `.env.local` has `VITE_GROQ_API_KEY`
- Inspect the Network tab in DevTools to see API requests to Groq
- Check the browser console for error messages
- Verify the API key is valid and has sufficient quota

## References

- [Vite documentation](https://vitejs.dev/)
- [React documentation](https://react.dev/)
- [Groq API documentation](https://console.groq.com/)
- [DESIGN.md](DESIGN.md) — Detailed design system specification (Organic Brutalism, typography, colors)
