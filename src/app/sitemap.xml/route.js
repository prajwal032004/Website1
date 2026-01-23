export async function GET() {
    const baseUrl = 'https://5feet4.co'
    const pages = [
        { loc: '/', lastmod: '2025-01-23', changefreq: 'weekly', priority: '1.0' },
        { loc: '/ads', lastmod: '2025-01-23', changefreq: 'weekly', priority: '0.9' },
        { loc: '/prints', lastmod: '2025-01-23', changefreq: 'weekly', priority: '0.9' },
        { loc: '/about', lastmod: '2025-01-23', changefreq: 'monthly', priority: '0.8' },
        { loc: '/contact', lastmod: '2025-01-23', changefreq: 'monthly', priority: '0.7' },
    ]

    const sitemap = `

  ${pages
            .map(
                (page) => `
  
    ${baseUrl}${page.loc}
    ${page.lastmod}
    ${page.changefreq}
    ${page.priority}
  `
            )
            .join('')}
`

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}