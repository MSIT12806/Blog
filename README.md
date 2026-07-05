# Blog MVP

This project is a VitePress-based static blog that can be deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## SEO

The site generates SEO-friendly static pages for GitHub Pages.

- `src/.vitepress/config.mjs` sets the site language, global metadata, canonical URLs, Open Graph tags, Twitter Card tags, and sitemap generation.
- `src/public/robots.txt` allows search crawlers and points them to the generated sitemap.
- After deployment, submit `https://msit12806.github.io/Blog/sitemap.xml` in Google Search Console to help Google discover the pages.

For best results, every page and post should include front matter:

```md
---
title: 頁面標題
description: 頁面摘要
---
```

Posts can also include `date`, which is used to mark them as article pages.

## Analytics

Google Analytics 4 is enabled with Measurement ID `G-WEEBE28NTY`.

The ID can be overridden for other environments with either `VITE_GA_ID` or `GA_MEASUREMENT_ID`.

Push to `main` and let GitHub Actions redeploy the site. After deployment, visits should appear in Google Analytics Realtime within a few minutes.

## Writing Posts

Add markdown files under `src/posts/` and include at least these front matter fields:

```md
---
title: 文章標題
date: 2026-03-28
description: 文章摘要
---
```

The home page and posts list page will automatically load files from `src/posts/*.md` and sort them by `date`.

## Deploy to GitHub Pages

Push this repository to GitHub and enable GitHub Pages for GitHub Actions.

The workflow file is located at `.github/workflows/deploy.yml`.

The GitHub Pages `base` path is detected automatically from the GitHub Actions repository environment.
