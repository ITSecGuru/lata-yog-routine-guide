# Lata Yog Routine Guide

A modular React + Vite yoga routine guide rebuilt from the provided specification.

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- lucide-react

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build locally

```bash
npm run build
```

## Preview local production build

```bash
npm run preview
```

## GitHub Pages deployment

This project is already prepared for GitHub Pages.

Key files:

- `.github/workflows/deploy.yml`
- `vite.config.js`
- `GITHUB_PAGES_SETUP.md`

For a beginner-friendly publishing guide, open `GITHUB_PAGES_SETUP.md`.

## Architecture

- `src/data`: routine definitions, sequence data, safety notes, audio prompts, UI text, illustration maps
- `src/lib`: reusable helpers for timing, breathing, speech, and routine logic
- `src/components`: layout, controls, breathing, sequence, and step list UI
- `src/App.jsx`: app composition and state orchestration

## Notes

- The project is self-contained and restorable.
- Only Surya Namaskar is implemented as a grouped sequence.
- The 12 Yogic Jogging items are independent top-level steps.
- Picture and Video link areas are intentionally placeholder panels.
