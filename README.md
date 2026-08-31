# Khaled Eissa — Portfolio

Built with [Astro](https://astro.build) + TypeScript. Static output, dark theme,
smooth page transitions via Astro's View Transitions.

## Structure

- `src/pages/index.astro` — home page (name, title, summary, links, projects, blog previews, publications)
- `src/pages/blogs/index.astro` — full blog listing
- `src/pages/blogs/[slug].astro` — individual blog post page
- `src/content/blog/*.md` — blog posts (add new ones here, see below)
- `src/data/profile.ts`, `projects.ts`, `publications.ts` — edit these to update content
- `src/layouts/Layout.astro` — shared shell (nav, footer, transitions)
- `src/styles/global.css` — design tokens (colors, type) and shared styles

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

Other useful commands:

```bash
npm run build
npm run preview
```

## Customizing

- **Colors/fonts:** edit the CSS variables at the top of `src/styles/global.css`.
- **Nav items:** edit `src/layouts/Layout.astro` (`.nav-links`).
- **Profile/links/summary:** edit `src/data/profile.ts`.
- **Projects:** edit `src/data/projects.ts`.
- **Publications:** edit `src/data/publications.ts`.
