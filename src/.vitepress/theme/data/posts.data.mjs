import { createContentLoader } from 'vitepress'

function toTimestamp(value) {
  const timestamp = Date.parse(value ?? '')
  return Number.isNaN(timestamp) ? 0 : timestamp
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
        timestamp: toTimestamp(frontmatter.date)
      }))
      .sort((first, second) => second.timestamp - first.timestamp)
  }
})