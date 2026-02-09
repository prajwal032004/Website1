import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import BackgroundVideo from '../components/BackgroundVideo'
import ContextMenu from '../components/ContextMenu'
import ScrollToTop from '../components/ScrollToTop'
import DynamicFavicon from '../components/DynamicFavicon'

const josefinSans = Josefin_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
})

export const metadata = {
    metadataBase: new URL('https://5feet4.co'),
    title: {
        default: '5feet4 - Creative Production Studio Mumbai | Video Production Company India',
        template: '%s | 5feet4 Studio'
    },
    description: '5feet4 is a premier creative production studio in Mumbai, India specializing in commercial video production, brand campaigns, advertising content, TVC production, cinematography, and post-production services. Full-scale production from concept to delivery.',
    keywords: [
        // Core Services
        'production studio Mumbai',
        'video production company Mumbai',
        'creative production studio India',
        'commercial production Mumbai',
        'advertising production house Mumbai',
        'full-scale production company India',

        // Specific Services
        'brand campaign production',
        'corporate video production Mumbai',
        'TVC production India',
        'commercial ad film makers Mumbai',
        'TV commercial production',
        'content creation studio Mumbai',
        'cinematography services Mumbai',
        'post production services India',
        'video editing Mumbai',
        'creative direction services',
        'film production company Mumbai',

        // Industry Terms
        'advertising agency Mumbai',
        'production house India',
        'video marketing services',
        'digital content production',
        'social media video production Mumbai',
        'brand storytelling',
        'product photography Mumbai',
        'motion graphics studio',
        'documentary production',

        // Location-based
        'Mumbai production company',
        'India video production',
        'Maharashtra production studio',
        'production house in Mumbai',

        // Specific Niches
        'fashion film production Mumbai',
        'music video production Mumbai',
        'explainer video production India',
        'animation production Mumbai',
        'corporate film makers',
        '5feet4 studio',
        '5feet4'
    ].join(', '),
    authors: [{ name: '5feet4 Studio', url: 'https://5feet4.co' }],
    creator: '5feet4 Studio',
    publisher: '5feet4 Studio',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://5feet4.co',
        siteName: '5feet4 Studio',
        title: '5feet4 - Creative Production Studio Mumbai | Full-Scale Video Production',
        description: 'Award-winning production studio in Mumbai specializing in commercial video production, brand campaigns, TVC production, advertising content, and creative services. From concept to final delivery.',
        images: [
            {
                url: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910.JPG',
                width: 1200,
                height: 630,
                alt: '5feet4 Studio - Creative Production Company Mumbai, India',
                type: 'image/jpeg',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        site: '@5feet4studio',
        creator: '@5feet4studio',
        title: '5feet4 - Creative Production Studio Mumbai',
        description: 'Leading production studio in Mumbai for commercial video production, brand campaigns, TVC production, and creative content.',
        images: ['https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9911.JPG'],
    },

    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },

    manifest: '/site.webmanifest',

    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    alternates: {
        canonical: 'https://5feet4.co',
    },

    verification: {
        google: 'KpOQf0rjQOqal4ybI7PdqUXSOJ0HcD7AKyzCRJze5IA',
    },

    category: 'Video Production',
    classification: 'Production Studio',
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#000000',
}

export default function RootLayout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "5feet4 Studio",
        "alternateName": "5feet4",
        "url": "https://5feet4.co",
        "logo": {
            "@type": "ImageObject",
            "url": "https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910.JPG",
            "width": "1200",
            "height": "630"
        },
        "image": "https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910.JPG",
        "description": "5feet4 is a creative production studio in Mumbai, India specializing in commercial video production, brand campaigns, TVC production, advertising content, and full-scale creative services from concept to delivery.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mumbai",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "19.0760",
            "longitude": "72.8777"
        },
        "areaServed": [
            {
                "@type": "Country",
                "name": "India"
            },
            {
                "@type": "City",
                "name": "Mumbai"
            },
            {
                "@type": "State",
                "name": "Maharashtra"
            }
        ],
        "knowsAbout": [
            "Video Production",
            "Commercial Production",
            "Brand Campaigns",
            "Creative Direction",
            "Cinematography",
            "Post Production",
            "Advertising Content",
            "Content Creation",
            "TVC Production",
            "Corporate Videos"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Production Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Commercial Video Production",
                        "description": "Full-scale commercial video production services"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Brand Campaign Production",
                        "description": "Creative brand campaign development and production"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "TVC Production",
                        "description": "Television commercial production services"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Post Production",
                        "description": "Video editing and post-production services"
                    }
                }
            ]
        },
        "sameAs": [
            "https://www.instagram.com/5feet4studio"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": ["English"]
        }
    }

    const localBusinessData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://5feet4.co/#localbusiness",
        "name": "5feet4 Studio",
        "image": "https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910.JPG",
        "description": "Creative production studio specializing in video production and brand campaigns",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mumbai",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "19.0760",
            "longitude": "72.8777"
        }
    }

    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://5feet4.co"
            }
        ]
    }

    return (
        <html lang="en">
            <head>
                {/* Preconnect for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://ik.imagekit.io" />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://ik.imagekit.io" />
                <link rel="dns-prefetch" href="https://unpkg.com" />

                {/* AOS Animation */}
                <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />

                {/* Geo Tags for Local SEO */}
                <meta name="geo.region" content="IN-MH" />
                <meta name="geo.placename" content="Mumbai" />
                <meta name="geo.position" content="19.0760;72.8777" />
                <meta name="ICBM" content="19.0760, 72.8777" />

                {/* Additional Meta Tags */}
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="distribution" content="global" />
                <meta name="rating" content="general" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
                />
            </head>
            <body className={josefinSans.className} suppressHydrationWarning>
                <DynamicFavicon />
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