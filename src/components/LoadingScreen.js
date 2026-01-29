'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [isHiding, setIsHiding] = useState(false)
    const [shouldRender, setShouldRender] = useState(true)

    useEffect(() => {
        const LOADING_DURATION = 5000 // 5 seconds total
        const UPDATE_INTERVAL = 50
        const TOTAL_STEPS = LOADING_DURATION / UPDATE_INTERVAL
        const INCREMENT_PER_STEP = 100 / TOTAL_STEPS

        const loadingInterval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + INCREMENT_PER_STEP

                if (newProgress >= 100) {
                    clearInterval(loadingInterval)

                    // 1. Wait a moment at 100%
                    setTimeout(() => {
                        setIsHiding(true) // Trigger CSS animation

                        // 2. Wait for animation to finish before removing from DOM
                        setTimeout(() => {
                            setShouldRender(false)
                        }, 800) // Matches the CSS transition duration (0.8s)

                    }, 300)

                    return 100
                }
                return newProgress
            })
        }, UPDATE_INTERVAL)

        return () => clearInterval(loadingInterval)
    }, [])

    if (!shouldRender) {
        return null
    }

    return (
        <>
            <style jsx>{`
        /* Non-critical styles handle the inner content */
        .loading-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
        }

        .loading-bar-container {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 500px;
          margin-bottom: 60px;
          text-align: center;
        }

        .loading-logo {
          width: 120px;
          height: auto;
          margin-bottom: 30px;
          filter: brightness(0) invert(1);
          animation: logoFadeIn 0.8s ease-out;
        }

        @keyframes logoFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .progress-bar-wrapper {
          width: 100%;
          margin-bottom: 15px;
        }

        .progress-bar-bg {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: #fff;
          width: ${progress}%;
          transition: width 0.15s linear;
        }

        .loading-percentage {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 2px;
        }
      `}</style>

            {/* 
               CRITICAL FIX: 
               We use inline styles for the container. 
               This ensures the screen is BLACK immediately when the HTML loads,
               preventing the white flash/glitch while the CSS file is loading.
            */}
            <div
                id="loading-screen"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    background: '#000',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    transition: 'opacity 0.6s, transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    opacity: isHiding ? 0 : 1,
                    transform: isHiding ? 'translateY(-100%)' : 'translateY(0)',
                    pointerEvents: isHiding ? 'none' : 'auto'
                }}
            >
                <video className="loading-video" autoPlay muted playsInline loop>
                    <source
                        src="https://ik.imagekit.io/pqkj4p4ii/5feet4/15.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="loading-bar-container">
                    <img
                        className="loading-logo"
                        src="https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910__1_-removebg-preview.png"
                        alt="5feet4 Studio"
                    />
                    <div className="progress-bar-wrapper">
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                    <div className="loading-percentage">
                        <span>{Math.floor(progress)}</span>%
                    </div>
                </div>
            </div>
        </>
    )
}