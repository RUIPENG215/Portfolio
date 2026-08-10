# Ruipeng Wang — Portfolio

A responsive, multidisciplinary portfolio presenting industrial design, interaction design, engineering and humanities work through detailed project case studies.

## Technology

- React 19 and TypeScript
- Vite 7
- Tailwind CSS
- Framer Motion
- React Router
- Lucide React
- EmailJS contact delivery
- Vercel Analytics, Speed Insights and Google Analytics

## Requirements

- Node.js `20.19+` or `22.12+`
- npm

The repository includes an `.nvmrc` file. If you use nvm, run `nvm use` before installing dependencies.

## Local development

```bash
git clone https://github.com/RUIPENG215/Portfolio.git
cd Portfolio
nvm use
npm install
npm run dev
```

Vite prints the local preview URL, normally `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`.

## Project structure

```text
src/
├── components/   Shared navigation, layout, SEO and content renderers
├── context/      Initial-loading state and hooks
├── data/         Typed portfolio, résumé and social content
├── pages/        Route-level pages and project detail views
├── App.tsx       Routing, transitions, analytics and error recovery
└── main.tsx      React application entry point
```

Project detail pages are data-driven. Design and engineering records live in `src/data/` and are rendered from typed content blocks such as text, images, grids, quotes and video. Route pages are lazy-loaded to keep the initial bundle small.

## Routes

- `/` — profile, selected fields and résumé
- `/design` and `/design/:id` — design portfolio and case studies
- `/engineering` and `/engineering/:id` — engineering portfolio and case studies
- `/humanities` — photography and humanities work
- `/contact` — contact details and EmailJS form

Unknown routes render a dedicated 404 page. `vercel.json` rewrites direct route requests to the SPA entry point.

## Content and assets

- Portfolio copy and project structures: `src/data/`
- Images, video, logos and social preview: `public/`
- Theme tokens and typography: `tailwind.config.js`
- Global CSS: `src/index.css`

When adding a project, keep its numeric `id` unique and ensure referenced assets exist under `public/`.

## Deployment

The repository is configured for Vercel. Build with `npm run build` and publish `dist/`; the included rewrite rule preserves client-side routes on direct visits.

Designed and developed by Ruipeng Wang.
