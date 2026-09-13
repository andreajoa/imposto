export const SITE = 'https://www.express-solution.com'
export const BRAND = 'Express Solution Tax & Accounting, Inc.'
export const pages = {
  '/': { title: 'Guia de Impostos nos EUA em Português | Kelly Moraes', description: 'Entenda documentos, rendas e organização fiscal nos EUA com o guia em português de Kelly Moraes. Conheça também os recursos para brasileiros em Boston.', lang: 'pt-BR', book: 'Guia Completo de Impostos para Imigrantes nos EUA', image: '/image/tax-guide-cover.png' },
  '/abertura-de-empresa-nos-eua': { title: 'Abertura de Empresa nos EUA: Guia em Português | Express Solution', description: 'Conheça o guia de Kelly Moraes sobre abertura de empresa nos EUA: LLC, Corporation, EIN, organização e responsabilidades fiscais.', lang: 'pt-BR', book: 'Abertura de Empresa nos EUA', image: '/image/business-opening-cover.png' },
  '/impostos-brasileiros-boston': { title: 'Impostos para Brasileiros em Boston e Massachusetts | Express Solution', description: 'Mora em Boston? Organize suas dúvidas sobre impostos federais, Massachusetts e abertura de empresa. Recursos em português e fontes oficiais.', lang: 'pt-BR', alternate: '/en/boston-tax-guide' },
  '/en/boston-tax-guide': { title: 'Boston Tax Resources for Portuguese Speakers | Express Solution', description: 'Federal and Massachusetts tax resources for Brazilian and Portuguese-speaking readers in Greater Boston. Explore Portuguese-language guides by Kelly Moraes.', lang: 'en-US', alternate: '/impostos-brasileiros-boston' },
  '/sobre': { title: 'Kelly Moraes e os Guias Express Solution | Sobre', description: 'Conheça a proposta dos guias em português de Kelly Moraes, da Express Solution Tax & Accounting, Inc., e como entrar em contato.', lang: 'pt-BR' },
  '/obrigado': { title: 'Sua compra | Express Solution', description: 'Confirmação do pagamento e acesso aos materiais adquiridos.', lang: 'pt-BR', noindex: true },
  '/404': { title: 'Página não encontrada | Express Solution', description: 'Encontre os guias de impostos e abertura de empresa da Express Solution.', lang: 'pt-BR', noindex: true },
}
export function schemaFor(path) {
  const page = pages[path] || pages['/404']
  if (page.noindex) return null
  const organization = { '@type': 'Organization', '@id': `${SITE}/#organization`, name: BRAND, url: SITE, email: 'support@express-solution.com', logo: `${SITE}/image/express-solution-logo.svg` }
  const webpage = { '@type': 'WebPage', '@id': `${SITE}${path}#webpage`, url: `${SITE}${path}`, name: page.title, description: page.description, inLanguage: page.lang, isPartOf: { '@id': `${SITE}/#website` }, publisher: { '@id': organization['@id'] } }
  const graph = [organization, { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: 'Express Solution', publisher: { '@id': organization['@id'] }, inLanguage: ['pt-BR', 'en-US'] }, webpage]
  if (page.book || path === '/sobre') graph.push({ '@type': 'Person', '@id': `${SITE}/sobre#kelly-moraes`, name: 'Kelly Moraes', url: `${SITE}/sobre`, image: `${SITE}/image/autora.png` })
  if (page.book) {
    webpage.mainEntity = { '@id': `${SITE}${path}#book` }
    graph.push({ '@type': 'Book', '@id': `${SITE}${path}#book`, name: page.book, url: `${SITE}${path}`, image: `${SITE}${page.image}`, bookFormat: 'https://schema.org/EBook', inLanguage: 'pt-BR', author: { '@id': `${SITE}/sobre#kelly-moraes` }, publisher: { '@id': organization['@id'] } })
  }
  if (page.alternate) webpage.about = [{ '@type': 'Place', name: 'Boston, Massachusetts, United States' }, { '@type': 'Thing', name: 'Tax preparation resources' }]
  if (path !== '/') graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Express Solution', item: `${SITE}/` }, { '@type': 'ListItem', position: 2, name: page.title.split(' | ')[0], item: `${SITE}${path}` }] })
  return { '@context': 'https://schema.org', '@graph': graph }
}
