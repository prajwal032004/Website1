'use client'

import { useEffect } from 'react'

export default function DynamicFavicon() {
    useEffect(() => {
        const originalTitle = document.title
        const originalFavicon = '/favicon.ico'
        const awayFavicon = '/favicon1.ico'
        const awayTitle = "Come back! - 5feet4 Studio"

        let intervalId = null
        let isOriginal = true

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User left the tab - start alternating favicon
                document.title = awayTitle

                // Clear any existing interval
                if (intervalId) clearInterval(intervalId)

                // Alternate favicon every second
                intervalId = setInterval(() => {
                    isOriginal = !isOriginal
                    updateFavicon(isOriginal ? originalFavicon : awayFavicon)
                }, 1000) // Change every 1000ms (1 second)

            } else {
                // User returned to the tab - stop alternating
                if (intervalId) {
                    clearInterval(intervalId)
                    intervalId = null
                }

                document.title = originalTitle
                updateFavicon(originalFavicon)
                isOriginal = true
            }
        }

        const updateFavicon = (href) => {
            // Get all icon links
            const links = document.querySelectorAll("link[rel*='icon']")

            links.forEach(link => {
                link.href = href
            })

            // If no icon links found, create one
            if (links.length === 0) {
                const newLink = document.createElement('link')
                newLink.rel = 'icon'
                newLink.href = href
                document.head.appendChild(newLink)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            if (intervalId) clearInterval(intervalId)
        }
    }, [])

    return null
}