<script setup>
import { computed, ref } from 'vue'
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

const selectedTag = ref('')

const canFilterByTag = computed(() => props.limit <= 0)

const allTags = computed(() => {
  return Array.from(
    new Set(allPosts.flatMap((post) => post.tags ?? []))
  ).sort((first, second) => first.localeCompare(second, 'zh-Hant'))
})

const posts = computed(() => {
  const sourcePosts = canFilterByTag.value && selectedTag.value
    ? allPosts.filter((post) => post.tags?.includes(selectedTag.value))
    : allPosts

  if (props.limit > 0) {
    return sourcePosts.slice(0, props.limit)
  }

  return sourcePosts
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

function selectTag(tag) {
  selectedTag.value = selectedTag.value === tag ? '' : tag
}
</script>

<template>
  <div class="post-list">
    <div v-if="canFilterByTag && allTags.length > 0" class="post-tag-filter" aria-label="文章標籤篩選">
      <button
        type="button"
        class="post-tag-filter-button"
        :class="{ 'is-active': selectedTag === '' }"
        @click="selectedTag = ''"
      >
        全部
      </button>

      <button
        v-for="tag in allTags"
        :key="tag"
        type="button"
        class="post-tag-filter-button"
        :class="{ 'is-active': selectedTag === tag }"
        @click="selectTag(tag)"
      >
        {{ tag }}
      </button>
    </div>

    <p v-if="posts.length === 0" class="post-list-empty">
      {{ selectedTag ? `目前沒有「${selectedTag}」標籤的文章。` : emptyText }}
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

      <div v-if="post.tags?.length" class="post-card-tags" aria-label="文章標籤">
        <button
          v-for="tag in post.tags"
          :key="tag"
          type="button"
          class="post-card-tag"
          :disabled="!canFilterByTag"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </button>
      </div>

      <a class="post-card-link" :href="post.url">閱讀文章</a>
    </article>
  </div>
</template>
