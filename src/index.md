---
layout: home

hero:
  name: Alega Blog
  text: 用 VitePress 架設的靜態技術部落格
  tagline: 以 Markdown 撰寫文章，編譯成可部署到 GitHub Pages 的靜態網站。
  image:
    src: /mark.svg
    alt: Alega Blog
  actions:
    - theme: brand
      text: 開始閱讀
      link: /posts/
    - theme: alt
      text: 關於這個網站
      link: /about

features:
  - title: Markdown First
    details: 文章直接使用 .md 撰寫，維護成本低，適合個人技術筆記與內容發佈。
  - title: GitHub Pages Ready
    details: 內建 GitHub Actions workflow，推送到主分支後即可自動部署。
  - title: Lightweight MVP
    details: 先用最小可行版本上線，之後再逐步加入分類、標籤、搜尋與評論。
---

## 最新文章

- [建立第一篇文章](/posts/hello-vitepress)
- [文章列表](/posts/)

## 這個 MVP 包含什麼

1. 一個首頁與導覽列。
2. 一個文章列表頁。
3. 一篇範例文章。
4. 可直接部署到 GitHub Pages 的 workflow。