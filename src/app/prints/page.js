'use client'

import { useEffect } from 'react'

export default function Prints() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.AOS) {
            window.AOS.init({
                duration: 1200,
                once: true,
                offset: 120,
                easing: 'ease-out-cubic',
            })
        }

        const heroSection = document.querySelector('.hero-section')

        const updateBlur = () => {
            if (!heroSection) return
            const rect = heroSection.getBoundingClientRect()
            if (rect.bottom < window.innerHeight * 0.2) {
                document.body.classList.add('blur-active')
            } else {
                document.body.classList.remove('blur-active')
            }
        }

        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateBlur()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        updateBlur()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            document.body.classList.remove('blur-active')
        }
    }, [])

    return (
        <>
            <style jsx>{`
        body.blur-active .background-video {
          filter: blur(15px) brightness(0.5);
        }

        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          mix-blend-mode: difference;
          padding: 0 20px;
        }

        .coming-soon-badge {
          display: inline-block;
          padding: 8px 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 100px;
          font-size: 14px;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          animation: fadeInUp 1s ease-out;
        }

        .hero-title {
          font-size: clamp(60px, 12vw, 160px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -4px;
          margin-bottom: 20px;
          animation: fadeInUp 1.2s ease-out;
        }

        .hero-subtitle {
          font-size: clamp(16px, 2vw, 24px);
          opacity: 0.7;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          animation: fadeInUp 1.4s ease-out;
        }

        .teaser-section {
          min-height: 60vh;
          padding: 100px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: linear-gradient(to bottom, transparent, #000);
        }

        .teaser-content {
          max-width: 800px;
        }

        .teaser-content h2 {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 700;
          margin-bottom: 30px;
          letter-spacing: -1px;
        }

        .teaser-content p {
          font-size: 18px;
          opacity: 0.6;
          line-height: 1.8;
          margin-bottom: 40px;
        }

        .notified-input-group {
          display: flex;
          gap: 10px;
          max-width: 500px;
          margin: 0 auto;
        }

        input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 15px 25px;
          border-radius: 8px;
          color: white;
          outline: none;
          transition: border 0.3s ease;
        }

        input:focus {
          border-color: rgba(255, 255, 255, 0.4);
        }

        .notify-btn {
          padding: 15px 30px;
          background: #fff;
          color: #000;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .notify-btn:hover {
          transform: scale(1.05);
          background: #e0e0e0;
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
          .hero-title {
            font-size: 80px;
            letter-spacing: -2px;
          }
          
          .notified-input-group {
            flex-direction: column;
          }
          
          .notify-btn {
            width: 100%;
          }
        }
      `}</style>

            <section className="hero-section">
                <div className="hero-content">
                    <div className="coming-soon-badge">Coming Soon</div>
                    <h1 className="hero-title">
                        The
                        <br />
                        Print Shop
                    </h1>
                    <p className="hero-subtitle">
                        Transforming our cinematic frames into museum-quality physical art.
                        Limited edition drops arriving soon.
                    </p>
                </div>
            </section>


        </>
    )
}