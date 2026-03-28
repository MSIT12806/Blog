<script setup>
import { computed } from 'vue'
import { data as allPosts } from '../data/posts.data.mjs'

const props = defineProps({
  limit: {
    type: Number,
    default: 0
  },
  emptyText: {
    type: String,
    default: '目前還沒有文章。'
  }
})

const posts = computed(() => {
  if (props.limit > 0) {
    return allPosts.slice(0, props.limit)
  }

  return allPosts
})

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
</script>

<template>
  <div class="post-list">
    <p v-if="posts.length === 0" class="post-list-empty">
      {{ emptyText }}
    </p>

    <article v-for="post in posts" :key="post.url" class="post-card">
      <p v-if="post.date" class="post-card-date">
        {{ formatDate(post.date) }}
      </p>

      <h3 class="post-card-title">
        <a :href="post.url">{{ post.title }}</a>
      </h3>

      <p v-if="post.description" class="post-card-description">
        {{ post.description }}
      </p>

      <a class="post-card-link" :href="post.url">閱讀文章</a>
    </article>
  </div>
</template>