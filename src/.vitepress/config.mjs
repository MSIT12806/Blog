import { spawnSync } from 'node:child_process'

const repository = process.env.GITHUB_REPOSITORY ?? ''
const [, repoName = 'Blog'] = repository.split('/')
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const hasGit = !spawnSync('git', ['--version'], { stdio: 'ignore' }).error
const socialLinks = repository
  ? [{ icon: 'github', link: `https://github.com/${repository}` }]
  : []

/** @type {import('vitepress').UserConfig} */
export default {
  lang: 'zh-Hant',
  title: 'Robin',
  description: 'Robin 的技術筆記、作品入口與個人介紹網站',
  cleanUrls: true,
  lastUpdated: hasGit,
  base: isGitHubActions ? `/${repoName}/` : '/',
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
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap' }]
  ]
}