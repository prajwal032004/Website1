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
        offset: 50,
      })
    }

    // Apply blur effect for readability
    document.body.classList.add('blur-active')

    return () => {
      document.body.classList.remove('blur-active')
    }
  }, [])

  return (
    <>
      <style jsx>{`
        :global(body) {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #000;
        }

        /* Matching blur effect from Prints page */
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
          z-index: 10;
          background: transparent;
        }

        .error-content {
          position: relative;
          z-index: 10;
        }

        .error-code {
          font-size: clamp(100px, 18vw, 250px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
          margin-bottom: 30px;
          color: #ffffff;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          opacity: 1;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .error-title {
          font-size: clamp(24px, 4.5vw, 48px);
          font-weight: 300;
          margin-bottom: 50px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          animation: fadeInUp 1.2s ease-out 0.4s both;
        }

        .button-wrapper {
          margin-top: 20px;
          animation: fadeInUp 1.4s ease-out 0.6s both;
        }

        .back-link {
          display: inline-block;
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          background: transparent;
          text-decoration: none;
          padding: 18px 45px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 8px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
          overflow: hidden;
        }

        .back-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #ffffff;
          transition: left 0.4s ease;
          z-index: -1;
        }

        .back-link:hover {
          color: #000000;
          border-color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
        }

        .back-link:hover::before {
          left: 0;
        }

        .footer-minimal {
          position: absolute;
          bottom: 40px;
          width: 100%;
          text-align: center;
          font-size: 14px;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.5);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          animation: fadeInUp 1.6s ease-out 0.8s both;
        }

        .footer-minimal p {
          margin: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .error-section {
            padding: 0 25px;
          }

          .error-code {
            font-size: 120px;
            letter-spacing: -2px;
            margin-bottom: 25px;
          }

          .error-title {
            font-size: 26px;
            letter-spacing: 3px;
            margin-bottom: 40px;
          }

          .back-link {
            padding: 16px 38px;
            font-size: 15px;
            letter-spacing: 2.5px;
          }

          .footer-minimal {
            bottom: 35px;
            font-size: 12px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .error-section {
            padding: 0 20px;
          }

          .error-code {
            font-size: 90px;
            letter-spacing: -1.5px;
            margin-bottom: 20px;
          }

          .error-title {
            font-size: 20px;
            letter-spacing: 2px;
            margin-bottom: 35px;
          }

          .back-link {
            padding: 14px 32px;
            font-size: 13px;
            letter-spacing: 2px;
          }

          .footer-minimal {
            bottom: 30px;
            font-size: 11px;
          }
        }

        /* Extra small devices */
        @media (max-width: 360px) {
          .error-code {
            font-size: 70px;
          }

          .error-title {
            font-size: 18px;
          }

          .back-link {
            padding: 12px 28px;
            font-size: 12px;
          }
        }
      `}</style>

      {/* Background Video remains active in the background */}
      <BackgroundVideo />

      <section className="error-section">
        <div className="error-content">
          <h1 className="error-code" data-aos="fade-up">
            404
          </h1>
          <h2 className="error-title" data-aos="fade-up" data-aos-delay="200">
            Lost in the Frame
          </h2>
          <div className="button-wrapper" data-aos="fade-up" data-aos-delay="400">
            <Link href="/" className="back-link">
              Return to Studio
            </Link>
          </div>
        </div>

        <div className="footer-minimal" data-aos="fade-in" data-aos-delay="600">
          <p>© 2026 5feet4. All Rights Reserved.</p>
        </div>
      </section>
    </>
  )
}