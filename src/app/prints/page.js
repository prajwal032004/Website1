'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    const MIN_LOADING_TIME = 2500
    setIsLoaded(false)

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

  // Build skeleton items mirroring the real grid exactly
  // All images are 'horizontal' (span 2 cols on desktop 4-col grid)
  // On desktop: 4 cols → horizontal = span 2 → 2 cards per row
  // On tablet 1200px: 3 cols → horizontal = span 1
  // On mobile 768px: horizontal = span 2 (full width)
  const skeletonItems = images.map((img, i) => ({
    type: img.type, // all 'horizontal'
    index: i,
  }))

  return (
    <>
      <style jsx>{`
        /* ===========================
           SKELETON SHIMMER ENGINE
           =========================== */

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        @keyframes noiseDrift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        /* Base skeleton block with shimmer */
        .sk {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          background: #0d0d0d;
        }

        .sk::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 30% 50%,
            rgba(255,255,255,0.03) 0%,
            transparent 70%
          );
          animation: pulseGlow 3s ease-in-out infinite;
          z-index: 1;
        }

        .sk::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255, 255, 255, 0.025) 45%,
            rgba(255, 255, 255, 0.06) 50%,
            rgba(255, 255, 255, 0.025) 55%,
            transparent 70%
          );
          animation: shimmer 2.8s ease-in-out infinite;
          z-index: 2;
        }

        /* Staggered shimmer delays per card */
        .sk-card:nth-child(1) .sk::after { animation-delay: 0s; }
        .sk-card:nth-child(2) .sk::after { animation-delay: 0.15s; }
        .sk-card:nth-child(3) .sk::after { animation-delay: 0.3s; }
        .sk-card:nth-child(4) .sk::after { animation-delay: 0.45s; }
        .sk-card:nth-child(5) .sk::after { animation-delay: 0.6s; }
        .sk-card:nth-child(6) .sk::after { animation-delay: 0.75s; }
        .sk-card:nth-child(7) .sk::after { animation-delay: 0.9s; }
        .sk-card:nth-child(8) .sk::after { animation-delay: 1.05s; }
        .sk-card:nth-child(9) .sk::after { animation-delay: 1.2s; }
        .sk-card:nth-child(10) .sk::after { animation-delay: 1.35s; }
        .sk-card:nth-child(11) .sk::after { animation-delay: 1.5s; }
        .sk-card:nth-child(12) .sk::after { animation-delay: 1.65s; }

        /* Hero skeleton */
        .sk-hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 20px;
          background: #080808;
        }

        .sk-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%);
          pointer-events: none;
        }

        .sk-hero-line-1 {
          width: clamp(280px, 30vw, 520px);
          height: clamp(70px, 12vw, 160px);
          border-radius: 16px;
          background: linear-gradient(135deg, #111 0%, #161616 50%, #111 100%);
          position: relative;
          overflow: hidden;
        }

        .sk-hero-line-2 {
          width: clamp(200px, 22vw, 380px);
          height: clamp(70px, 12vw, 160px);
          border-radius: 16px;
          background: linear-gradient(135deg, #0e0e0e 0%, #141414 50%, #0e0e0e 100%);
          position: relative;
          overflow: hidden;
          margin-left: clamp(-20px, -3vw, -60px);
          align-self: flex-start;
          margin-left: auto;
          margin-right: auto;
        }

        /* Section header skeleton */
        .sk-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .sk-header-title {
          width: clamp(140px, 15vw, 220px);
          height: clamp(48px, 7vw, 80px);
          border-radius: 10px;
          background: #111;
          margin: 0 auto 28px;
          position: relative;
          overflow: hidden;
        }

        .sk-header-p1 {
          width: clamp(280px, 50vw, 600px);
          height: 22px;
          border-radius: 4px;
          background: #0f0f0f;
          margin: 0 auto 12px;
          position: relative;
          overflow: hidden;
        }

        .sk-header-p2 {
          width: clamp(180px, 30vw, 380px);
          height: 22px;
          border-radius: 4px;
          background: #0e0e0e;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        /* ==============================
           SKELETON CARD — mirrors real gallery-item
           ============================== */
        .sk-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #0c0c0c;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.02),
            0 10px 30px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.03);
        }

        /* Match real card type classes */
        .sk-card.horizontal {
          grid-column: span 2;
        }

        .sk-card.vertical {
          grid-column: span 1;
        }

        /* The dark image area */
        .sk-card-image {
          width: 100%;
          aspect-ratio: 16 / 9;
          background:
            linear-gradient(
              160deg,
              #0f0f0f 0%,
              #111 40%,
              #0d0d0d 60%,
              #0f0f0f 100%
            );
          position: relative;
          overflow: hidden;
        }

        /* Subtle vignette on image area */
        .sk-card-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.015) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.01) 0%, transparent 50%);
          z-index: 1;
          animation: pulseGlow 4s ease-in-out infinite alternate;
        }

        /* Shimmer on image area */
        .sk-card-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            105deg,
            transparent 25%,
            rgba(255,255,255,0.018) 40%,
            rgba(255,255,255,0.055) 50%,
            rgba(255,255,255,0.018) 60%,
            transparent 75%
          );
          animation: shimmer 2.8s ease-in-out infinite;
          z-index: 2;
        }

        /* Overlay bar at bottom of card */
        .sk-card-overlay {
          padding: 22px 26px 26px;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.55) 0%,
            transparent 100%
          );
          position: relative;
          z-index: 3;
        }

        .sk-card-title {
          width: 42%;
          height: 20px;
          border-radius: 3px;
          background: rgba(255,255,255,0.055);
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
        }

        .sk-card-desc {
          width: 68%;
          height: 14px;
          border-radius: 3px;
          background: rgba(255,255,255,0.035);
          position: relative;
          overflow: hidden;
        }

        /* Shimmer on text bars */
        .sk-card-title::after,
        .sk-card-desc::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent 20%,
            rgba(255,255,255,0.07) 50%,
            transparent 80%
          );
          animation: shimmer 2.8s ease-in-out infinite;
        }

        /* Stagger delays on image areas per card index */
        .sk-card:nth-child(even) .sk-card-image::after { animation-delay: 0.4s; }
        .sk-card:nth-child(3n) .sk-card-image::after { animation-delay: 0.8s; }
        .sk-card:nth-child(4n) .sk-card-image::after { animation-delay: 1.2s; }
        .sk-card:nth-child(5n) .sk-card-image::after { animation-delay: 1.6s; }
        .sk-card:nth-child(6n) .sk-card-image::after { animation-delay: 2s; }

        /* Loading wrappers */
        .skeleton-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          transition: opacity 0.7s ease-out, visibility 0.7s;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          background: #080808;
          min-height: 100vh;
        }

        .skeleton-wrapper.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .content-wrapper {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.9s ease-in 0.1s;
        }

        .content-wrapper.loading {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* ===========================
           MAIN STYLES (unchanged)
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
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
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

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1600px;
          margin: 0 auto;
          grid-auto-flow: dense;
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
            rgba(0, 0, 0, 0.21) 70%,
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

        /* ============ SKELETON RESPONSIVE ============ */

        /* Skeleton grid mirrors exact same breakpoints as real grid */
        .sk-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1600px;
          margin: 0 auto;
          grid-auto-flow: dense;
        }

        .sk-gallery-grid .sk-card.horizontal {
          grid-column: span 2;
        }

        .sk-gallery-grid .sk-card.vertical {
          grid-column: span 1;
        }

        /* Skeleton section padding mirrors real section */
        .sk-gallery-section {
          padding: 120px 40px;
        }

        @media (max-width: 1200px) {
          .sk-gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
          .sk-gallery-grid .sk-card.horizontal {
            grid-column: span 1;
          }
          .sk-gallery-grid .sk-card.vertical {
            grid-column: span 1;
          }
        }

        @media (max-width: 1024px) {
          .sk-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .sk-gallery-grid .sk-card.horizontal {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .sk-gallery-section {
            padding: 100px 20px;
          }
          .sk-gallery-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .sk-gallery-grid .sk-card.horizontal {
            grid-column: span 2;
          }
          .sk-card-image {
            aspect-ratio: 16 / 9;
          }
          .sk-hero-line-1,
          .sk-hero-line-2 {
            width: 85%;
            height: 80px;
            margin-left: auto;
            margin-right: auto;
          }
          .sk-hero-line-2 {
            width: 60%;
            height: 65px;
          }
        }

        @media (max-width: 480px) {
          .sk-gallery-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .sk-gallery-grid .sk-card.horizontal {
            grid-column: span 1;
          }
          .sk-card-image {
            aspect-ratio: 16 / 9;
          }
        }

        /* ============ REAL GRID RESPONSIVE ============ */

        @media (max-width: 1200px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
          .gallery-item.horizontal { grid-column: span 1; }
          .gallery-item.vertical { grid-column: span 1; }
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .gallery-item.horizontal { grid-column: span 1; }
          .gallery-item.vertical { grid-column: span 1; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 110px; }

          #gallery-section { padding: 100px 20px; }

          .gallery-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            grid-auto-flow: auto;
          }

          .gallery-item.horizontal { grid-column: span 2; }
          .gallery-item.vertical { grid-column: span 1; }

          .gallery-item {
            min-height: auto;
          }
          .gallery-item.vertical { aspect-ratio: 9 / 12; }
          .gallery-item.horizontal { aspect-ratio: 16 / 9; }

          .gallery-overlay {
            opacity: 0;
            transform: translateY(25px);
            transition: none;
            animation: none;
          }

          :global(.gallery-item.in-center) .gallery-overlay {
            animation: fadeInUpBottom 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .copyright-container { padding: 40px 20px; }
          .copyright { font-size: 12px; text-align: center; }

          @keyframes fadeInUpBottom {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 68px; }
          .section-header h2 { font-size: 42px; }

          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .gallery-item.horizontal { grid-column: span 1; }
          .gallery-item.vertical { grid-column: span 1; }
          .gallery-item.vertical { aspect-ratio: 9 / 12; }
          .gallery-item.horizontal { aspect-ratio: 16 / 9; }

          .gallery-overlay {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px 20px 5px;
          }
          .gallery-overlay h3 { font-size: 13px; }
          .gallery-overlay p { font-size: 11px; }
        }

        @media (max-width: 360px) {
          .gallery-grid { gap: 8px; }
          .gallery-overlay { padding: 20px 15px; }
          .gallery-overlay h3 { font-size: 18px; margin-bottom: 5px; }
          .gallery-overlay p { font-size: 12px; }
        }
      `}</style>

      {/* =======================
          SKELETON LOADER
          ======================= */}
      <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>

        {/* Hero Skeleton */}
        <div className="sk-hero">
          <div className="sk-hero-bg" />
          <div className="sk sk-hero-line-1" />
          <div className="sk sk-hero-line-2" />
        </div>

        {/* Gallery Skeleton */}
        <div className="sk-gallery-section">
          {/* Section header */}
          <div className="sk-header">
            <div className="sk sk-header-title" />
            <div className="sk sk-header-p1" />
            <div className="sk sk-header-p2" />
          </div>

          {/* Grid — exact same structure as real gallery */}
          <div className="sk-gallery-grid">
            {skeletonItems.map((item, i) => (
              <div key={i} className={`sk-card ${item.type}`}>
                {/* Image area */}
                <div className="sk-card-image" />
                {/* Overlay text area */}
                <div className="sk-card-overlay">
                  <div className="sk-card-title" />
                  <div className="sk-card-desc" />
                </div>
              </div>
            ))}
          </div>
        </div>
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