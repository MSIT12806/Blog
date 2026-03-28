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

## Deploy to GitHub Pages

Push this repository to GitHub and enable GitHub Pages for GitHub Actions.

The workflow file is located at `.github/workflows/deploy.yml`.

The GitHub Pages `base` path is detected automatically from the GitHub Actions repository environment.