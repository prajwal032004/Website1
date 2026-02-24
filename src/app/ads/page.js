'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const AdsContent = ({ isLoaded, containerRefs, videos, getVimeoData, handleSoundToggle }) => {
  return (
    <>
      <style jsx suppressHydrationWarning>{`
        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100%;
          height: auto;
          min-height: 100vh;
        }

        :global(*) {
          box-sizing: border-box;
        }

        .skeleton-block {
          background-color: #0f0f0f;
          position: relative;
          overflow: hidden;
        }

        .skeleton-block::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 20%,
            rgba(255, 255, 255, 0.09) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .sk-hero-line {
          height: clamp(70px, 12vw, 160px);
          background: #111;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .sk-hero-line.top { width: 25%; }
        .sk-hero-line.bot { width: 20%; }

        @media (max-width: 768px) {
          .sk-hero-line.top { width: 90%; height:80px;}
          .sk-hero-line.bot { width: 60%; height:60px;}
        }

        .sk-header-title {
          width: 200px;
          height: 60px;
          margin: 0 auto 30px;
          border-radius: 8px;
          background: #111;
        }
        .sk-header-p {
          width: 600px;
          height: 24px;
          margin: 0 auto 10px;
          border-radius: 4px;
          background: #161616;
          max-width: 90%;
        }

        .sk-video-card {
          background: #121212;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          min-height: 500px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 30px;
        }

        .sk-video-card.vertical {
          grid-column: span 1;
        }

        .sk-video-card.horizontal {
          grid-column: span 2;
        }

        .sk-overlay-title {
          width: 50%;
          height: 28px;
          background: #1e1e1e;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .sk-overlay-desc {
          width: 80%;
          height: 16px;
          background: #1e1e1e;
          border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .sk-video-card.horizontal { grid-column: span 1; }
            .sk-video-card { 
              min-height: auto;
              aspect-ratio: 16 / 9;
            }
            .sk-video-card.vertical {
              aspect-ratio: 9 / 16;
            }
        }

        .skeleton-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          transition: opacity 0.6s ease-out, visibility 0.6s;
          opacity: 1;
          visibility: visible;
        }
        .skeleton-wrapper.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .content-wrapper {
          opacity: 0;
          transition: opacity 0.8s ease-in;
          width: 100%;
          overflow: hidden;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          min-height: auto;
        }
        .content-wrapper.loaded {
          opacity: 1;
        }

        :global(body.blur-active .background-video) {
          filter: blur(15px) brightness(0.7);
        }

        :global(body.blur-active .video-overlay) {
          background: rgba(0, 0, 0, 0.7);
        }

        .background-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          transition: filter 0.5s ease;
        }

        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: -1;
          pointer-events: none;
          transition: background 0.5s ease;
        }

        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          mix-blend-mode: difference;
        }

        .hero-title {
          font-size: clamp(70px, 12vw, 160px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
          animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          text-transform: uppercase;
          color: #fff;
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

        #work-section {
          min-height: 100vh;
          padding: 120px 40px;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-header h2 {
          font-size: clamp(52px, 7vw, 80px);
          font-weight: 700;
          margin-bottom: 25px;
          letter-spacing: -2px;
          text-transform: uppercase;
          color: #fff;
        }

        .section-header p {
          font-size: clamp(18px, 2.2vw, 26px);
          opacity: 0.75;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
          color: #fff;
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1600px;
          margin: 0 auto;
          auto-flow: dense;
        }

        .work-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          background: #111;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          height: 100%;
          min-height: 400px;
        }

        .work-item.vertical {
          grid-column: span 1;
          min-height: 600px;
        }

        .work-item.horizontal {
          grid-column: span 2;
          min-height: 500px;
        }

        .work-item:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(255, 255, 255, 0.39);
        }

        .vimeo-container {
          width: 100%;
          height: 100%;
          position: relative;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .vimeo-container iframe {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.11);
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: none;
          display: block;
        }

        .work-item.vertical .vimeo-container iframe {
          transform: translate(-50%, -50%) scale(1.33);
        }

        .work-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.95),
            rgba(0, 0, 0, 0.3) 70%,
            transparent
          );
          padding: 35px 30px;
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 5;
        }

        @media (min-width: 769px) {
          .work-item:hover .work-overlay {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .work-overlay h3 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
          color: #fff;
        }

        .work-overlay p {
          font-size: 15px;
          opacity: 0.85;
          line-height: 1.6;
          font-weight: 400;
          color: #fff;
        }

        .sound-toggle {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          backdrop-filter: blur(10px);
        }

        .sound-toggle:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: scale(1.15);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .sound-toggle svg {
          width: 22px;
          height: 22px;
          stroke: #fff;
          pointer-events: none;
        }

        .icon-muted {
          display: block;
        }

        .icon-unmuted {
          display: none;
        }

        :global(.work-item.unmuted) .icon-muted {
          display: none;
        }

        :global(.work-item.unmuted) .icon-unmuted {
          display: block;
        }

        .copyright-container {
          width: 100%;
          padding: 20px 20px 20px;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 100;
          min-height: auto;
          height: auto;
          background: rgba(0, 0, 0, 0.3);
          flex-shrink: 0;
        }

        .copyright {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
          letter-spacing: 0.5px;
          margin: 0;
          padding: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          height: auto;
          line-height: 1.3;
        }

        .copyright-link,
        .copyright-link:visited,
        .copyright-link:active {
          color: #ffffff;
          font-weight: 700;
          text-decoration: none;
          position: relative;
          display: inline-block;
          margin: 0 4px;
          cursor: pointer;
        }

        .copyright-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #ffffff;
          transition: width 0.3s ease;
        }

        .copyright-link:hover::after {
          width: 100%;
        }

        .copyright-link:hover {
          opacity: 0.8;
          transform: translateY(-1px);
        }

        @media (max-width: 1600px) {
          .work-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 1200px) {
          .work-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }

          .work-item.horizontal {
            grid-column: span 1;
            min-height: 450px;
          }

          .work-item.vertical {
            grid-column: span 1;
            min-height: 450px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 0 20px;
          }

          .hero-title {
            font-size: 110px;
            padding: 0;
            margin: 0 auto;
            display: block;
            width: 100%;
            text-align: center;
          }

          #work-section {
            padding: 60px 20px;
            margin: 0 auto;
            max-width: 100%;
            width: 100%;
          }

          .section-header {
            margin-bottom: 60px;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            max-width: 100%;
          }

          .section-header h2 {
            font-size: clamp(36px, 10vw, 56px);
            margin-bottom: 20px;
            margin-left: 0;
            margin-right: 0;
            width: 100%;
            text-align: center;
          }

          .section-header p {
            font-size: clamp(14px, 4vw, 18px);
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            max-width: 100%;
            text-align: center;
          }

          .work-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            auto-flow: auto;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            max-width: 100%;
            padding: 0;
          }

          .work-item.horizontal,
          .work-item.vertical {
            grid-column: span 1;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            max-width: 100%;
          }

          .work-item {
            aspect-ratio: 16 / 9;
            min-height: unset;
          }

          .work-item.vertical {
            aspect-ratio: 9 / 16;
            min-height: unset;
          }

          .work-item.horizontal {
            aspect-ratio: 16 / 9;
            min-height: unset;
          }

          .vimeo-container {
            width: 100%;
            height: 100%;
            position: relative;
          }

          .vimeo-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: none !important;
            scale: 1 !important;
          }

          .work-item.vertical .vimeo-container iframe {
            transform: none !important;
            scale: 1 !important;
          }

          .sound-toggle {
            width: 40px;
            height: 40px;
            top: 12px;
            right: 12px;
          }

          .sound-toggle svg {
            width: 18px;
            height: 18px;
          }

          .sound-toggle:hover {
            transform: scale(1.1);
          }

          .work-overlay {
            padding: 24px 18px;
          }

          .work-overlay h3 {
            font-size: 18px;
            margin-bottom: 6px;
            line-height: 1.3;
          }

          .work-overlay p {
            font-size: 12px;
            line-height: 1.4;
            opacity: 0.8;
          }

          .work-overlay {
            opacity: 0;
            transform: translateY(25px);
            transition: none;
            animation: none;
          }

          :global(.work-item.in-center) .work-overlay {
            animation: fadeInUpBottom 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .copyright-container {
            padding: 20px 20px;
            margin: 0;
            width: 100%;
            text-align: center;
            height: auto;
            background: rgba(0, 0, 0, 0.3);
            flex-shrink: 0;
          }

          .copyright {
            font-size: 12px;
            text-align: center;
            line-height: 1.3;
            margin: 0;
            padding: 0;
          }

          @keyframes fadeInUpBottom {
            from {
              opacity: 0;
              transform: translateY(25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 0 15px;
          }

          .hero-title {
            font-size: 68px;
            padding: 0;
            margin: 0 auto;
            width: 100%;
            text-align: center;
          }

          #work-section {
            padding: 60px 15px;
            width: 100%;
            margin: 0 auto;
          }

          .work-item {
            aspect-ratio: 16 / 9;
            min-height: unset;
          }

          .work-item.vertical {
            aspect-ratio: 9 / 16;
            min-height: unset;
          }

          .work-item.horizontal {
            aspect-ratio: 16 / 9;
            min-height: unset;
          }

          .work-overlay {
            padding: 20px 16px;
          }

          .work-overlay h3 {
            font-size: 16px;
          }

          .work-overlay p {
            font-size: 11px;
          }

          .sound-toggle {
            width: 36px;
            height: 36px;
            top: 10px;
            right: 10px;
          }

          .sound-toggle svg {
            width: 16px;
            height: 16px;
          }

          .copyright-container {
            width: 100%;
            margin: 0;
            padding: 20px 15px;
            height: auto;
            background: rgba(0, 0, 0, 0.3);
            flex-shrink: 0;
          }

          .copyright {
            width: 100%;
            text-align: center;
            margin: 0;
            padding: 0;
            font-size: 11px;
            line-height: 1.3;
          }
        }

        @media (max-width: 360px) {
          .hero-section {
            padding: 0 12px;
          }

          .hero-title {
            font-size: 56px;
            padding: 0;
            text-align: center;
            width: 100%;
            margin: 0 auto;
          }

          .section-header h2 {
            font-size: 28px;
            text-align: center;
            width: 100%;
          }

          .section-header p {
            text-align: center;
            width: 100%;
          }

          #work-section {
            padding: 60px 12px;
            width: 100%;
            margin: 0 auto;
          }

          .work-grid {
            width: 100%;
            margin: 0 auto;
            gap: 10px;
          }

          .work-item {
            aspect-ratio: 16 / 9;
            min-height: unset;
          }

          .work-item.vertical {
            aspect-ratio: 9 / 16;
            min-height: unset;
          }

          .work-item.horizontal {
            aspect-ratio: 16 / 9;
            min-height: unset;
          }

          .copyright-container {
            padding: 20px 12px;
            width: 100%;
            margin: 0;
            height: auto;
            background: rgba(0, 0, 0, 0.3);
            flex-shrink: 0;
          }

          .copyright {
            font-size: 10px;
            text-align: center;
            width: 100%;
            margin: 0;
            padding: 0;
            line-height: 1.3;
          }
        }
      `}</style>

      {/* SKELETON LOADER */}
      <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>
        <section className="hero-section">
          <div className="skeleton-block sk-hero-line top"></div>
          <div className="skeleton-block sk-hero-line bot"></div>
        </section>

        <section id="work-section">
          <div className="section-header">
            <div className="skeleton-block sk-header-title"></div>
            <div className="skeleton-block sk-header-p"></div>
            <div className="skeleton-block sk-header-p" style={{ width: '400px' }}></div>
          </div>

          <div className="work-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`skeleton-block sk-video-card ${i < 4 ? 'vertical' : i < 6 ? 'horizontal' : 'vertical'}`}>
                <div className="skeleton-block sk-overlay-title"></div>
                <div className="skeleton-block sk-overlay-desc"></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* REAL CONTENT */}
      <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <section className="hero-section">
          <div className="hero-content" data-aos="fade-up">
            <h1 className="hero-title">
              Creative
              <br />
              Stories
            </h1>
          </div>
        </section>

        <section id="work-section">
          <div className="section-header" data-aos="fade-up">
            <h2>Our Work</h2>
            <p>Crafting visual stories that captivate, engage, and inspire audiences worldwide</p>
          </div>

          <div className="work-grid">
            {videos.map((video, index) => (
              <div
                key={index}
                className={`work-item ${video.type}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                ref={(el) => (containerRefs.current[index] = el)}
              >
                <div className="vimeo-container">
                  <iframe
                    title={video.title}
                    src={`https://player.vimeo.com/video/${getVimeoData(video.src).id}?h=${getVimeoData(video.src).hash}`}
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                <button
                  className="sound-toggle"
                  aria-label="Toggle sound"
                  onClick={(e) => handleSoundToggle(e, index)}
                >
                  <svg className="icon-muted" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 5L6 9H2V15H6L11 19V5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <svg className="icon-unmuted" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 5L6 9H2V15H6L11 19V5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.364 5.63599C19.9926 7.26465 20.9087 9.49077 20.9087 11.8095C20.9087 14.1282 19.9926 16.3543 18.364 17.983"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="work-overlay">
                  <h3>{video.title}</h3>
                  <p>{video.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="copyright-container">
          <p data-aos="fade-up" data-aos-offset="0" className="copyright">
            © 2026{' '}
            <Link href="/" className="copyright-link">
              5feet4
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  )
}

export default function Ads() {
  const containerRefs = useRef([])
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const MIN_LOADING_TIME = 2500

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, MIN_LOADING_TIME)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (!isLoaded) return

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
      if (rect.bottom < window.innerHeight * 0.3) {
        document.body.classList.add('blur-active')
      } else {
        document.body.classList.remove('blur-active')
      }
    }

    const containerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const container = entry.target
          const iframe = container.querySelector('iframe')
          if (!iframe) return

          if (entry.isIntersecting) {
            iframe.contentWindow?.postMessage({ method: 'play' }, '*')
          } else {
            iframe.contentWindow?.postMessage({ method: 'pause' }, '*')
          }
        })
      },
      { threshold: 0.5 }
    )

    containerRefs.current.forEach((container) => {
      if (container) containerObserver.observe(container)
    })

    let centerObserver
    if (isMobile) {
      centerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              entry.target.classList.add('in-center')
            } else {
              entry.target.classList.remove('in-center')
            }
          })
        },
        {
          threshold: [0.5],
          rootMargin: '-10% 0px -10% 0px',
        }
      )

      document.querySelectorAll('.work-item').forEach((item) => {
        centerObserver.observe(item)
      })
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
      window.removeEventListener('resize', checkMobile)
      document.body.classList.remove('blur-active')
      containerObserver.disconnect()
      if (centerObserver) centerObserver.disconnect()
    }
  }, [isMobile, isLoaded])

  const handleSoundToggle = (e, index) => {
    e.stopPropagation()
    e.preventDefault()

    const workItem = e.currentTarget.closest('.work-item')
    const iframe = workItem?.querySelector('iframe')
    const isCurrentlyUnmuted = workItem?.classList.contains('unmuted')

    document.querySelectorAll('.work-item iframe').forEach((iFrame) => {
      iFrame.contentWindow?.postMessage({ method: 'setVolume', value: 0 }, '*')
    })
    document.querySelectorAll('.work-item').forEach((item) => item.classList.remove('unmuted'))

    if (!isCurrentlyUnmuted && iframe) {
      iframe.contentWindow?.postMessage({ method: 'setVolume', value: 1 }, '*')
      workItem?.classList.add('unmuted')
    }
  }

  const getVimeoData = (url) => {
    const idMatch = url.match(/(?:vimeo\.com\/)(\d+)/)
    const hashMatch = url.match(/\/([a-f0-9]+)(?:\?|$)/)
    return {
      id: idMatch ? idMatch[1] : null,
      hash: hashMatch ? hashMatch[1] : null
    }
  }

  const videos = [
    { src: 'https://vimeo.com/1167679730/a43599f39f?share=copy&fl=sv&fe=ci', title: 'Brand Campaign', desc: 'Creative storytelling meets brand vision', type: 'horizontal' },
    { src: 'https://vimeo.com/1167682809/d726843f75?share=copy&fl=sv&fe=ci', title: 'Social Media Content', desc: 'Viral-ready content that drives engagement', type: 'horizontal' },
    { src: 'https://vimeo.com/1167685194/a9c74513ab?share=copy&fl=sv&fe=ci', title: 'Uniqlo', desc: 'Stay cool with UNIQLO\'s Summer Collection', type: 'horizontal' },
    { src: 'https://vimeo.com/1167691944?share=copy&fl=sv&fe=ci', title: 'Music Video', desc: 'Rhythm and visuals in perfect harmony', type: 'horizontal' },
    { src: 'https://vimeo.com/1167689020/c15b90820f?share=copy&fl=sv&fe=ci', title: 'Fashion Film', desc: 'Elegance captured frame by frame', type: 'horizontal' },
    { src: 'https://vimeo.com/1167689633?share=copy&fl=sv&fe=ci', title: 'Documentary', desc: 'Authentic stories, beautifully told', type: 'horizontal' },
    { src: 'https://vimeo.com/1167684995/8a9eb1db9a?share=copy&fl=sv&fe=ci', title: 'Commercial Production', desc: 'High-impact commercials that convert', type: 'vertical' },
  ]

  if (!mounted) {
    return null
  }

  return (
    <AdsContent
      isLoaded={isLoaded}
      containerRefs={containerRefs}
      videos={videos}
      getVimeoData={getVimeoData}
      handleSoundToggle={handleSoundToggle}
    />
  )
}