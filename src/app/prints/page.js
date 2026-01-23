'use client'

import { useState, useEffect, useRef } from 'react'

export default function PrintsPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const videoRef = useRef(null)

    useEffect(() => {
        setIsLoaded(true)

        // Check if background video already exists in the DOM
        let video = document.querySelector('.persistent-background-video')

        if (!video) {
            // Create video element only if it doesn't exist
            video = document.createElement('video')
            video.className = 'persistent-background-video background-video'
            video.autoplay = true
            video.muted = true
            video.loop = true
            video.playsInline = true
            video.preload = 'auto'

            const source = document.createElement('source')
            source.src = 'https://directorcolintilley.com/wp-content/themes/colintilley/static/img/bg-commercials.mp4'
            source.type = 'video/mp4'

            video.appendChild(source)
            document.body.appendChild(video)

            const handleLoadedData = () => {
                video.classList.add('loaded')
            }

            video.addEventListener('loadeddata', handleLoadedData)

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

            if (video.readyState >= 3) {
                video.classList.add('loaded')
            }

            playVideo()
        } else {
            // Video already exists, just make sure it's playing
            video.classList.add('loaded')
            if (video.paused) {
                video.play().catch(() => { })
            }
        }

        videoRef.current = video

        const handleVisibilityChange = () => {
            if (!document.hidden && video.paused) {
                video.play().catch(() => { })
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            // Don't remove the video element on unmount - let it persist
        }
    }, [])

    return (
        <>
            <style jsx global>{`
                .persistent-background-video {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    min-width: 100%;
                    min-height: 100%;
                    width: auto;
                    height: auto;
                    transform: translate(-50%, -50%);
                    z-index: 0;
                    object-fit: cover;
                    opacity: 0;
                    transition: opacity 1s ease-in-out, filter 0.5s ease;
                }

                .persistent-background-video.loaded {
                    opacity: 1;
                }

                .prints-container {
                    min-height: 100vh;
                    background: #000;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .video-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 1;
                    transition: background 0.5s ease;
                }

                .content-wrapper {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    padding: 40px 20px;
                    opacity: ${isLoaded ? 1 : 0};
                    transform: translateY(${isLoaded ? '0' : '30px'});
                    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                    mix-blend-mode: difference;
                }

                .main-title {
                    font-size: clamp(70px, 12vw, 160px);
                    font-weight: 700;
                    line-height: 1;
                    letter-spacing: -3px;
                    color: #ffffff;
                    text-transform: uppercase;
                    animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1);
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {
                    .main-title {
                        font-size: 110px;
                    }
                }

                @media (max-width: 480px) {
                    .main-title {
                        font-size: 68px;
                    }
                }
            `}</style>

            <div className="prints-container">
                <div className="video-overlay"></div>

                <div className="content-wrapper">
                    <h1 className="main-title">
                        Coming
                        <br />
                        Soon
                    </h1>
                </div>
            </div>
        </>
    )
}