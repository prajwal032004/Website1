'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundVideo() {
    const videoRef = useRef(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleLoadedData = () => {
            video.classList.add('loaded')
        }

        const playVideo = () => {
            video.play().catch((err) => {
                console.log('Video autoplay prevented, waiting for user interaction')

                const playOnce = () => {
                    video.play()
                    document.removeEventListener('click', playOnce)
                    document.removeEventListener('touchstart', playOnce)
                    document.removeEventListener('scroll', playOnce)
                }

                document.addEventListener('click', playOnce, { once: true })
                document.addEventListener('touchstart', playOnce, { once: true })
                document.addEventListener('scroll', playOnce, { once: true })
            })
        }

        video.addEventListener('loadeddata', handleLoadedData)

        if (video.readyState >= 3) {
            video.classList.add('loaded')
        }

        playVideo()

        const handleVisibilityChange = () => {
            if (!document.hidden && video.paused) {
                playVideo()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    return (
        <video
            ref={videoRef}
            className="background-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
        >
            <source
                src="https://directorcolintilley.com/wp-content/themes/colintilley/static/img/bg-commercials.mp4"
                type="video/mp4"
            />
        </video>
    )
}