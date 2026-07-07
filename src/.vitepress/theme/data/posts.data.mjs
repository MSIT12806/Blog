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

function normalizeSeries(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function toSeriesOrder(value) {
  const order = Number(value)
  return Number.isFinite(order) ? order : null
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
        series: normalizeSeries(frontmatter.series),
        seriesOrder: toSeriesOrder(frontmatter.seriesOrder),
        timestamp: toTimestamp(frontmatter.date)
      }))
      .sort((first, second) => second.timestamp - first.timestamp)
  }
})
