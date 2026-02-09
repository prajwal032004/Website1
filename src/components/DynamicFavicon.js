'use client'

import { useEffect } from 'react'

export default function DynamicFavicon() {
    useEffect(() => {
        let favicon = document.querySelector("link[rel~='icon']")
        if (!favicon) {
            favicon = document.createElement('link')
            favicon.rel = 'icon'
            document.head.appendChild(favicon)
        }

        const originalTitle = document.title
        const originalFavicon = '/favicon.ico'
        const awayFavicon = '/favicon1.ico'
        const awayTitle = "Come back! - 5feet4 Studio"

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User left the tab
                document.title = awayTitle
                favicon.href = awayFavicon
            } else {
                // User returned to the tab
                document.title = originalTitle
                favicon.href = originalFavicon
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    return null
}