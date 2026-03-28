const repository = process.env.GITHUB_REPOSITORY ?? ''
const [, repoName = 'Blog'] = repository.split('/')
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const socialLinks = repository
  ? [{ icon: 'github', link: `https://github.com/${repository}` }]
  : []

/** @type {import('vitepress').UserConfig} */
export default {
  lang: 'zh-Hant',
  title: 'Alega Blog',
  description: '使用 VitePress 與 Markdown 建立的靜態 Blog',
  cleanUrls: true,
  lastUpdated: true,
  base: isGitHubActions ? `/${repoName}/` : '/',
  themeConfig: {
    logo: '/mark.svg',
    nav: [
      { text: '首頁', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '關於', link: '/about' }
    ],
    socialLinks,
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2026 Alega Blog'
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
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap' }]
  ]
}