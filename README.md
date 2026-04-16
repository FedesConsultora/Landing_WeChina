# 🇨🇳 WeChina Landing Page

Premium Multi-Page Application for WeChina, a logistics and trade consultancy specializing in the Asian market. Built with performance, aesthetics, and modern standards in mind.

## 🚀 Tech Stack

- **Vite:** Next-generation frontend tooling.
- **Sass (Dart Sass):** Structured with a modular 7-1 pattern.
- **Vanilla JS:** Lightweight and high-performance.

## 🎨 Design Principles

The project follows a **Premium Industrial** aesthetic:
- **Colors:** WeChina Red (#da251c), Deep Carbon, and Soft White.
- **Typography:** Outfit (Headings) and Inter (Body).
- **Interactivity:** Smooth transitions, glassmorphism headers, and responsive grids.

## 🛠 Sass Guidelines (CRITICAL)

To maintain a modern and clean codebase, follow these rules when editing styles:

1. **NO `@import`:** Use the modern Sass module system with **`@use`**.
2. **NO `lighten()` or `darken()`:** These functions are deprecated. Instead, use the `sass:color` module:
   - Use `color.adjust($color, $lightness: 20%)` or `color.scale()`.
   - Helper functions are provided in `src/scss/abstracts/_variables.scss`.
3. **Modular SCSS:** Keep styles scoped to their respective modules (abstracts, base, layout, pages).

## 📦 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

---
*Created by Antigravity for FedesConsultora.*
