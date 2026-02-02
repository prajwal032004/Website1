'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import BackgroundVideo from '../components/BackgroundVideo'

export default function NotFound() {
    useEffect(() => {
        // --- AOS Initialization ---
        if (typeof window !== 'undefined' && window.AOS) {
            window.AOS.init({
                duration: 1000,
                once: true,
            })
        }

        // Ensure video is slightly blurred for readability on the error page
        document.body.classList.add('blur-active')

        return () => {
            document.body.classList.remove('blur-active')
        }
    }, [])

    return (
        <>
            <style jsx>{`
        /* Apply specific blur for this page */
        :global(body.blur-active .background-video) {
          filter: blur(15px) brightness(0.4);
          transition: filter 0.8s ease;
        }

        .error-section {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 20px;
          z-index: 2;
        }

        .error-content {
          mix-blend-mode: difference;
          color: white;
        }

        .error-code {
          font-size: clamp(120px, 20vw, 250px);
          font-weight: 800;
          line-height: 0.8;
          letter-spacing: -10px;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .error-title {
          font-size: clamp(24px, 4vw, 42px);
          font-weight: 400;
          margin-bottom: 40px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .back-link {
          font-size: 16px;
          color: #fff;
          text-decoration: none;
          padding: 15px 40px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 3px;
        }

        .back-link:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        .footer-minimal {
          position: absolute;
          bottom: 40px;
          width: 100%;
          text-align: center;
          opacity: 0.5;
          font-size: 12px;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .error-code {
            letter-spacing: -5px;
          }
          .back-link {
            padding: 12px 30px;
            font-size: 14px;
          }
        }
      `}</style>

            {/* Background Video remains active in the background */}
            <BackgroundVideo />

            <section className="error-section">
                <div className="error-content">
                    <h1 className="error-code" data-aos="zoom-in">404</h1>
                    <h2 className="error-title" data-aos="fade-up" data-aos-delay="200">
                        Lost in the Frame
                    </h2>
                    <div data-aos="fade-up" data-aos-delay="400">
                        <Link href="/" className="back-link">
                            Return to Studio
                        </Link>
                    </div>
                </div>

                <div className="footer-minimal">
                    <p>© 2026 5feet4. All Rights Reserved.</p>
                </div>
            </section>
        </>
    )
}