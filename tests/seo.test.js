import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { SITE, pages } from '../src/seo/pages.js'
const preview = process.env.VERCEL_ENV === 'preview'
test('every route has substantive HTML, unique metadata, schema and correct indexing', () => {
  const titles = new Set()
  for (const [route, page] of Object.entries(pages)) {
    const file = route === '/' ? 'dist/index.html' : route === '/404' ? 'dist/404.html' : `dist${route}/index.html`
    const html = fs.readFileSync(file, 'utf8')
    assert.ok(html.includes(`<html lang="${page.lang}">`), route)
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, route)
    assert.ok(!html.includes('<div id="root"></div>'), route)
    const expectedHeading = {
      '/impostos-brasileiros-boston': 'Impostos para brasileiros em Boston: por onde começar?',
      '/en/boston-tax-guide': 'Boston tax resources for Brazilian and Portuguese-speaking readers',
      '/sobre': 'Kelly Moraes e os guias Express Solution',
      '/404': 'Página não encontrada',
    }[route]
    if (expectedHeading) assert.ok(html.includes(`<h1>${expectedHeading}</h1>`), route)
    const title = html.match(/<title>(.*?)<\/title>/)[1]
    assert.equal(titles.has(title), false); titles.add(title)
    if (!page.noindex) {
      assert.ok(html.includes(`rel="canonical" href="${SITE}${route}"`), route)
      assert.ok(html.includes(preview ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'), route)
      const schema = html.match(/<script type="application\/ld\+json" data-seo-schema="true">(.*?)<\/script>/s)
      assert.ok(JSON.parse(schema[1])['@graph'].length >= 3)
    } else assert.ok(html.includes('noindex, nofollow'))
    if (page.alternate) assert.ok(html.includes(`hreflang="${pages[page.alternate].lang}" href="${SITE}${page.alternate}"`))
    for (const match of html.matchAll(/<img[^>]*src="(\/[^\"]+)"/g)) assert.ok(fs.existsSync('dist'+match[1]), match[1])
  }
})
test('sitemap includes only public canonical routes and robots references production sitemap', () => {
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8')
  assert.equal((sitemap.match(/<loc>/g) || []).length, 5)
  assert.ok(!sitemap.includes('/obrigado')); assert.ok(!sitemap.includes('/404'))
  const robots = fs.readFileSync('dist/robots.txt', 'utf8')
  assert.ok(robots.includes(preview ? 'Disallow: /' : `Sitemap: ${SITE}/sitemap.xml`))
})
