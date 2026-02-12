'use client'

import { useState, useEffect, useRef } from 'react'

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState('loading') // 'loading' | 'complete' | 'exit' | 'done'
    const fillRef = useRef(null)
    const percentRef = useRef(null)

    useEffect(() => {
        const LOADING_DURATION = 5000
        const UPDATE_INTERVAL = 50
        const TOTAL_STEPS = LOADING_DURATION / UPDATE_INTERVAL
        const INCREMENT = 100 / TOTAL_STEPS

        let current = 0

        const interval = setInterval(() => {
            current = Math.min(current + INCREMENT, 100)

            // Update DOM directly — no React re-render, no CSS template literal issue
            if (fillRef.current) {
                fillRef.current.style.width = `${current}%`
            }
            if (percentRef.current) {
                percentRef.current.textContent = Math.floor(current)
            }

            if (current >= 100) {
                clearInterval(interval)
                setPhase('complete')

                setTimeout(() => {
                    setPhase('exit')
                    setTimeout(() => setPhase('done'), 900)
                }, 400)
            }
        }, UPDATE_INTERVAL)

        return () => clearInterval(interval)
    }, [])

    if (phase === 'done') return null

    const isExiting = phase === 'exit'

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                // Exit: slide up + fade
                opacity: isExiting ? 0 : 1,
                transform: isExiting ? 'translateY(-6%)' : 'translateY(0)',
                transition: isExiting
                    ? 'opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'none',
                pointerEvents: isExiting ? 'none' : 'auto',
            }}
        >
            {/* Background video */}
            <video
                autoPlay
                muted
                playsInline
                loop
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.55,
                }}
            >
                <source src="https://ik.imagekit.io/pqkj4p4ii/5feet4/15.mp4" type="video/mp4" />
            </video>

            {/* Gradient overlay — bottom fade so bar is legible */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
                    zIndex: 1,
                }}
            />

            {/* Bottom bar content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    maxWidth: 500,
                    padding: '0 32px 56px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0,
                }}
            >
                {/* Logo */}
                <img
                    src="https://ik.imagekit.io/pqkj4p4ii/5feet4/IMG_9910__1_-removebg-preview.png"
                    alt="5feet4 Studio"
                    style={{
                        width: 110,
                        height: 'auto',
                        marginBottom: 28,
                        filter: 'brightness(0) invert(1)',
                        animation: 'ls-fadeUp 0.7s ease-out both',
                    }}
                />

                {/* Progress bar track */}
                <div
                    style={{
                        width: '100%',
                        height: 2,
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        marginBottom: 14,
                    }}
                >
                    {/* Fill — updated via ref, NOT state */}
                    <div
                        ref={fillRef}
                        style={{
                            height: '100%',
                            width: '0%',
                            background: '#fff',
                            borderRadius: 2,
                            transition: 'width 0.12s linear',
                            boxShadow: '0 0 8px rgba(255,255,255,0.6)',
                        }}
                    />
                </div>

                {/* Percentage */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 2,
                        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                        color: '#fff',
                        letterSpacing: '0.08em',
                    }}
                >
                    <span
                        ref={percentRef}
                        style={{
                            fontSize: 15,
                            fontWeight: 500,
                            fontVariantNumeric: 'tabular-nums',
                            minWidth: '2ch',
                            textAlign: 'right',
                        }}
                    >
                        0
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.7 }}>%</span>
                </div>
            </div>

            {/* Keyframe injected once via a real <style> tag — no template literals */}
            <style>{`
        @keyframes ls-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    )
}