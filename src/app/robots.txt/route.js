export async function GET() {
    const baseUrl = 'https://5feet4.co'

    const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}