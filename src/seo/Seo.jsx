import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, pages, schemaFor } from './pages'

export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/'
    const page = pages[path] || pages['/404']
    document.title = page.title
    document.documentElement.lang = page.lang
    const meta = (attribute, key, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element) }
      element.content = content
    }
    meta('name', 'description', page.description)
    meta('name', 'robots', page.noindex || import.meta.env.VITE_DEPLOY_CONTEXT === 'preview' ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    for (const [key, value] of Object.entries({ title: page.title, description: page.description, url: `${SITE}${path}`, type: 'website', site_name: 'Express Solution', locale: page.lang.replace('-', '_') })) meta('property', `og:${key}`, value)
    meta('name', 'twitter:card', 'summary')
    meta('name', 'twitter:title', page.title)
    meta('name', 'twitter:description', page.description)
    document.head.querySelectorAll('link[rel="canonical"],link[hreflang],script[data-seo-schema]').forEach(el => el.remove())
    if (!page.noindex) {
      const link = document.createElement('link'); link.rel = 'canonical'; link.href = `${SITE}${path}`; document.head.appendChild(link)
    }
    if (page.alternate) for (const p of [path, page.alternate]) {
      const link = document.createElement('link'); link.rel = 'alternate'; link.hreflang = pages[p].lang; link.href = `${SITE}${p}`; document.head.appendChild(link)
    }
    const schema = schemaFor(path)
    if (schema) { const script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.seoSchema = 'true'; script.textContent = JSON.stringify(schema); document.head.appendChild(script) }
  }, [pathname])
  return null
}
