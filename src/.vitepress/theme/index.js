import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ArticleFooterLinks from './components/ArticleFooterLinks.vue'
import PostList from './components/PostList.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(ArticleFooterLinks)
    })
  },
  enhanceApp({ app }) {
    app.component('PostList', PostList)
  }
}
