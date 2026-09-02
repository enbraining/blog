# Portfolio Landing Page 20 - Next.js, TypeScript, TailwindCSS Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-blue)](https://tailwindcss.com/)

A modern, full-featured portfolio and blog template built with the Next.js App Router, React 19, TypeScript, and Tailwind CSS. It showcases a single-page portfolio with hero, about, work experience, education, skills, projects, hackathons, and contact sections, plus a content-driven blog with MDX, pagination, and dynamic Open Graph images. Use it as a learning reference or as a starter for your own portfolio site.

**Live Demo:** [https://portfolio-ui-20.vercel.app/](https://portfolio-ui-20.vercel.app/)

![Screenshot 2026-03-10 at 12 43 32](https://github.com/user-attachments/assets/71a12c10-75e8-4de9-aaa4-4042f73bb291)
![Screenshot 2026-03-10 at 12 43 51](https://github.com/user-attachments/assets/506fba88-ef1b-4380-9e3a-fb9168698c71)
![Screenshot 2026-03-10 at 12 44 01](https://github.com/user-attachments/assets/cd2360f8-a91f-46db-9713-4e071a4b12b3)
![Screenshot 2026-03-10 at 12 44 12](https://github.com/user-attachments/assets/02f18039-2c73-4312-a832-ee0078ffe602)

## Table of Contents

- [Features & Functionality](#features--functionality)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Routes & Pages](#routes--pages)
- [Components Overview](#components-overview)
- [Content & Blog (MDX)](#content--blog-mdx)
- [Reusing Components](#reusing-components)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [License](#license)

---

## Features & Functionality

- **Single-page portfolio** with hero, about, work, education, skills, projects, hackathons, and contact.
- **Blog** powered by [Content Collections](https://content-collections.dev/) and MDX: write posts in `content/*.mdx` with frontmatter; they are type-safe and built at compile time.
- **Pagination** on the blog index (`/blog?page=1`, etc.) via `@/lib/pagination`.
- **Dynamic Open Graph images** for the site and blog using `next/og` (Edge runtime) for social previews.
- **Theme support** (light/dark) with `next-themes` and a mode toggle in the navbar.
- **Responsive layout** with a bottom dock navbar, tooltips, and accessible focus states.
- **SEO** via Next.js metadata (title, description, keywords, Open Graph, Twitter, robots, favicon).
- **Structured data** (JSON-LD) on blog posts for richer search results.
- **Security headers** (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) in `next.config.mjs`.

---

## Tech Stack

| Layer      | Technology                                                      |
| ---------- | --------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)                              |
| UI         | React 19, TypeScript 5.9                                        |
| Styling    | Tailwind CSS 4, tailwindcss-animate, tw-animate-css             |
| Content    | content-collections, MDX, remark-gfm, rehype-pretty-code, shiki |
| Components | Radix UI (Accordion, Avatar, Tooltip, etc.), Lucide icons       |
| Animation  | motion (framer-motion successor)                                |
| Utilities  | clsx, tailwind-merge, class-variance-authority                  |

---

## Project Structure

```bash
portfolio-ui-20/
├── content/                    # MDX blog posts (source of truth for blog)
│   └── *.mdx
├── public/                     # Static assets (images, fonts, favicon)
├── src/
│   ├── app/                    # App Router: routes and layouts
│   │   ├── layout.tsx          # Root layout, fonts, metadata, theme, navbar
│   │   ├── page.tsx            # Home: hero, about, work, education, skills, projects, hackathons, contact
│   │   ├── favicon.ico         # Site icon (referenced in metadata)
│   │   ├── globals.css
│   │   ├── not-found.tsx       # 404 page
│   │   ├── opengraph-image.tsx  # Dynamic OG image for site
│   │   └── blog/
│   │       ├── page.tsx        # Blog index with pagination
│   │       ├── opengraph-image.tsx
│   │       └── [slug]/
│   │           ├── page.tsx    # Single post (MDX), generateStaticParams, generateMetadata
│   │           └── opengraph-image.tsx
│   ├── components/
│   │   ├── navbar.tsx          # Bottom dock + theme toggle + social links
│   │   ├── theme-provider.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── section/            # work, projects, hackathons, contact
│   │   ├── magicui/            # blur-fade, blur-fade-text, flickering-grid, dock
│   │   ├── ui/                 # Radix-based primitives + SVGs (badge, button, card, etc.)
│   │   ├── mdx/                # code-block, media-container
│   │   ├── project-card.tsx
│   │   ├── timeline.tsx
│   │   └── icons.tsx
│   ├── data/
│   │   └── resume.tsx          # Single source: name, bio, work, education, skills, projects, hackathons, contact
│   ├── lib/
│   │   ├── utils.ts            # cn(), formatDate()
│   │   ├── pagination.ts       # paginate(), normalizePage()
│   │   └── remark-code-meta.ts
│   └── mdx-components.tsx      # Custom MDX components (CodeBlock, hr, table, code)
├── content-collections.ts      # Content Collections config (posts schema, MDX compile)
├── next.config.mjs             # withContentCollections, security headers
├── eslint.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0 (see `engines` in `package.json`)

### Install and run

```bash
# Clone (or use this repo as template)
git clone <your-repo-url>
cd portfolio-ui-20

# Install dependencies
npm install

# Development (with Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `src/data/resume.tsx` and `content/*.mdx` to customize content; the dev server will hot-reload.

### Build and start production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
npm run lint:fix   # Auto-fix where possible
```

---

## Environment Variables

This project **does not require any environment variables** for the demo. All content is driven by:

- **Resume/portfolio data:** `src/data/resume.tsx` (name, bio, work, education, skills, projects, contact, etc.)
- **Blog posts:** `content/*.mdx` (title, summary, dates, body)
- **Site URL and title:** hardcoded in `src/app/layout.tsx` (`SITE_URL`, `SITE_TITLE`) for metadata and OG images

If you later add features that need env vars (e.g. analytics, API keys, or a different base URL), you can:

1. Create a `.env.local` in the project root (never commit secrets).
2. Use `process.env.NEXT_PUBLIC_*` for client-exposed values and plain `process.env.*` for server-only.
3. Optionally add a `.env.example` listing variable names (without real values) for other developers.

Example (optional, not used in current codebase):

```bash
# .env.example (optional)
# NEXT_PUBLIC_SITE_URL=https://yoursite.com
# NEXT_PUBLIC_GA_ID=
```

---

## Routes & Pages

| Route          | Type    | Description                                                                           |
| -------------- | ------- | ------------------------------------------------------------------------------------- |
| `/`            | Static  | Home: hero, about, work, education, skills, projects, hackathons, contact             |
| `/blog`        | Dynamic | Blog index; supports `?page=` for pagination (5 posts per page)                       |
| `/blog/[slug]` | SSG     | Single blog post; slugs from `content/*.mdx` filenames (e.g. `api-design-principles`) |

There are **no custom API routes** in this project. Data comes from:

- **Resume:** `import { DATA } from "@/data/resume"` in layout, page, and section components.
- **Blog:** `import { allPosts } from "content-collections"` in `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`.

OG images are generated by route handlers:

- `app/opengraph-image.tsx` → `/opengraph-image` (or equivalent for default OG)
- `app/blog/opengraph-image.tsx` → blog index OG
- `app/blog/[slug]/opengraph-image.tsx` → per-post OG

---

## Components Overview

### Layout & shell

- **`layout.tsx`** – Root layout: Geist fonts, metadata, `ThemeProvider`, `TooltipProvider`, `FlickeringGrid` background, main content wrapper, `Navbar`.
- **`Navbar`** – Fixed bottom dock: nav links (Home, Blog), social icons, theme toggle; uses `Dock`/`DockIcon` and Radix `Tooltip`.

### Sections (home page)

- **`WorkSection`** – Accordion of work items from `DATA.work` (company, title, dates, description).
- **`ProjectsSection`** – Project cards (title, description, tech, links, optional video) from `DATA.projects`.
- **`HackathonsSection`** – Grid of hackathon cards from `DATA.hackathons`.
- **`ContactSection`** – Contact copy and social links from `DATA.contact`.

### UI primitives (`components/ui/`)

- **Accordion, Avatar, Badge, Button, Card, Separator, Tooltip** – Radix-based; used across sections and blog.
- **SVG icons** – e.g. React, Next.js, TypeScript, Node, Python, Go, Postgres, Docker, Kubernetes (used in skills and elsewhere).

### Magic UI (`components/magicui/`)

- **BlurFade / BlurFadeText** – Scroll/reveal animations; used on home and blog.
- **FlickeringGrid** – Animated grid in layout background.
- **Dock / DockIcon** – Dock-style nav bar.

### MDX

- **`mdx-components.tsx`** – Maps `pre` → `CodeBlock`, custom `hr`, `table`, inline `code`; exports `MediaContainer`.
- **`CodeBlock`** – Syntax-highlighted code (e.g. Shiki) with optional meta.
- **`MediaContainer`** – Wrapper for images/embeds in MDX.

---

## Content & Blog (MDX)

Blog posts live in `content/` as `.mdx` files. Each file must have this frontmatter (enforced by `content-collections.ts`):

```yaml
---
title: "Your Post Title"
publishedAt: "2024-12-12"
updatedAt: "2024-12-12" # optional
author: "Author Name" # optional
summary: "Short description for listing and OG."
image: "/path/or/url" # optional; used for OG and listing
---
```

The body supports standard MDX (JSX, imports, GFM). Example:

```mdx
---
title: "Getting Started with Next.js"
publishedAt: "2024-01-15"
summary: "A short intro to the App Router."
---

# Getting Started with Next.js

Your content here. You can use **markdown** and components.
```

After adding or editing a post, run `npm run build` (or rely on dev) so Content Collections regenerates; the blog index and `/blog/[slug]` will update. Slugs are derived from the file path (e.g. `content/api-design-principles.mdx` → `/blog/api-design-principles`).

---

## Reusing Components

### Using this repo as a template

1. Clone the repo and run `npm install`.
2. Replace content in `src/data/resume.tsx` (name, url, work, education, skills, projects, hackathons, contact).
3. Add or edit `content/*.mdx` for your blog.
4. Update `SITE_URL` and `SITE_TITLE` in `src/app/layout.tsx` for metadata and OG.
5. Optionally add `public/me.png` (avatar) and other images; ensure paths in `resume.tsx` match.

### Using individual components in another Next.js project

- **Copy** the component file(s) and any `components/ui` dependencies (e.g. `Tooltip`, `Accordion`).
- **Copy** `src/lib/utils.ts` for `cn()` and `formatDate()` if the component uses them.
- **Tailwind:** Ensure your project uses Tailwind and the same design tokens (e.g. `background`, `foreground`, `muted`, `border`, `primary`) or adjust class names.
- **Data:** Replace `DATA` usage with your own data source (props, CMS, or another module).

Example – reusing the work section with your own data:

```tsx
// In your app, e.g. app/page.tsx
import WorkSection from "@/components/section/work-section";

// If you keep DATA in resume.tsx, no change. Otherwise pass work array as prop:
// <WorkSection items={myWork} />
```

To reuse only the dock navbar:

- Copy `navbar.tsx`, `magicui/dock.tsx`, `mode-toggle.tsx`, and the UI primitives they use (`Tooltip`, `Separator`).
- Provide a data structure that matches `DATA.navbar` and `DATA.contact.social` (or refactor to accept props).

---

## Configuration

- **Next.js:** `next.config.mjs` – `reactStrictMode: true`, `withContentCollections`, security headers.
- **Content Collections:** `content-collections.ts` – single collection `posts`, directory `content`, schema (title, publishedAt, summary, etc.), MDX compile with `remarkGfm` and `remarkCodeMeta`.
- **ESLint:** `eslint.config.mjs` – Next.js core-web-vitals and global ignores (`.next`, `out`, `build`, `.content-collections`).
- **TypeScript:** `tsconfig.json` – path alias `@/*` → `src/*`.

---

## Scripts

| Command            | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `npm run dev`      | Start dev server (Turbopack).                                  |
| `npm run build`    | Production build; runs Content Collections then Next.js build. |
| `npm start`        | Run production server after `build`.                           |
| `npm run lint`     | Run ESLint on source (excludes generated and build output).    |
| `npm run lint:fix` | Run ESLint with auto-fix.                                      |

---

## Keywords

Portfolio, personal website, Next.js, React, TypeScript, Tailwind CSS, App Router, MDX, Content Collections, blog, Open Graph, SEO, Radix UI, dark mode, responsive, Vercel, static site, SSG, developer portfolio, resume, projects, hackathons.

---

## Conclusion

This project is a complete portfolio + blog template with no backend or environment variables required. You get a modern stack (Next.js 16, React 19, TypeScript, Tailwind), type-safe content (Content Collections + MDX), good SEO and OG images, and reusable sections and UI. Use it to learn the App Router, metadata, and content pipelines, or as a base for your own portfolio and blog.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
