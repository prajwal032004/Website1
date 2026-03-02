'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isHoveringLogo, setIsHoveringLogo] = useState(false)
    const pathname = usePathname()

    const handleEmailClick = (e) => {
        e.preventDefault()
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )

        if (isMobile) {
            window.location.href = 'mailto:business@5feet4.co'
        } else {
            window.open(
                'https://mail.google.com/mail/?view=cm&fs=1&to=business@5feet4.co',
                '_blank'
            )
        }
    }

    return (
        <>
            <style jsx global>{`
                /* ===== WATER DROP ANIMATION ===== */
                @keyframes waterRipple {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }

                @keyframes waterZoom {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.15);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                @keyframes waterDrop {
                    0% {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                }

                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 20px 90px;
                    z-index: 1000;
                    background: transparent;
                }

                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1600px;
                    margin: 0 auto;
                }

                /* ===== LOGO WITH WATER EFFECT ===== */
                .logo-wrapper {
                    position: relative;
                    height: 100px;
                    width: auto;
                    cursor: pointer;
                    display: inline-block;
                }

                .logo {
                    height: 100px;
                    width: auto;
                    transition: opacity 0.3s ease;
                    cursor: pointer;
                    display: block;
                    position: relative;
                    z-index: 2;
                }

                .logo:hover {
                    opacity: 0.7;
                }

                /* Water ripple effect container */
                .water-effect {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 1;
                }

                /* Individual ripple circles */
                .ripple {
                    position: absolute;
                    border: 2px solid rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                /* Multiple ripples with staggered delays */
                .ripple:nth-child(1) {
                    animation: waterRipple 0.8s ease-out forwards;
                    animation-delay: 0s;
                }

                .ripple:nth-child(2) {
                    animation: waterRipple 0.8s ease-out forwards;
                    animation-delay: 0.15s;
                }

                .ripple:nth-child(3) {
                    animation: waterRipple 0.8s ease-out forwards;
                    animation-delay: 0.3s;
                }

                /* Logo zoom effect on hover */
                .logo-wrapper.water-active .logo {
                    animation: waterZoom 0.6s ease-in-out;
                }

                /* Water drop effect */
                .water-drop {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
                    border-radius: 50%;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    animation: waterDrop 0.7s ease-out forwards;
                }

                /* ===== NAV LINKS - ALL STYLES ===== */
                .nav-menu {
                    display: flex;
                    gap: 40px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-menu li {
                    margin: 0;
                    padding: 0;
                }

                .nav-link {
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: 500;
                    position: relative;
                    padding: 6px 0;
                    display: inline-block;
                    transition: opacity 0.3s ease;
                    cursor: pointer;
                }

                /* underline animation */
                .nav-link::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -4px;
                    width: 0%;
                    height: 2px;
                    background: #ffffff;
                    transition: width 0.35s ease;
                }

                /* hover state */
                .nav-link:hover::after {
                    width: 100%;
                }

                /* active route - darkened appearance */
                .nav-link.active {
                    opacity: 0.5;
                    pointer-events: none;
                }

                .nav-link.active::after {
                    width: 100%;
                }

                /* ===== MOBILE TOGGLE ===== */
                .mobile-toggle {
                    display: none;
                    flex-direction: column;
                    gap: 6px;
                    cursor: pointer;
                    z-index: 1001;
                }

                .mobile-toggle span {
                    width: 25px;
                    height: 2px;
                    background: #ffffff;
                    transition: all 0.3s ease;
                }

                .mobile-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }

                .mobile-toggle.active span:nth-child(2) {
                    opacity: 0;
                }

                .mobile-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }

                /* ===== MOBILE MENU ===== */
                @media (max-width: 768px) {
                    .navbar {
                        padding: 15px 20px;
                    }

                    .logo-wrapper {
                        height: 58px;
                    }

                    .logo {
                        height: 58px;
                    }

                    /* Disable water effect on mobile */
                    .water-effect {
                        display: none;
                    }

                    .nav-menu {
                        position: fixed;
                        top: 0;
                        right: ${mobileMenuOpen ? '0' : '-100%'};
                        width: 75%;
                        height: 100vh;
                        background: rgba(0, 0, 0, 0.98);
                        flex-direction: column;
                        padding: 100px 40px;
                        transition: right 0.4s ease;
                        align-items: center;
                        justify-content: center;
                    }

                    .nav-link {
                        font-size: 36px;
                        font-weight: 700;
                    }

                    .nav-link::after {
                        height: 3px;
                    }

                    .mobile-toggle {
                        display: flex;
                    }
                }
            `}</style>

            <nav className="navbar">
                <div className="nav-container">
                    <Link href="/">
                        <div
                            className={`logo-wrapper ${isHoveringLogo ? 'water-active' : ''}`}
                            onMouseEnter={() => setIsHoveringLogo(true)}
                            onMouseLeave={() => setIsHoveringLogo(false)}
                        >
                            <img
                                className="logo"
                                src="/logov2.png"
                                alt="5feet4 Studio"
                            />
                            {isHoveringLogo && (
                                <>
                                    <div className="water-effect">
                                        <div className="ripple"></div>
                                        <div className="ripple"></div>
                                        <div className="ripple"></div>
                                    </div>
                                    <div className="water-drop"></div>
                                </>
                            )}
                        </div>
                    </Link>
                    <ul className="nav-menu">
                        <li>
                            <Link
                                href="/ads"
                                className={`nav-link ${pathname === '/ads' ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Ads
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/prints"
                                className={`nav-link ${pathname === '/prints' ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Prints
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="nav-link" onClick={handleEmailClick}>
                                Contact
                            </a>
                        </li>
                    </ul>
                    <div
                        className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </>
    )
}