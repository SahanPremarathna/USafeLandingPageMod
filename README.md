# USafe Website

USafe is a Vite-based marketing site for a proactive safety product. The project includes the main landing page plus dedicated `How It Works`, `Team`, and `Contact` pages, all sharing the same dark premium visual language, branded loader, and section-based background media system.

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

## Pages

- `index.html`
  Main landing page booted from `src/js/main.js`.
- `how-it-works.html`
  Cinematic product-story page rendered from `scripts/how-it-works-page.js`.
- `team.html`
  Team page with gallery, structured team layout, and narrative section.
- `contact.html`
  Contact flow page with selector-driven interaction panels and branded form experience.

## Main Project Structure

```text
src/
  assets/        Landing-page asset imports used by Vite
  content/       Landing-page copy, CTA links, and section media mapping
  js/            Landing-page rendering, startup flow, section media, and interactions
  styles/        Landing-page global, component, layout, and section styles
scripts/         Standalone page renderers and page-specific animation systems
styles/          Standalone page styles and animation layers
js/shared/       Shared standalone-page navigation, reveal, and page-loader logic
css/shared/      Shared standalone-page loader and footer styles
images/          Shared media used across pages, including background videos
assets/          Standalone-page assets such as the Team gallery
index.html       Main Vite entry HTML
how-it-works.html
team.html
contact.html
```

## Key Files

### Landing page

- `src/js/main.js`
  Landing-page boot sequence and feature initialization.
- `src/js/renderLanding.js`
  Main homepage renderer.
- `src/js/startupSplash.js`
  Homepage branded splash and first-paint loader behavior.
- `src/js/sectionBackgroundVideos.js`
  Homepage section-based background video controller.
- `src/content/usafeLandingContent.js`
  Landing-page copy, navigation links, CTAs, and section media map.
- `src/styles/layout.css`
  Landing-page layout, navigation, footer, and page-level section/video styling.
- `src/styles/components.css`
  Shared homepage buttons and UI primitives.
- `src/styles/sections.css`
  Homepage section structure, including `Why USafe`, Vision, and CTA layouts.

### Standalone pages

- `scripts/how-it-works-page.js`
  Renders the `How It Works` page content and section media keys.
- `scripts/how-it-works-animations.js`
  Reveal timing, metric animation, and panel entrance behavior for `How It Works`.
- `scripts/how-it-works-scroll-scenes.js`
  Scroll-scene focus system for cinematic section handoff.
- `scripts/team-page.js`
  Renders Team page content, gallery data, and team-member layout.
- `scripts/contact-page.js`
  Renders Contact page sections and interaction panels.
- `scripts/section-background-videos.js`
  Shared section-based background video controller for standalone pages.
- `js/shared/navigation.js`
  Shared nav behavior, current-page state, and mobile menu logic.
- `js/shared/pageLoader.js`
  Shared branded loader used on standalone pages.
- `css/shared/pageLoader.css`
  Shared loader styling.
- `css/shared/siteFooter.css`
  Shared footer styling used across standalone pages.

## Current Feature Notes

- Branded splash/loading system with dark first-paint shell
- Shared current-page nav state with animated underline
- Section-based background video switching on the landing page and standalone pages
- Cinematic `How It Works` page with scroll-scene transitions, directional panel reveals, and ambient signal motion
- Interactive homepage 3D phone showcase with hover, drag, and idle float behavior
- `Why USafe` scroll-state cards with stage-based active styling
- Team page image gallery, layered team layout, and narrative closing section
- Contact page selector-driven message/email/call interaction flow
- Shared footer system across standalone pages

## Dependencies

- `vite`
  Dev server and build pipeline.
- `gsap`
  Scroll-triggered and timeline-based animation.
- `lenis`
  Smooth scrolling.
- `three`
  Currently installed in project dependencies, but not required for the current main page flow.

## Notes

- `dist/` contains generated build output.
- `copyIndex.html`, `features.html`, `splash2.html`, and `tempSplash.html` are legacy/extra files and are not part of the primary page flow.
- Background videos are mapped per page in code:
  - homepage: `src/content/usafeLandingContent.js`
  - standalone pages: the corresponding page renderer in `scripts/`
- If you change media under `images/` or `assets/`, rebuild before deployment.

## Deployment

Deploy the contents of `dist/` after running:

```bash
npm run build
```
