export async function GET() {
    const baseUrl = 'https://5feet4.co'

    // Use current date for lastmod to show freshness
    const today = new Date().toISOString().split('T')[0]

    const pages = [
        { loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
        { loc: '/ads', lastmod: today, changefreq: 'weekly', priority: '0.9' },
        { loc: '/prints', lastmod: today, changefreq: 'weekly', priority: '0.9' },
        { loc: '/about', lastmod: today, changefreq: 'monthly', priority: '0.8' },
        { loc: '/contact', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    ]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
            .map(
                (page) => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        },
    })
}