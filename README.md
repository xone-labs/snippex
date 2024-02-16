# Snippex

Snippex is an open-source web application tool designed to help developers create beautiful code-only presentations with customizable themes, backgrounds, and window styles. Ideal for use in blogs or
any website, Snippex offers a unique feature called Code Flow, allowing the grouping of slides to explain similar or dependent code sections.

## Features

- **Code Flow:** Group slides to explain related or dependent code sections.
- **Customization:** Customize themes, backgrounds, and window styles for a visually appealing code presentation.
- **Snapshot Export:** Take snapshots of the canvas to export code presentations as images.
- **Offline Support:** Works offline in any browser using cached versions and web workers.

## Tech Stack

- **Frontend:** Nuxt, UnoCSS, TypeScript
- **Animation:** GSAP and Web Animation API
- **Code Editor:** Monaco Editor
- **Syntax Highlighting:** Shiki Highlighter
- **Data Storage:** IndexedDB (primary), LocalStorage (small data)

## Development Prerequisites

Before you begin development on Snippex, make sure you have the following installed:

- [Node.js LTS (20.11.0)](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Setting up ESLint

We use ESLint for code linting. To set it up, consider one of the following options:

- **Code Editor Extension:** Install ESLint extension in your IDE for automatic linting.
- **Command Line:** Run ESLint with pnpm: `pnpm run lint`

## Contributing

We welcome contributions to Snippex! If you'd like to contribute, please check out our [contribution guidelines](CONTRIBUTING.md).

## Milestones and Features

- **Milestone 1: MVP**
    - [ ] Code Flow implementation
    - [ ] Slide transitions
        - [ ] Code Flow transition (slide, fade, zoom, etc based on Animate.css)
        - [ ] Slide (code) transition using FLIP (first last invert play) with speed customization
    - [ ] Theme Customization and Properties
        - [ ] Background (animated gradient, GIF)
        - [ ] Window Style and Frames
        - [ ] Syntax Highlightings
    - [ ] Export Presentation for Previewer (JSON export)

- **Milestone 2: Offline Support**
    - [ ] Implement web workers
    - [ ] Cache versions for offline use

- **Milestone 3: Enhancements**
    - [ ] Advanced customization options
    - [ ] Additional code editor support
    - [ ] Improved syntax highlighting

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

---

**Open Source:** Snippex is an open-source project. We encourage collaboration and appreciate your contributions to make it even better!
