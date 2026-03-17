# USafe Landing Page

USafe is a Vite-powered landing page experience focused on safety-first navigation, guardian support, AI safety intelligence, and cinematic product storytelling.

## Prerequisites

- Node.js 18+ recommended
- npm 9+ recommended

## Install

```bash
npm install
```

## Run Locally

Start the Vite development server:

```bash
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

## Production Build

Create an optimized build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Main Project Structure

```text
src/
  assets/        Mockups and local asset imports used by the app
  content/       Site copy and hero phrase metadata
  js/            Rendering, startup flow, scrolling, animations, interactions
  styles/        Global, section, hero, and startup/loading styles
images/          Project media files used by Vite imports
index.html       Main Vite entry HTML
```

## Key Files

- `src/js/main.js`
  App boot sequence, startup splash flow, and feature initialization.
- `src/js/renderLanding.js`
  Main landing page markup renderer.
- `src/js/startupSplash.js`
  Minimal branded splash intro and reusable loading indicator.
- `src/content/usafeLandingContent.js`
  Main landing page copy and section content.
- `src/content/heroTextContent.js`
  Rotating hero phrases, highlight metadata, and phone screen mapping.
- `src/styles/sections.css`
  Core section layouts and visual structure.
- `src/styles/heroPhraseSystem.css`
  Hero headline, phone showcase, and phrase-reactive styling.
- `src/styles/startupSplash.css`
  Splash intro and reusable loading indicator styles.

## Current Feature Notes

- Cinematic startup splash with centered USafe logo and ripple animation
- Reusable minimal loading indicator with logo and ripple pulse
- Animated hero headline with phrase-based styling and synced phone mockup
- Interactive 3D phone hover and drag behavior
- GSAP-powered section reveals and horizontal "Why USafe" story section
- Lenis-based smooth scrolling

## Dependencies

- `vite`
  Dev server and build pipeline.
- `gsap`
  Scroll-triggered and timeline-based animation.
- `lenis`
  Smooth scrolling.
- `three`
  Installed in the project dependencies, though the current landing flow no longer relies on the removed hero dot-field system.

## Notes

- `dist/` contains generated build output.
- The root also contains older standalone HTML files like `tempSplash.html`, `splash2.html`, `team.html`, and other pages which are separate from the main Vite app boot in `index.html`.
- If you change media under `images/` or content under `src/content/`, rerun `npm run build` before deployment.

## Deployment

Deploy the contents of `dist/` after running:

```bash
npm run build
```
