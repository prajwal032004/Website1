/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Configure ImageKit CDN as remote pattern
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                pathname: '/5feet4imgassests/**',
            },
            // Fallback for local images
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        // Optimize images with best quality settings
        formats: ['image/avif', 'image/webp'],
        // Device sizes for responsive images
        deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2048, 3840],
        // Image sizes for srcset optimization
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1440, 1600, 1920],
        // Cache optimization - 1 year
        minimumCacheTTL: 31536000,
        // Dangerously allow SVG for specific cases (optional)
        dangerouslyAllowSVG: false,
        // Content Security Policy for images
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    // Performance optimizations
    compress: true,
    // Optimize bundle
    productionBrowserSourceMaps: false,
    // Enable optimizations
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
}

module.exports = nextConfig