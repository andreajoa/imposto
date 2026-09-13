import fs from 'node:fs/promises'
import path from 'node:path'
import { render } from '../.prerender/entry-server.js'
import { SITE, pages, schemaFor } from '../src/seo/pages.js'
const template = await fs.readFile('dist/index.html', 'utf8')
const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const preview = process.env.VERCEL_ENV === 'preview'
const token = process.env.GOOGLE_SITE_VERIFICATION?.trim()
for (const [route, page] of Object.entries(pages)) {
  const robots = page.noindex || preview ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  let head = `<meta name="robots" content="${robots}">\n<meta property="og:title" content="${escape(page.title)}">\n<meta property="og:description" content="${escape(page.description)}">\n<meta property="og:url" content="${SITE}${route}">\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="Express Solution">\n<meta property="og:locale" content="${page.lang.replace('-', '_')}">\n<meta name="twitter:card" content="summary">\n<meta name="twitter:title" content="${escape(page.title)}">\n<meta name="twitter:description" content="${escape(page.description)}">`
  if (!page.noindex) head += `\n<link rel="canonical" href="${SITE}${route}">`
  if (page.alternate) for (const alt of [route, page.alternate]) head += `\n<link rel="alternate" hreflang="${pages[alt].lang}" href="${SITE}${alt}">`
  if (token && !preview) head += `\n<meta name="google-site-verification" content="${escape(token)}">`
  const schema = schemaFor(route)
  if (schema) head += `\n<script type="application/ld+json" data-seo-schema="true">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>`
  const html = template.replace('<html lang="pt-BR">', `<html lang="${page.lang}">`).replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`).replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(page.description)}">`).replace('</head>', head+'\n</head>').replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`)
  const filename = route === '/' ? 'dist/index.html' : route === '/404' ? 'dist/404.html' : `dist${route}/index.html`
  await fs.mkdir(path.dirname(filename), { recursive: true }); await fs.writeFile(filename, html)
}
const urls = Object.entries(pages).filter(([, p]) => !p.noindex)
await fs.writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(([route]) => `\n<url><loc>${SITE}${route}</loc></url>`).join('')}\n</urlset>\n`)
await fs.writeFile('dist/robots.txt', preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${SITE}/sitemap.xml\n`)
// Cloudflare Pages must not turn nonexistent URLs into soft 404s.
await fs.writeFile('dist/_redirects', '')
console.log(`Prerendered ${Object.keys(pages).length} pages; ${urls.length} canonical sitemap URLs; preview=${preview}`)
