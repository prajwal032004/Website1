'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import LoadingScreen from '../components/LoadingScreen'

export default function Home() {
  const heroRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Delay content visibility until after loading screen
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 3500) // Slightly after loading completes

    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Initialize AOS
    if (typeof window !== 'undefined' && window.AOS) {
      setTimeout(() => {
        window.AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
          delay: 100,
        })
      }, 3600)
    }

    // Background blur on scroll
    const updateBlur = () => {
      const heroSection = heroRef.current
      if (!heroSection) return

      const rect = heroSection.getBoundingClientRect()
      if (rect.bottom < window.innerHeight * 0.3) {
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
      clearTimeout(contentTimer)
      clearTimeout(loadTimer)
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('blur-active')
    }
  }, [])

  const handleEmailClick = (e) => {
    e.preventDefault()
    const email = 'business@5feet4.co'
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

    if (isMobile) {
      window.location.href = `mailto:${email}`
    } else {
      // Try Gmail first, fallback to default mail client
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  return (
    <>
      <style jsx>{`
        :global(body) {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #000;
        }

        :global(body.blur-active .background-video) {
          filter: blur(15px) brightness(0.4);
          transition: filter 0.8s ease;
        }

        .main-container {
          opacity: ${showContent ? '1' : '0'};
          transition: opacity 0.6s ease-in;
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
          z-index: 10;
          text-align: center;
        }

        .hero-title {
          font-size: clamp(70px, 12vw, 160px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
          color: #fff;
          margin: 0;
          animation: fadeInUp 1.2s ease-out 0.5s both;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
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

        .contact-section {
          min-height: 100vh;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 120px 20px;
          overflow: hidden;
        }

        .floating-container {
          position: absolute;
          width: 100%;
          max-width: 1400px;
          height: 700px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
        }

        .float-img {
          position: absolute;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(255, 255, 255, 0.2);
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: auto;
          opacity: 0;
        }

        .float-img:hover {
          transform: scale(1.08) !important;
          z-index: 10;
          box-shadow: 0 30px 80px rgba(255, 255, 255, 0.3);
        }

        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-100px) rotate(-10deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.1) translateY(10px) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .float-img:nth-child(1) {
          width: 119px;
          height: 119px;
          left: 43.6%;
          top: 24%;
          animation: floatIn 1s ease-out 0.1s forwards, float 4s ease-in-out 1.1s infinite;
        }

        .float-img:nth-child(2) {
          width: 137px;
          height: 137px;
          left: 69.2%;
          top: 27.8%;
          animation: floatIn 1s ease-out 0.2s forwards, float 4.3s ease-in-out 1.2s infinite;
        }

        .float-img:nth-child(3) {
          width: 156px;
          height: 156px;
          left: 14.2%;
          top: 29.4%;
          animation: floatIn 1s ease-out 0.3s forwards, float 4.6s ease-in-out 1.3s infinite;
        }

        .float-img:nth-child(4) {
          width: 111px;
          height: 111px;
          left: 43.7%;
          top: 63.1%;
          animation: floatIn 1s ease-out 0.4s forwards, float 4.9s ease-in-out 1.4s infinite;
        }

        .float-img:nth-child(5) {
          width: 192px;
          height: 192px;
          left: 60.1%;
          top: 59.8%;
          animation: floatIn 1s ease-out 0.5s forwards, float 5.2s ease-in-out 1.5s infinite;
        }

        .float-img:nth-child(6) {
          width: 130px;
          height: 130px;
          left: 25.1%;
          top: 61.2%;
          animation: floatIn 1s ease-out 0.6s forwards, float 5.5s ease-in-out 1.6s infinite;
        }

        .contact-content {
          text-align: center;
          z-index: 10;
          position: relative;
          padding: 0 20px;
          max-width: 1200px;
          width: 100%;
        }

        .contact-subtitle {
          font-size: clamp(28px, 4.5vw, 52px);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 25px;
          font-weight: 300;
          letter-spacing: -0.5px;
        }

        .contact-email {
          font-size: clamp(32px, 5.5vw, 72px);
          color: #fff;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-weight: 700;
          display: inline-block;
          position: relative;
          letter-spacing: -1px;
        }

        .contact-email:hover {
          color: #5B9BF3;
          transform: scale(1.05);
          text-shadow: 0 0 30px rgba(91, 155, 243, 0.5);
        }

        .contact-email::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #5B9BF3, #437ed1);
          transition: width 0.4s ease;
        }

        .contact-email:hover::after {
          width: 100%;
        }

        .copyright {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 400;
          margin-top: 80px;
          letter-spacing: 0.5px;
        }
        
        .copyright-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s;
        }

        .copyright-link:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 60px;
            letter-spacing: -2px;
          }

          .contact-section {
            padding: 80px 20px 60px;
          }

          .floating-container {
            height: 500px;
            top: 20%;
          }

          .float-img {
            border-radius: 12px;
          }

          .float-img:nth-child(1) {
            left: 50% !important;
            top: 0% !important;
            transform: translateX(-50%);
            width: 100px !important;
            height: 100px !important;
          }

          .float-img:nth-child(2) {
            right: 8% !important;
            top: 15% !important;
            left: auto !important;
            width: 95px !important;
            height: 95px !important;
          }

          .float-img:nth-child(3) {
            left: 8% !important;
            top: 18% !important;
            width: 105px !important;
            height: 105px !important;
          }

          .float-img:nth-child(4) {
            left: 50% !important;
            top: 42% !important;
            transform: translateX(-50%);
            width: 90px !important;
            height: 90px !important;
          }

          .float-img:nth-child(5) {
            right: 10% !important;
            bottom: 15% !important;
            top: auto !important;
            left: auto !important;
            width: 120px !important;
            height: 120px !important;
          }

          .float-img:nth-child(6) {
            left: 10% !important;
            bottom: 18% !important;
            top: auto !important;
            width: 100px !important;
            height: 100px !important;
          }

          .contact-content {
            margin-top: auto;
            padding-bottom: 40px;
          }

          .contact-subtitle {
            font-size: 24px;
            margin-bottom: 20px;
          }

          .contact-email {
            font-size: 26px;
            word-break: break-word;
          }

          .copyright {
            font-size: 12px;
            margin-top: 60px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 50px;
          }

          .floating-container {
            height: 450px;
            top: 15%;
          }

          .contact-subtitle {
            font-size: 20px;
          }

          .contact-email {
            font-size: 22px;
          }

          .copyright {
            font-size: 11px;
            margin-top: 50px;
          }
        }
      `}</style>

      <LoadingScreen />

      <div className="main-container">
        <section className="hero-section" ref={heroRef}>
          <div className="hero-content" data-aos="fade-up">
            <h1 className="hero-title">
              Main
              <br />
              Page
            </h1>
          </div>
        </section>

        <section className="contact-section">
          <div className="floating-container">
            <img
              className="float-img"
              src="https://framerusercontent.com/images/W3b7GDV4XQVsSrHdhkRlv9NUU.jpg"
              alt="Portfolio work 1"
              loading="lazy"
            />
            <img
              className="float-img"
              src="https://framerusercontent.com/images/nBAbSF2jsYWNlnzuGllEEDf3zIg.jpg"
              alt="Portfolio work 2"
              loading="lazy"
            />
            <img
              className="float-img"
              src="https://framerusercontent.com/images/pg0d0nNtcT9BhUuLbSw3Fzr6iOE.jpeg"
              alt="Portfolio work 3"
              loading="lazy"
            />
            <img
              className="float-img"
              src="https://framerusercontent.com/images/wsyzQwaYYJG6SEPJvyMJ3In9qMQ.jpg"
              alt="Portfolio work 4"
              loading="lazy"
            />
            <img
              className="float-img"
              src="https://framerusercontent.com/images/Udo1gQX7crsTSWxQ2sUxyZoupI.jpg"
              alt="Portfolio work 5"
              loading="lazy"
            />
            <img
              className="float-img"
              src="https://framerusercontent.com/images/UKGoy93tcBEGklBQdyZXhFQ.png"
              alt="Portfolio work 6"
              loading="lazy"
            />
          </div>

          <div className="contact-content">
            <div data-aos="fade-up" data-aos-delay="200">
              <p className="contact-subtitle">Let's have a chat</p>
              <a
                href="mailto:business@5feet4.co"
                className="contact-email"
                onClick={handleEmailClick}
              >
                business@5feet4.co
              </a>
            </div>
            <p data-aos="fade-up" data-aos-delay="300" className="copyright">
              © 2026 <Link href="/" className="copyright-link">5feet4</Link>. All Rights Reserved.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}