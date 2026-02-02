import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import BackgroundVideo from '../components/BackgroundVideo'
import ContextMenu from '../components/ContextMenu'
import ScrollToTop from '../components/ScrollToTop'

const josefinSans = Josefin_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
})

export const metadata = {
    metadataBase: new URL('https://5feet4.co'),
    title: '5feet4 - Creative Production Studio',
    description: '5feet4 Studio - Specializing in creative direction and full-scale production based in Mumbai, India',
    keywords: 'production studio, creative direction, video production, Mumbai, advertising, content creation, commercial production, brand campaigns, cinematography, post production',
    authors: [{ name: '5feet4 Studio' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://5feet4.co',
        siteName: '5feet4 Studio',
        title: '5feet4 - Full Scale Production Company',
        description: 'Specializing in creative direction and full-scale production, guiding your brand from concept to final delivery.',
        images: [
            {
                url: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910.JPG',
                width: 1200,
                height: 630,
                alt: '5feet4 Studio - Creative Production Company',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@5feet4studio',
        creator: '@5feet4studio',
        title: '5feet4 - Full Scale Production Company',
        description: 'Specializing in creative direction and full-scale production.',
        images: ['https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9911.JPG'],
    },
    icons: {
        icon: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910.JPG',
        shortcut: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910.JPG',
        apple: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910.JPG',
    },
    manifest: '/site.webmanifest',
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://5feet4r.vercel.app" />
                <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
            </head>
            <body className={josefinSans.className} suppressHydrationWarning>
                <ContextMenu />
                <BackgroundVideo />
                <div className="video-overlay"></div>
                <div id="page-wrapper">
                    <Navbar />
                    {children}
                </div>
                <ScrollToTop />
                <script src="https://unpkg.com/aos@2.3.1/dist/aos.js" async></script>
            </body>
        </html>
    )
}