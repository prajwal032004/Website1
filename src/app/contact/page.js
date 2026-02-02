'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import BackgroundVideo from '../../components/BackgroundVideo' // Adjust path as needed

export default function Contact() {
    useEffect(() => {
        // Initialize AOS for smooth entry animations
        if (typeof window !== 'undefined' && window.AOS) {
            window.AOS.init({
                duration: 1000,
                once: true,
                easing: 'ease-out',
            })
        }
    }, [])

    return (
        <>
            <style jsx>{`
        .contact-page {
          position: relative;
          min-height: 100vh;
          width: 100%;
          color: #fff;
          overflow-x: hidden;
        }

        /* Dark Overlay for Video Readability */
        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 10, 0.7);
          z-index: 0;
          pointer-events: none;
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 140px 40px 60px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px;
        }

        /* Typography */
        .section-title {
          font-size: clamp(32px, 4vw, 42px);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin-bottom: 40px;
          mix-blend-mode: difference; /* Match Colin Tilley style */
        }

        .category-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 4px;
          display: block;
        }

        .company-name {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          display: block;
        }

        .person-group {
          margin-bottom: 30px;
        }

        .person-name {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 2px;
          display: block;
        }

        .contact-link {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          border-bottom: 1px solid transparent;
          margin-bottom: 10px;
        }

        .contact-link:hover {
          color: #fff;
          border-bottom: 1px solid #fff;
        }

        /* Footer */
        .footer {
          margin-top: 100px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .copyright {
          font-size: 12px;
          opacity: 0.4;
          letter-spacing: 1px;
        }

        .copyright-link {
          color: inherit;
          text-decoration: none;
          font-weight: 600;
        }

        /* Responsive Logic */
        @media (max-width: 1100px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 100px 25px 40px;
          }
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .section-title {
            margin-bottom: 25px;
            font-size: 28px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 10px;
          }
        }
      `}</style>

            <div className="contact-page">
                {/* Your Background Video Component */}
                <BackgroundVideo />
                <div className="video-overlay" />

                <main className="content-wrapper">
                    <div className="contact-grid">

                        {/* COLUMN 1: REPRESENTATION */}
                        <div data-aos="fade-up">
                            <h2 className="section-title">Representation</h2>

                            <div className="person-group">
                                <span className="category-label">West Coast</span>
                                <span className="company-name">Melissa Ross &amp; Reps</span>

                                <span className="person-name">Melissa Ross</span>
                                <a href="mailto:melissa@example.com" className="contact-link">melissa@example.com</a>

                                <span className="person-name" style={{ marginTop: '10px' }}>Worthy Goodman</span>
                                <a href="mailto:worthy@example.com" className="contact-link">worthy@example.com</a>
                            </div>

                            <div className="person-group">
                                <span className="category-label">East Coast</span>
                                <span className="company-name">Rep Co</span>

                                <span className="person-name">Tara Averil</span>
                                <a href="mailto:tara@example.com" className="contact-link">tara@example.com</a>

                                <span className="person-name" style={{ marginTop: '10px' }}>John Robertson</span>
                                <a href="mailto:john@example.com" className="contact-link">john@example.com</a>
                            </div>
                        </div>

                        {/* COLUMN 2: MANAGEMENT & MUSIC VIDEO */}
                        <div data-aos="fade-up" data-aos-delay="100">
                            <h2 className="section-title">Management</h2>

                            <div className="person-group">
                                <span className="category-label">Film &amp; TV</span>
                                <span className="company-name">Circle of Confusion</span>
                                <span className="person-name">Samantha Starr</span>
                                <a href="mailto:samantha@example.com" className="contact-link">samantha@example.com</a>
                            </div>

                            <div className="person-group" style={{ marginTop: '60px' }}>
                                <h2 className="section-title">Music Videos</h2>
                                <span className="person-name">Tommy Labuda</span>
                                <a href="mailto:tommy@example.com" className="contact-link">tommy@example.com</a>
                                <br />
                                <a href="tel:3237931907" className="contact-link">323.793.1907</a>
                            </div>
                        </div>

                        {/* COLUMN 3: COMMERCIALS */}
                        <div data-aos="fade-up" data-aos-delay="200">
                            <h2 className="section-title">Commercials</h2>

                            <div className="person-group">
                                <span className="category-label">US - London Alley</span>
                                <span className="company-name">Executive Producers</span>

                                <span className="person-name">Luga Podesta</span>
                                <a href="mailto:luga@example.com" className="contact-link">luga@example.com</a>

                                <span className="person-name" style={{ marginTop: '10px' }}>Matthew Kauth</span>
                                <a href="mailto:matthew@example.com" className="contact-link">matthew@example.com</a>

                                <span className="person-name" style={{ marginTop: '10px' }}>Sandy Haddad</span>
                                <a href="mailto:sandy@example.com" className="contact-link">sandy@example.com</a>
                            </div>

                            <div className="person-group" style={{ marginTop: '40px' }}>
                                <span className="category-label">France - Phantasm</span>
                                <span className="person-name">Gary Farkas</span>
                                <a href="mailto:gary@example.com" className="contact-link">gary@example.com</a>

                                <span className="person-name" style={{ marginTop: '10px' }}>Olivier Muller</span>
                                <a href="mailto:olivier@example.com" className="contact-link">olivier@example.com</a>
                            </div>
                        </div>

                    </div>

                    <footer className="footer">
                        <p data-aos="fade-up" className="copyright">
                            © 2025 <Link href="/" className="copyright-link">5FEET4</Link>. ALL RIGHTS RESERVED.
                        </p>
                    </footer>
                </main>
            </div>
        </>
    )
}