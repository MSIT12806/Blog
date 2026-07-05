import { createContentLoader } from 'vitepress'

function toTimestamp(value) {
  const timestamp = Date.parse(value ?? '')
  return Number.isNaN(timestamp) ? 0 : timestamp
}

function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }

  return []
}

export default createContentLoader('posts/*.md', {
  transform(raw) {
    return raw
      .filter(({ url, frontmatter }) => {
        return url !== '/posts/' && frontmatter?.title && !frontmatter?.draft
      })
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        date: frontmatter.date ?? '',
        description: frontmatter.description ?? '',
        tags: normalizeTags(frontmatter.tags),
        timestamp: toTimestamp(frontmatter.date)
      }))
      .sort((first, second) => second.timestamp - first.timestamp)
  }
})
