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