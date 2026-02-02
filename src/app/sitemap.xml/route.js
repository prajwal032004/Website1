export async function GET() {
    const baseUrl = 'https://5feet4.co'
    const pages = [
        { loc: '/', lastmod: '2025-01-23', changefreq: 'weekly', priority: '1.0' },
        { loc: '/ads', lastmod: '2025-01-23', changefreq: 'weekly', priority: '0.9' },
        { loc: '/prints', lastmod: '2025-01-23', changefreq: 'weekly', priority: '0.9' },
        { loc: '/about', lastmod: '2025-01-23', changefreq: 'monthly', priority: '0.8' },
        { loc: '/contact', lastmod: '2025-01-23', changefreq: 'monthly', priority: '0.7' },
    ]

    // Added proper XML headers and URLSet tags
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
            .map(
                (page) => `
    <url>
        <loc>${baseUrl}${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`
            )
            .join('')}
</urlset>`

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}