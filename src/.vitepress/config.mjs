import { spawnSync } from 'node:child_process'

const repository = process.env.GITHUB_REPOSITORY ?? ''
const [ownerName = 'MSIT12806', repoName = 'Blog'] = repository.split('/')
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const hasGit = !spawnSync('git', ['--version'], { stdio: 'ignore' }).error
const siteUrl =
  process.env.SITE_URL ??
  (isGitHubActions
    ? `https://${ownerName.toLowerCase()}.github.io/${repoName}/`
    : 'https://msit12806.github.io/Blog/')
const gaMeasurementId = process.env.VITE_GA_ID || process.env.GA_MEASUREMENT_ID || 'G-WEEBE28NTY'
const socialLinks = repository
  ? [{ icon: 'github', link: `https://github.com/${repository}` }]
  : []

function pageToPath(page) {
  const path = page
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')

  if (!path) return '/'
  return `/${path}`
}

function pageUrl(page) {
  return new URL(pageToPath(page).replace(/^\//, ''), siteUrl).toString()
}

const analyticsHead = gaMeasurementId
  ? [
      ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}` }],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', { anonymize_ip: true });`
      ]
    ]
  : []

/** @type {import('vitepress').UserConfig} */
export default {
  lang: 'zh-Hant',
  title: 'Robin',
  description: 'Robin 的技術筆記、作品入口與個人介紹網站',
  cleanUrls: true,
  lastUpdated: hasGit,
  base: isGitHubActions ? `/${repoName}/` : '/',
  sitemap: {
    hostname: siteUrl
  },
  themeConfig: {
    logo: '/mark.svg',
    nav: [
      { text: '首頁', link: '/' },
      { text: '接案合作', link: '/services' },
      { text: '文章', link: '/posts/' },
      { text: '關於', link: '/about' }
      // 履歷頁入口暫時隱藏。
      // 如需恢復，加入：{ text: '認識我', link: '/profile' },
    ],
    socialLinks,
    footer: {
      message: 'Built with VitePress and shaped into a personal site.',
      copyright: 'Copyright © 2026 Robin'
    },
    outline: {
      label: '本頁內容'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#b83b24' }],
    ['meta', { name: 'author', content: 'Robin' }],
    ['meta', { property: 'og:site_name', content: 'Robin' }],
    ['meta', { property: 'og:locale', content: 'zh_TW' }],
    ['meta', { property: 'og:image', content: new URL('mark.svg', siteUrl).toString() }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap' }],
    ...analyticsHead
  ],
  transformHead({ page, pageData, title, description }) {
    const url = pageUrl(page)
    const type = pageData.frontmatter?.date ? 'article' : 'website'

    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: type }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }]
    ]
  }
}
