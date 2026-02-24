'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
    const [phase, setPhase] = useState('loading') // 'loading' | 'exit' | 'done'

    useEffect(() => {
        const timer = setTimeout(() => {
            setPhase('exit')
            setTimeout(() => setPhase('done'), 900)
        }, 5000)

        return () => clearTimeout(timer)
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
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                // Exit: slide up + fade
                opacity: isExiting ? 0 : 1,
                transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
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
                }}
            >
                <source src="/5'4.mp4" type="video/mp4" />
            </video>
        </div>
    )
}