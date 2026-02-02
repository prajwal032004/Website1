'use client'

import { useEffect } from 'react'
import LoadingScreen from '../components/LoadingScreen'

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      })
    }

    // --- Background Blur Logic ---
    const heroSection = document.querySelector('.hero-section')
    const updateBlur = () => {
      if (!heroSection) return
      const rect = heroSection.getBoundingClientRect()

      // Trigger blur when hero is 70% scrolled out of view
      if (rect.bottom < window.innerHeight * 0.3) {
        document.body.classList.add('blur-active')
      } else {
        document.body.classList.remove('blur-active')
      }
    }

    // --- Scroll Listener ---
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
    updateBlur() // Run on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('blur-active')
    }
  }, [])

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
      <style jsx>{`
        /* Global Blur Transition */
        :global(body.blur-active .background-video) {
          filter: blur(15px) brightness(0.5);
          transition: filter 0.8s ease;
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
        }

        .hero-title {
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -2px;
          animation: fadeInUp 1s ease-out;
        }

        #contact-section {
          min-height: 100vh;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 120px 20px;
        }

        .floating-images {
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
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(255, 255, 255, 0.15);
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .float-img:hover {
          transform: scale(1.05) !important;
        }

        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-100px);
          }
          50% {
            opacity: 0.8;
          }
          70% {
            transform: scale(1.1) translateY(0);
          }
          85% {
            transform: scale(0.95) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
          }
        }

        .float-img:nth-child(1) {
          width: 119px;
          left: 43.6%;
          top: 24%;
          animation: fadeInBounce 1s ease-out forwards, bounce 3s ease-in-out 1s infinite;
        }

        .float-img:nth-child(2) {
          width: 137px;
          left: 69.2%;
          top: 27.8%;
          animation: fadeInBounce 1s ease-out 0.1s forwards, bounce 3.2s ease-in-out 1.1s infinite;
        }

        .float-img:nth-child(3) {
          width: 156px;
          left: 14.2%;
          top: 29.4%;
          animation: fadeInBounce 1s ease-out 0.2s forwards, bounce 3.4s ease-in-out 1.2s infinite;
        }

        .float-img:nth-child(4) {
          width: 111px;
          left: 43.7%;
          top: 63.1%;
          animation: fadeInBounce 1s ease-out 0.3s forwards, bounce 3.6s ease-in-out 1.3s infinite;
        }

        .float-img:nth-child(5) {
          width: 192px;
          left: 60.1%;
          top: 59.8%;
          animation: fadeInBounce 1s ease-out 0.4s forwards, bounce 3.8s ease-in-out 1.4s infinite;
        }

        .float-img:nth-child(6) {
          width: 130px;
          left: 25.1%;
          top: 61.2%;
          animation: fadeInBounce 1s ease-out 0.5s forwards, bounce 4s ease-in-out 1.5s infinite;
        }

        .contact-content {
          text-align: center;
          z-index: 2;
          position: relative;
          padding: 0 20px;
          max-width: 1200px;
          width: 100%;
        }

        .contact-subtitle {
          font-size: clamp(28px, 4vw, 48px);
          opacity: 0.6;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .contact-email {
          font-size: clamp(32px, 5vw, 64px);
          color: #fff;
          text-decoration: none;
          transition: all 0.3s;
          font-weight: 700;
          display: inline-block;
          position: relative;
        }

        .contact-email:hover {
          color: #437ed1;
        }

        .copyright {
          font-size: 14px;
          opacity: 0.5;
          font-weight: 400;
          margin-top: 60px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 50px;
          }

          #contact-section {
            padding: 100px 20px 80px;
            flex-direction: column;
            justify-content: center;
          }

          .floating-images {
            width: 100%;
            max-width: 100%;
            height: 450px;
            top: 15%;
            transform: translateX(-50%);
            opacity: 0.8;
          }

          .float-img:nth-child(1) {
            left: 50% !important;
            top: 5% !important;
            transform: translateX(-50%);
            width: 120px !important;
            height: 120px !important;
          }

          .float-img:nth-child(2) {
            right: 5% !important;
            top: 18% !important;
            left: auto !important;
            width: 110px !important;
            height: 110px !important;
          }

          .float-img:nth-child(3) {
            left: 5% !important;
            top: 20% !important;
            width: 115px !important;
            height: 115px !important;
          }

          .float-img:nth-child(4) {
            left: 50% !important;
            top: 48% !important;
            transform: translateX(-50%);
            width: 105px !important;
            height: 105px !important;
          }

          .float-img:nth-child(5) {
            right: 8% !important;
            bottom: 10% !important;
            top: auto !important;
            left: auto !important;
            width: 130px !important;
            height: 130px !important;
          }

          .float-img:nth-child(6) {
            left: 8% !important;
            bottom: 12% !important;
            top: auto !important;
            width: 110px !important;
            height: 110px !important;
          }

          .contact-content {
            padding: 0 25px;
            margin-top: auto;
            padding-bottom: 40px;
          }

          .contact-subtitle {
            font-size: 24px;
            margin-bottom: 18px;
          }

          .contact-email {
            font-size: 28px;
            line-height: 1.3;
            word-break: break-word;
          }

          .copyright {
            font-size: 11px;
            margin-top: 50px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 110px;
          }

          .floating-images {
            height: 400px;
            top: 12%;
          }

          .float-img:nth-child(1) {
            width: 86px !important;
            height: 144px !important;
            top: -9% !important;
            left: 42% !important;
          }

          .float-img:nth-child(2) {
            width: 95px !important;
            height: 95px !important;
            right: 3% !important;
            top: 16% !important;
          }

          .float-img:nth-child(3) {
            width: 100px !important;
            height: 100px !important;
            left: 3% !important;
            top: 18% !important;
          }

          .float-img:nth-child(4) {
            width: 90px !important;
            height: 90px !important;
            top: 45% !important;
            left: 39% !important;
          }

          .float-img:nth-child(5) {
            width: 115px !important;
            height: 115px !important;
            right: 5% !important;
            bottom: 8% !important;
          }

          .float-img:nth-child(6) {
            width: 95px !important;
            height: 95px !important;
            left: 5% !important;
            bottom: 10% !important;
          }

          .contact-subtitle {
            font-size: 22px;
          }

          .contact-email {
            font-size: 24px;
          }

          .copyright {
            font-size: 10px;
            margin-top: 40px;
          }
        }
      `}</style>

      <LoadingScreen />

      <section className="hero-section">
        <div className="hero-content" data-aos="fade-up">
          <h1 className="hero-title">
            Main
            <br />
            Page
          </h1>
        </div>
      </section>

      <section id="contact-section">
        <div className="floating-images">
          <img
            className="float-img"
            src="https://framerusercontent.com/images/W3b7GDV4XQVsSrHdhkRlv9NUU.jpg"
            alt=""
          />
          <img
            className="float-img"
            src="https://framerusercontent.com/images/nBAbSF2jsYWNlnzuGllEEDf3zIg.jpg"
            alt=""
          />
          <img
            className="float-img"
            src="https://framerusercontent.com/images/pg0d0nNtcT9BhUuLbSw3Fzr6iOE.jpeg"
            alt=""
          />
          <img
            className="float-img"
            src="https://framerusercontent.com/images/wsyzQwaYYJG6SEPJvyMJ3In9qMQ.jpg"
            alt=""
          />
          <img
            className="float-img"
            src="https://framerusercontent.com/images/Udo1gQX7crsTSWxQ2sUxyZoupI.jpg"
            alt=""
          />
          <img
            className="float-img"
            src="https://framerusercontent.com/images/UKGoy93tcBEGklBQdyZXhFQ.png"
            alt=""
          />
        </div>

        <div className="contact-content">
          <div data-aos="fade-up">
            <p className="contact-subtitle">Let's have a chat</p>
            <a href="#" className="contact-email" onClick={handleEmailClick}>
              business@5feet4.co
            </a>
          </div>
          <p data-aos="fade-up" data-aos-delay="100" className="copyright">
            © 2025 5feet4. All Rights Reserved.
          </p>
        </div>
      </section>
    </>
  )
}