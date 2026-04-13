const rawModules = import.meta.glob('../data/docs/**/*.md', {
  eager: true,
  as: 'raw',
})

function keyFor(locale, slug) {
  return `../data/docs/${locale}/${slug}.md`
}

export const SUPPORTED_LOCALES = ['en', 'hi', 'kn']

export function getMarkdownRaw(locale, slug) {
  const loc = SUPPORTED_LOCALES.includes(locale) ? locale : 'en'
  const primary = rawModules[keyFor(loc, slug)]
  if (typeof primary === 'string') return { content: primary, usedFallback: false }
  const fallback = rawModules[keyFor('en', slug)]
  if (typeof fallback === 'string') return { content: fallback, usedFallback: true }
  return { content: null, usedFallback: false }
}

export function extractTitle(markdown) {
  if (!markdown) return ''
  const line = markdown.split('\n').find((l) => l.trim().startsWith('#'))
  if (!line) return ''
  return line.replace(/^#+\s*/, '').trim()
}

export function getFirstParagraph(markdown) {
  if (!markdown) return ''
  const lines = markdown.split('\n')
  const buf = []
  let inFence = false
  for (const line of lines) {
    if (line.trim().startsWith('```')) inFence = !inFence
    if (inFence) continue
    if (line.startsWith('#')) continue
    const t = line.trim()
    if (t) buf.push(t)
    if (buf.length > 2) break
  }
  return buf.join(' ').slice(0, 220)
}

/** @param {string} locale */
export function getEntriesForLocale(locale) {
  const loc = SUPPORTED_LOCALES.includes(locale) ? locale : 'en'
  const prefix = `../data/docs/${loc}/`
  const out = []
  for (const [path, content] of Object.entries(rawModules)) {
    if (!path.startsWith(prefix)) continue
    if (typeof content !== 'string') continue
    const slug = path.slice(prefix.length).replace(/\.md$/, '')
    out.push({ slug, content })
  }
  return out
}

export { rawModules }
