/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'apifetch.pythonanywhere.com',
            },
            {
                protocol: 'https',
                hostname: 'framerusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'directorcolintilley.com',
            },
        ],
    },
}

module.exports = nextConfig