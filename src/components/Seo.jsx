import { useEffect } from 'react'

export function Seo({ title, description, ogTitle, ogDescription }) {
  useEffect(() => {
    if (title) document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    if (description) meta.setAttribute('content', description)

    const setOg = (property, content) => {
      if (!content) return
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    setOg('og:title', ogTitle || title)
    setOg('og:description', ogDescription || description)
  }, [title, description, ogTitle, ogDescription])

  return null
}
