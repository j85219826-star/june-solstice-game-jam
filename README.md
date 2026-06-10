# ☀️ Solstice Sync 🌌

[![June Solstice Game Jam 2026](https://img.shields.io/badge/Game_Jam-June_Solstice_2026-ffaa00?style=for-the-badge)](https://itch.io/)
[![Built With-React](https://img.shields.io/badge/Built_With-React-0077ff?style=for-the-badge)](https://react.dev/)
[![Styled With-Tailwind](https://img.shields.io/badge/Styled_With-Tailwind_CSS-00ff88?style=for-the-badge)](https://tailwindcss.com/)

An immersive, cosmic puzzle game developed exclusively for the **June Solstice Game Jam 2026**. 

In **Solstice Sync**, players step into the role of a celestial architect. Your mission is to align celestial bodies, balance gravitational fields, and synchronize the cosmic clock to trigger the perfect solstice. 

[🔗 Play the Game (Live Demo Link)](https://j85219826-star.github.io/june-solstice-game-jam/) | [📺 Watch the Video Demo](https://www.youtube.com/watch?v=EfIvIQ7KimU)

---

## 📅 Game Jam Theme Interpretation: "Solstice"

The game takes the core concept of a *solstice*—the precise moment when celestial alignment reaches its maximum point—and turns it into an interactive puzzle mechanism. 

Instead of just watching a planetary cycle, players must actively manipulate orbital nodes, shift gravitational paths, and manage state patterns to bring chaotic cosmic systems into perfect, harmonious synchronization. It’s a race against cosmic decay to achieve the ultimate seasonal balance.

---

## 🎮 Gameplay Mechanics & How to Play

*   **The Sync Matrix:** The game screen consists of interactive, nested orbital tracks containing planetary nodes.
*   **Gravitational Pull:** Clicking on or dragging celestial objects alters their speed and local gravity. You must match the shadows and light vectors perfectly.
*   **The Solstice Threshold:** Your objective is to align all planetary bodies along the central solar axis simultaneously. 
*   **Energy Constraints:** Every move shifts the cosmic calendar. You must synchronize the system before your tracking steps run out!

---

## 🛠️ Architecture & Technical Stack

Solstice Sync is a lightweight web game built entirely with highly responsive UI technology, showing that complex game mechanics can be driven efficiently on the web:

*   **Game Engine & UI Layer:** **React** — Managing complex game loops, level states, and real-time celestial node coordinates natively.
*   **Styling & Visual FX:** **Tailwind CSS** — Powering smooth cosmic theme transitions, starfield backgrounds, glassmorphic UI overlay panels, and solar glow mechanics.
*   **Performance Optimization:** Designed for maximum scannability and fluid frame rates across desktop screens, laptops, and mobile viewports.

---

## 📁 Repository Structure

```text
solstice-sync/
├── src/
│   ├── components/    # Game Canvas, Controls, and Level Overlays
│   ├── hooks/         # Custom Game Loop and Logic State Hooks
│   ├── App.jsx        # Main Game Container
│   └── index.css      # Core Tailwind Styling Configuration
├── public/            # Game Sound FX and Cosmic Assets
├── README.md          # Project Technical Documentation
└── package.json       # Dependency Specifications

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
