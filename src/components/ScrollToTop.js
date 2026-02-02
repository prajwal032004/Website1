'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility, { passive: true })
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        // Trigger the animation state
        setIsClicked(true)

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        // Reset animation state after animation completes (700ms)
        setTimeout(() => {
            setIsClicked(false)
        }, 700)
    }

    return (
        <>
            <style jsx>{`
                .scroll-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    /* Premium Dark Theme Background */
                    background: #0a0a0a; 
                    background: linear-gradient(145deg, #1a1a1a, #000000);
                    
                    /* Subtle border glow */
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 999;
                    
                    /* Entry Transition */
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    
                    /* Deep Shadow for depth */
                    box-shadow: 
                        0 10px 30px rgba(0, 0, 0, 0.5), 
                        0 4px 10px rgba(0, 0, 0, 0.4),
                        inset 0 1px 1px rgba(255, 255, 255, 0.1);
                        
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(40px) scale(0.8);
                }

                .scroll-to-top.visible {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }

                /* Hover Effect: Scale up and brighten slightly */
                .scroll-to-top:hover {
                    transform: translateY(-5px) scale(1.05);
                    border-color: rgba(255, 255, 255, 0.3);
                    box-shadow: 
                        0 15px 35px rgba(0, 0, 0, 0.6),
                        0 0 15px rgba(255, 255, 255, 0.05); /* Subtle outer glow */
                }

                .scroll-to-top:active {
                    transform: translateY(-2px) scale(0.98);
                    background: #000;
                }

                /* SVG Styling */
                .scroll-to-top svg {
                    width: 24px;
                    height: 24px;
                    stroke: #ffffff;
                    stroke-width: 2.5;
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    transition: transform 0.3s ease;
                }

                /* Hover animation (small nudge) when NOT clicked */
                .scroll-to-top:hover svg:not(.fly-up) {
                    transform: translateY(-3px);
                }

                /* 
                 * CLICK ANIMATION 
                 * The arrow flies up out of view, and reappears from the bottom
                 */
                .scroll-to-top svg.fly-up {
                    animation: flyUp 0.7s cubic-bezier(0.45, 0, 0.55, 1) forwards;
                }

                @keyframes flyUp {
                    0% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    40% {
                        transform: translateY(-150%); /* Fly out top */
                        opacity: 0;
                    }
                    41% {
                        transform: translateY(150%); /* Teleport to bottom immediately */
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0); /* Return to center */
                        opacity: 1;
                    }
                }

                /* Mobile Styles */
                @media (max-width: 768px) {
                    .scroll-to-top {
                        bottom: 25px;
                        right: 25px;
                        width: 50px;
                        height: 50px;
                    }
                    .scroll-to-top svg {
                        width: 20px;
                        height: 20px;
                    }
                }
            `}</style>

            <button
                onClick={scrollToTop}
                className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
                aria-label="Scroll to top"
            >
                {/* Simplified, Cleaner Arrow SVG */}
                <svg
                    viewBox="0 0 24 24"
                    className={isClicked ? 'fly-up' : ''}
                >
                    {/* The Arrow Path */}
                    <path d="M12 19V5" />
                    <path d="M5 12l7-7 7 7" />
                </svg>
            </button>
        </>
    )
}