'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundVideo() {
    const containerRef = useRef(null)
    const playerRef = useRef(null)

    useEffect(() => {
        // Avoid loading twice (React strict mode / hot reload)
        if (window.__vimeoPlayer) return

        const script = document.createElement('script')
        script.src = 'https://player.vimeo.com/api/player.js'
        script.async = true

        script.onload = () => {
            if (!containerRef.current || !window.Vimeo) return

            const player = new window.Vimeo.Player(containerRef.current, {
                id: 1167696119,
                background: true,   // kills ALL UI: controls, bar, title, logo
                autopause: false,
                muted: true,
                loop: true,
                autoplay: true,
                transparent: false,
            })

            playerRef.current = player
            window.__vimeoPlayer = player

            player.ready().then(() => {
                // Fade in once ready
                if (containerRef.current) {
                    containerRef.current.classList.add('loaded')
                }
            }).catch(() => { })
        }

        document.head.appendChild(script)

        return () => {
            if (playerRef.current) {
                try { playerRef.current.destroy() } catch (_) { }
                playerRef.current = null
                window.__vimeoPlayer = null
            }
        }
    }, [])

    return (
        <div ref={containerRef} className="background-video" />
    )
}