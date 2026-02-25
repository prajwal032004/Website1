'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true) // Start as true to prevent hydration mismatch

  // Simulation of loading heavy assets
  useEffect(() => {
    const MIN_LOADING_TIME = 2500
    setIsLoaded(false) // Only change on client side after mount

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, MIN_LOADING_TIME)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (!isLoaded) return

    // Initialize AOS if available
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 1200,
        once: true,
        offset: 120,
        easing: 'ease-out-cubic',
      })
    }

    // Background Blur Logic
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

    // Mobile center detection for overlays
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

      document.querySelectorAll('.gallery-item').forEach((item) => {
        centerObserver.observe(item)
      })
    }

    // Scroll Listener
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
      if (centerObserver) centerObserver.disconnect()
    }
  }, [isMobile, isLoaded])

  // ✅ PERFECT URLs - Single quote is RAW (not encoded), spaces as %20
  const images = [
    {
      src: '/7.avif',
      title: 'Brand Campaign',
      desc: 'Creative storytelling meets brand vision',
      type: 'horizontal',
      width: 1920,
      height: 1080,
    },
    {
      src: '/6.png',
      title: 'Social Media Content',
      desc: 'Viral-ready content that drives engagement',
      type: 'horizontal',
      width: 1516,
      height: 975,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/31.jpg?updatedAt=1771934151003",
      title: 'Commercial Production',
      desc: 'High-impact commercials that convert',
      type: 'horizontal',
      width: 1080,
      height: 1920,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/44.png?updatedAt=1771934151122",
      title: 'Uniqlo Campaign',
      desc: "Stay cool with UNIQLO's Summer Collection",
      type: 'horizontal',
      width: 1920,
      height: 1080,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/11.png?updatedAt=1771934151106",
      title: 'Music Video',
      desc: 'Rhythm and visuals in perfect harmony',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/19.png?updatedAt=1771934151074",
      title: 'Documentary Style',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1516,
      height: 975,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/20.png?updatedAt=1771934151037",
      title: 'Fashion Film',
      desc: 'Elegance captured frame by frame',
      type: 'horizontal',
      width: 1080,
      height: 1920,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/8.png?updatedAt=1771934151092",
      title: 'Documentary',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/41.png?updatedAt=1771934151065",
      title: 'Documentary',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/34.png?updatedAt=1771934151044",
      title: 'Documentary',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/35.png?updatedAt=1771934151087",
      title: 'Documentary',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/32.png?updatedAt=1771934151041",
      title: 'Documentary',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/14.png?updatedAt=1771934151031",
      title: 'Documentary',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/23.png?updatedAt=1771934151127",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/18.png?updatedAt=1771934151112",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/40.png?updatedAt=1771934151054",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/17.png?updatedAt=1771934151007",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/28.png?updatedAt=1771934151062",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/16.png?updatedAt=1771934151046",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/39.png?updatedAt=1771934150990",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/37.png?updatedAt=1771934150984",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/13.png?updatedAt=1771934151017",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/10.png?updatedAt=1771934150979",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/43.jpg?updatedAt=1771934151023",
      title: 'new',
      desc: 'Authentic stories, beautifully told',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
  ]

  return (
    <>
      <style jsx>{`
        /* ===========================
           AESTHETIC SKELETON STYLES 
           =========================== */

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

        /* Hero Text Skeleton */
        .sk-hero-line {
          height: clamp(70px, 12vw, 160px);
          background: #111;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .sk-hero-line.top {
          width: 25%;
        }
        .sk-hero-line.bot {
          width: 20%;
        }

        @media (max-width: 768px) {
          .sk-hero-line.top {
            width: 90%;
            height: 80px;
          }
          .sk-hero-line.bot {
            width: 60%;
            height: 60px;
          }
        }

        /* Header Skeleton */
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

        /* Image Card Skeleton */
        .sk-image-card {
          background: #121212;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 30px;
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

        /* Loading Wrappers */
        .skeleton-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          transition: opacity 0.6s ease-out, visibility 0.6s;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        .skeleton-wrapper.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .content-wrapper {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.8s ease-in;
        }
        .content-wrapper.loading {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* ===========================
           MAIN STYLES
           =========================== */

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

        #gallery-section {
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

        /* ============================================
           DESKTOP GRID - 4 cols for vertical, 2 for horizontal
           ============================================ */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1600px;
          margin: 0 auto;
          auto-flow: dense;
        }

        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          background: #111;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          aspect-ratio: auto;
        }

        .gallery-item.vertical {
          grid-column: span 1;
        }

        .gallery-item.horizontal {
          grid-column: span 2;
        }

        /* Image wrapper to maintain aspect ratio */
        .gallery-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-item:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .gallery-item:hover img {
          transform: scale(1.08);
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.78),
            rgba(0, 0, 0, 0.18) 70%,
            transparent
          );
          padding: 35px 30px;
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (min-width: 769px) {
          .gallery-item:hover .gallery-overlay {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gallery-overlay h3 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
          color: #fff;
        }

        .gallery-overlay p {
          font-size: 15px;
          opacity: 0.85;
          line-height: 1.6;
          font-weight: 400;
          color: #fff;
        }

        /* Footer / Copyright Styles */
        .copyright-container {
          width: 100%;
          padding: 60px 20px;
          margin-top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 100;
        }

        .copyright {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
          letter-spacing: 0.5px;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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

        /* ============================================
           TABLET BREAKPOINT - 3 columns
           ============================================ */
        @media (max-width: 1200px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }

          .gallery-item.horizontal {
            grid-column: span 1;
          }

          .gallery-item.vertical {
            grid-column: span 1;
          }
        }

        /* ============================================
           TABLET/SMALL DEVICE - 2 columns with aspect ratios
           ============================================ */
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .gallery-item.horizontal {
            grid-column: span 1;
          }

          .gallery-item.vertical {
            grid-column: span 1;
          }
        }

        /* ============================================
           MOBILE BREAKPOINT - Optimized for all aspect ratios
           ============================================ */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 110px;
          }

          #gallery-section {
            padding: 100px 20px;
          }

          .gallery-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            auto-flow: auto;
          }

          .gallery-item.horizontal {
            grid-column: span 2;
          }

          .gallery-item.vertical {
            grid-column: span 1;
          }

          /* Responsive height calculation for mobile */
          .gallery-item {
            min-height: auto;
          }

          .gallery-item.vertical {
            aspect-ratio: 9 / 12;
          }

          .gallery-item.horizontal {
            aspect-ratio: 16 / 9;
          }

          /* Mobile overlay animation */
          .gallery-overlay {
            opacity: 0;
            transform: translateY(25px);
            transition: none;
            animation: none;
          }

          :global(.gallery-item.in-center) .gallery-overlay {
            animation: fadeInUpBottom 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .copyright-container {
            padding: 40px 20px;
          }
          .copyright {
            font-size: 12px;
            text-align: center;
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

        /* ============================================
           SMALL MOBILE - Single column with proper spacing
           ============================================ */
        @media (max-width: 480px) {
          .hero-title {
            font-size: 68px;
          }

          .section-header h2 {
            font-size: 42px;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .gallery-item.horizontal {
            grid-column: span 1;
          }

          .gallery-item.vertical {
            grid-column: span 1;
          }

          .gallery-item.vertical {
            aspect-ratio: 9 / 12;
          }

          .gallery-item.horizontal {
            aspect-ratio: 16 / 9;
          }

          .gallery-overlay {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;   
            padding: 20px 20px 5px;  
          }

          .gallery-overlay h3 {
            font-size: 13px;
          }

          .gallery-overlay p {
            font-size: 11px;
          }
        }

        /* ============================================
           EXTRA SMALL - Optimize for very small phones
           ============================================ */
        @media (max-width: 360px) {
          .gallery-grid {
            gap: 8px;
          }

          .gallery-overlay {
            padding: 20px 15px;
          }

          .gallery-overlay h3 {
            font-size: 18px;
            margin-bottom: 5px;
          }

          .gallery-overlay p {
            font-size: 12px;
          }
        }
      `}</style>

      {/* =======================
          SKELETON LOADER
          ======================= */}
      <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>
        {/* Hero Skeleton */}
        <section className="hero-section">
          <div className="skeleton-block sk-hero-line top"></div>
          <div className="skeleton-block sk-hero-line bot"></div>
        </section>

        {/* Gallery Grid Skeleton */}
        <section id="gallery-section">
          <div className="section-header">
            <div className="skeleton-block sk-header-title"></div>
            <div className="skeleton-block sk-header-p"></div>
            <div className="skeleton-block sk-header-p" style={{ width: '400px' }}></div>
          </div>

          <div className="gallery-grid">
            {/* Desktop view skeletons */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton-block sk-image-card">
                <div className="skeleton-block sk-overlay-title"></div>
                <div className="skeleton-block sk-overlay-desc"></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* =======================
          REAL CONTENT
          ======================= */}
      <div className={`content-wrapper ${isLoaded ? 'loaded' : 'loading'}`}>
        <section className="hero-section">
          <div className="hero-content" data-aos="fade-up">
            <h1 className="hero-title">
              Prints & <br />
              banners
            </h1>
          </div>
        </section>

        <section id="gallery-section">
          <div className="section-header" data-aos="fade-up">
            <h2>Our Work</h2>
            <p>Crafting visual stories that captivate, engage, and inspire audiences worldwide</p>
          </div>

          <div className="gallery-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className={`gallery-item ${image.type}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="gallery-image-wrapper">
                  <Image
                    src={image.src}
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    priority={index < 2}
                    quality={100}
                    unoptimized
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                <div className="gallery-overlay">
                  <h3>{image.title}</h3>
                  <p>{image.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer / Copyright Section */}
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