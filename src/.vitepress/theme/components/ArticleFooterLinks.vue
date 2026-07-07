<script setup>
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'
import { data as allPosts } from '../data/posts.data.mjs'

const route = useRoute()

const currentPost = computed(() => {
  const currentPath = normalizePath(route.path)
  return allPosts.find((post) => normalizePath(post.url) === currentPath)
})

const seriesPosts = computed(() => {
  const post = currentPost.value

  if (!post?.series) {
    return []
  }

  return allPosts
    .filter((item) => item.series === post.series)
    .slice()
    .sort(compareSeriesPosts)
})

const adjacentSeriesPosts = computed(() => {
  const index = seriesPosts.value.findIndex((post) => post.url === currentPost.value?.url)

  if (index < 0) {
    return { previous: null, next: null }
  }

  return {
    previous: seriesPosts.value[index - 1] ?? null,
    next: seriesPosts.value[index + 1] ?? null
  }
})

const recentPosts = computed(() => {
  const post = currentPost.value

  if (!post) {
    return []
  }

  return allPosts
    .filter((item) => item.url !== post.url && item.timestamp < post.timestamp)
    .slice()
    .sort((first, second) => second.timestamp - first.timestamp)
    .slice(0, 3)
})

const hasArticleFooterLinks = computed(() => {
  return Boolean(
    adjacentSeriesPosts.value.previous ||
      adjacentSeriesPosts.value.next ||
      recentPosts.value.length
  )
})

function compareSeriesPosts(first, second) {
  const firstOrder = first.seriesOrder ?? Number.POSITIVE_INFINITY
  const secondOrder = second.seriesOrder ?? Number.POSITIVE_INFINITY

  if (firstOrder !== secondOrder) {
    return firstOrder - secondOrder
  }

  return first.timestamp - second.timestamp
}

function formatDate(value) {
  const timestamp = Date.parse(value)

  if (Number.isNaN(timestamp)) {
    return value
  }

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(timestamp))
}

function normalizePath(path) {
  return path.replace(/\.html$/, '').replace(/\/$/, '') || '/'
}

function postHref(url) {
  return withBase(url)
}
</script>

<template>
  <aside v-if="hasArticleFooterLinks" class="article-footer-links" aria-label="文章延伸閱讀">
    <section
      v-if="adjacentSeriesPosts.previous || adjacentSeriesPosts.next"
      class="article-related-section"
    >
      <h2>同系列文章</h2>

      <div class="article-series-links">
        <a
          v-if="adjacentSeriesPosts.previous"
          class="article-series-link"
          :href="postHref(adjacentSeriesPosts.previous.url)"
        >
          <span class="article-series-label">上一篇</span>
          <span class="article-series-title">{{ adjacentSeriesPosts.previous.title }}</span>
        </a>

        <a
          v-if="adjacentSeriesPosts.next"
          class="article-series-link"
          :href="postHref(adjacentSeriesPosts.next.url)"
        >
          <span class="article-series-label">下一篇</span>
          <span class="article-series-title">{{ adjacentSeriesPosts.next.title }}</span>
        </a>
      </div>
    </section>

    <section v-if="recentPosts.length" class="article-related-section">
      <h2>近期文章</h2>

      <ul class="article-recent-list">
        <li v-for="post in recentPosts" :key="post.url">
          <a :href="postHref(post.url)">{{ post.title }}</a>
          <span v-if="post.date">{{ formatDate(post.date) }}</span>
        </li>
      </ul>
    </section>
  </aside>
</template>
