'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

                .logo {
                    height: 100px;
                    width: auto;
                    transition: opacity 0.3s ease;
                    cursor: pointer;
                }

                .logo:hover {
                    opacity: 0.7;
                }

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

                /* ===== NAV LINKS - ALL STYLES ===== */
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

                    .logo {
                        height: 58px;
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
                        <img
                            className="logo"
                            src="/logov2.png"
                            alt="5feet4 Studio"
                        />
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