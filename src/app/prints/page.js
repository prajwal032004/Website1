'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false)
  // FIX 1: Initialize isLoaded as false to match server render (skeleton shown by default)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const MIN_LOADING_TIME = 2500
    const timer = setTimeout(() => setIsLoaded(true), MIN_LOADING_TIME)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (!isLoaded) return

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
        { threshold: [0.5], rootMargin: '-10% 0px -10% 0px' }
      )
      document.querySelectorAll('.gallery-item').forEach((item) => centerObserver.observe(item))
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { updateBlur(); ticking = false })
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
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/28.png?updatedAt=1771934151062",
      title: 'APPLE HELLO',
      desc: 'Iconic innovation. Seamless experiences.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/29.png?updatedAt=1771934151067",
      title: 'APPLE MUSIC',
      desc: 'Sound elevated. Emotion amplified.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(6).png?updatedAt=1771934151129",
      title: 'DAILY OBJECTS',
      desc: 'Minimal essentials for modern living.',
      type: 'center',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/41.png?updatedAt=1771934151065",
      title: 'SWAROVSKI',
      desc: 'Timeless crystal elegance redefined.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/40.png?updatedAt=1771934151054",
      title: 'SWAROVSKI',
      desc: 'Luxury crafted with radiant precision.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/39.png?updatedAt=1771934150990",
      title: 'SWAROVSKI',
      desc: 'Sparkle that defines sophistication.',
      type: 'center',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/34.png?updatedAt=1771934151044",
      title: 'MASSIMO DUTTI',
      desc: 'Timeless fashion. Understated elegance.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/35.png?updatedAt=1771934151087",
      title: 'MASSIMO DUTTI',
      desc: 'Refined tailoring for modern sophistication.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(8).png?updatedAt=1771934151124",
      title: 'MASSIMO DUTTI',
      desc: 'Timeless fashion. Understated elegance.',
      type: 'center',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/31.jpg?updatedAt=1771934151003",
      title: 'PUMA',
      desc: 'Sport meets culture. Performance redefined.',
      type: 'horizontal',
      width: 1080,
      height: 1920,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/32.png?updatedAt=1771934151041",
      title: 'PUMA',
      desc: 'Bold energy. Street-inspired attitude.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(7).png?updatedAt=1771934151138",
      title: 'PUMA',
      desc: 'Sport meets culture. Performance redefined.',
      type: 'center',
      width: 1080,
      height: 1920,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/11.png?updatedAt=1771934151106",
      title: 'DYSON',
      desc: 'Powerful performance. Precision engineered.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/10.png?updatedAt=1771934150979",
      title: 'DYSON',
      desc: 'Technology crafted for tomorrow.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(1).png?updatedAt=1771934151081",
      title: 'DYSON',
      desc: 'Engineering brilliance meets sleek design.',
      type: 'center',
      width: 1516,
      height: 975,
    },
    {
      src: '/7.avif',
      title: 'OAKLEY | META',
      desc: 'Performance eyewear meets smart innovation.',
      type: 'horizontal',
      width: 1920,
      height: 1080,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/8.png?updatedAt=1771934151092",
      title: 'OAKLEY | META',
      desc: 'Future-ready vision. Intelligent design.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup.png?updatedAt=1771934151049",
      title: 'OAKLEY | META',
      desc: 'Cravings satisfied at lightning speed.',
      type: 'center',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/23.png?updatedAt=1771934151127",
      title: 'PS5',
      desc: 'Next-level gaming. Immersive power.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/22.jpg?updatedAt=1771934150974",
      title: 'PS5',
      desc: 'Next-level gaming. Immersive power.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(3).png?updatedAt=1771934151077",
      title: 'PS5',
      desc: 'Next-level gaming. Immersive power.',
      type: 'center',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/13.png?updatedAt=1771934151017",
      title: 'APPLE',
      desc: 'Design-forward accessories with purpose.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/14.png?updatedAt=1771934151031",
      title: 'APPLE',
      desc: 'Electric future. Boldly reimagined.',
      type: 'horizontal',
      width: 1516,
      height: 975,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(11).png?updatedAt=1771934151084",
      title: 'APPLE',
      desc: 'Performance meets sustainable innovation.',
      type: 'center',
      width: 1080,
      height: 1920,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/44.png?updatedAt=1771934151122",
      title: 'SWIGGY',
      desc: 'Fast delivery. Flavor delivered fresh.',
      type: 'horizontal',
      width: 1920,
      height: 1080,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/43.jpg?updatedAt=1771934151023",
      title: 'SWIGGY',
      desc: 'Cravings satisfied at lightning speed.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/25.jpg?updatedAt=1771934150955",
      title: 'RAYMOND',
      desc: 'Redefining mobility with intelligence.',
      type: 'center',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(4).png?updatedAt=1771934151051",
      title: 'RAYMOND',
      desc: 'Driven by innovation and power.',
      type: 'center',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(10).png?updatedAt=1771934151145",
      title: 'RAYMOND',
      desc: 'Next-gen SUV. Electrified presence.',
      type: 'center',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/18.png?updatedAt=1771934151112",
      title: 'MAHINDRA BE6',
      desc: 'Redefining mobility with intelligence.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/17.png?updatedAt=1771934151007",
      title: 'MAHINDRA BE6',
      desc: 'Driven by innovation and power.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/19.png?updatedAt=1771934151074",
      title: 'MAHINDRA BE6',
      desc: 'Next-gen SUV. Electrified presence.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/20.png?updatedAt=1771934151037",
      title: 'MAHINDRA BE6',
      desc: 'Driven by innovation and power.',
      type: 'horizontal',
      width: 1440,
      height: 1800,
    },
    {
      src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/16.png?updatedAt=1771934151046",
      title: 'MAHINDRA BE6',
      desc: 'Next-gen SUV. Electrified presence.',
      type: 'center',
      width: 1440,
      height: 1800,
    },
  ]

  return (
    <>
      <style jsx>{`

        /* ============================================
           SKELETON KEYFRAMES
           ============================================ */
        @keyframes skPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes skShine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* ============================================
           SKELETON WRAPPER — covers full viewport
           ============================================ */
        .skeleton-wrapper {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow-y: auto;
          background: #000;
          transition: opacity 0.7s ease-out, visibility 0.7s;
          opacity: 1;
          visibility: visible;
        }
        .skeleton-wrapper.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* ============================================
           SKELETON HERO
           ============================================ */
        .sk-hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 40px;
        }
        .sk-hero-line {
          border-radius: 14px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
          animation: skPulse 2.2s ease-in-out infinite;
        }
        .sk-hero-line::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 25%,
            rgba(255,255,255,0.06) 50%,
            transparent 75%
          );
          animation: skShine 2.6s ease-in-out infinite;
        }
        .sk-hero-line.title {
          width: clamp(280px, 38vw, 620px);
          height: clamp(70px, 12vw, 155px);
        }
        .sk-hero-line.sub {
          width: clamp(160px, 22vw, 360px);
          height: clamp(50px, 8vw, 110px);
          animation-delay: 0.35s;
        }

        /* ============================================
           SKELETON GALLERY SECTION
           ============================================ */
        .sk-gallery-section {
          padding: 120px 40px;
        }

        .sk-section-header {
          text-align: center;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .sk-heading {
          width: clamp(160px, 20vw, 280px);
          height: clamp(48px, 6vw, 72px);
          border-radius: 10px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.06);
          animation: skPulse 2.2s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }
        .sk-heading::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.06) 50%, transparent 75%);
          animation: skShine 2.6s ease-in-out infinite;
        }
        .sk-subtext {
          width: clamp(260px, 50vw, 700px);
          height: 22px;
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.04);
          animation: skPulse 2.2s ease-in-out infinite 0.2s;
          max-width: 90vw;
        }
        .sk-subtext.short {
          width: clamp(160px, 28vw, 420px);
          animation-delay: 0.45s;
        }

        /* ============================================
           SKELETON GRID
           ============================================ */
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .sk-card {
          border-radius: 16px;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          position: relative;
          overflow: hidden;
          animation: skPulse 2.2s ease-in-out infinite;
        }
        .sk-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255,255,255,0.05) 50%,
            transparent 80%
          );
          animation: skShine 3s ease-in-out infinite;
        }

        .sk-card-bars {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 2;
        }
        .sk-bar {
          border-radius: 5px;
          background: rgba(255,255,255,0.07);
        }
        .sk-bar.title-bar { height: 20px; width: 52%; }
        .sk-bar.desc-bar  { height: 13px; width: 76%; }

        .sk-card.horizontal {
          grid-column: span 2;
          aspect-ratio: 4 / 5;
        }
        .sk-card.vertical {
          grid-column: span 1;
          aspect-ratio: 9 / 12;
        }

        /* FIX 3: Center skeleton — same gap behavior as real grid items */
        .sk-center-row {
          grid-column: 1 / -1;
          display: flex;
          justify-content: center;
          align-items: center;
          /* No extra padding/margin — gap from the grid handles spacing uniformly */
        }
        .sk-center-card {
          width: 50%;
          aspect-ratio: 4 / 5;
          border-radius: 16px;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          position: relative;
          overflow: hidden;
          animation: skPulse 2.2s ease-in-out infinite;
        }
        .sk-center-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.05) 50%, transparent 80%);
          animation: skShine 3s ease-in-out infinite;
        }

        /* ============================================
           MAIN PAGE STYLES
           ============================================ */

        :global(body.blur-active .background-video) {
          filter: blur(15px) brightness(0.7);
        }
        :global(body.blur-active .video-overlay) {
          background: rgba(0,0,0,0.7);
        }

        .background-video {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: -1;
          transition: filter 0.5s ease;
        }
        .video-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
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
          text-transform: uppercase;
          color: #fff;
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
           REAL GALLERY GRID
           FIX 3: Uniform gap — all item types use the same gap value.
           Center items sit inside the grid flow, no extra margins.
           ============================================ */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          background: #111;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .gallery-item.vertical   { grid-column: span 1; }
        .gallery-item.horizontal { grid-column: span 2; }

        .gallery-image-wrapper {
          position: relative;
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-item:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.6);
        }
        .gallery-item img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gallery-item:hover img { transform: scale(1.08); }

        .gallery-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.18) 70%, transparent);
          padding: 35px 30px;
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
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

        /* CENTER type — full grid row, card centered at 50% width.
           The grid gap naturally separates it from adjacent rows. */
        .gallery-item.center {
          grid-column: 1 / -1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          box-shadow: none;
          border-radius: 0;
          overflow: visible;
        }
        .gallery-item.center .center-inner {
          position: relative;
          width: 50%;
          border-radius: 16px;
          overflow: hidden;
          background: #111;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gallery-item.center:hover .center-inner {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.6);
        }
        .gallery-item.center .center-inner img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          display: block;
        }
        .gallery-item.center:hover .center-inner img { transform: scale(1.08); }
        .gallery-item.center:hover { transform: none; box-shadow: none; }
        .gallery-item.center:hover > img { transform: none; }

        @media (min-width: 769px) {
          .gallery-item:hover .gallery-overlay { opacity: 1; transform: translateY(0); }
          .gallery-item.center:hover .center-inner .gallery-overlay { opacity: 1; transform: translateY(0); }
        }

        /* Footer */
        .copyright-container {
          width: 100%;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 28px;
          position: relative;
          z-index: 100;
        }

        /* Instagram button */
        .instagram-link {
          display: inline-flex;
          align-items: center;
          gap: 0px;
          text-decoration: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px;
          padding: 12px 18px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
          max-width: 52px;
          cursor: pointer;
          color: #fff;
        }
        .instagram-link:hover {
          max-width: 220px;
          gap: 10px;
          background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
          border-color: transparent;
          padding: 12px 22px;
          box-shadow: 0 8px 32px rgba(253, 29, 29, 0.35);
        }
        .instagram-icon {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .instagram-link:hover .instagram-icon {
          transform: rotate(-10deg) scale(1.1);
        }
        .instagram-text {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.5px;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
          overflow: hidden;
          max-width: 0;
        }
        .instagram-link:hover .instagram-text {
          opacity: 1;
          transform: translateX(0);
          max-width: 160px;
        }

        .copyright {
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
          letter-spacing: 0.5px;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .copyright-link,
        .copyright-link:visited,
        .copyright-link:active {
          color: #fff;
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
          width: 0; height: 1px;
          bottom: -2px; left: 0;
          background-color: #fff;
          transition: width 0.3s ease;
        }
        .copyright-link:hover::after { width: 100%; }
        .copyright-link:hover { opacity: 0.8; transform: translateY(-1px); }

        /* ============================================
           TABLET — 3 columns
           ============================================ */
        @media (max-width: 1200px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }
          .sk-grid      { grid-template-columns: repeat(3, 1fr); gap: 18px; }
          .gallery-item.horizontal { grid-column: span 1; }
          .gallery-item.vertical   { grid-column: span 1; }
          .gallery-item.center     { grid-column: 1 / -1; }
          .gallery-item.center .center-inner { width: 55%; }
          .sk-card.horizontal { grid-column: span 1; }
          .sk-center-card { width: 55%; }
        }

        /* ============================================
           TABLET SMALL — 2 columns
           ============================================ */
        @media (max-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .sk-grid      { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .gallery-item.horizontal { grid-column: span 1; }
          .gallery-item.vertical   { grid-column: span 1; }
          .gallery-item.center     { grid-column: 1 / -1; }
          .gallery-item.center .center-inner { width: 60%; }
          .sk-card.horizontal { grid-column: span 1; }
          .sk-center-card { width: 60%; }
        }

        /* ============================================
           MOBILE — 2-col, center full width
           ============================================ */
        @media (max-width: 768px) {
          /* Keep mix-blend-mode: difference working on mobile — add a subtle
             radial glow behind the hero so the blend has contrast to invert against */
          .hero-section::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse 85% 55% at 50% 50%, rgba(255,255,255,0.22) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1;
          }
          .hero-title { font-size: 110px; }

          #gallery-section    { padding: 100px 20px; }
          .sk-gallery-section { padding: 100px 20px; }

          /* FIX 3: Same gap (12px) for all item types on mobile */
          .gallery-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .sk-grid      { grid-template-columns: 1fr 1fr; gap: 12px; }

          .gallery-item.horizontal { grid-column: span 2; aspect-ratio: 16 / 9; }
          .gallery-item.vertical   { grid-column: span 1; aspect-ratio: 9 / 12; }

          /* Center becomes a normal full-width card — same gap applies automatically */
          .gallery-item.center {
            grid-column: span 2;
            display: block;
            background: #111;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border-radius: 16px;
            overflow: hidden;
            aspect-ratio: 16 / 9;
            position: relative;
          }
          .gallery-item.center:hover { transform: none; box-shadow: none; }
          .gallery-item.center .center-inner {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border-radius: 0;
            box-shadow: none;
            background: transparent;
            transform: none !important;
          }

          .sk-card.horizontal { grid-column: span 2; aspect-ratio: 16 / 9; }
          .sk-card.vertical   { grid-column: span 1; aspect-ratio: 9 / 12; }

          /* FIX 3: sk-center-row on mobile is a plain grid card — same gap */
          .sk-center-row {
            grid-column: span 2;
            display: block;
            border-radius: 16px;
            overflow: hidden;
            aspect-ratio: 16 / 9;
            background: rgba(10,10,10,0.85);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.07);
            animation: skPulse 2.2s ease-in-out infinite;
            position: relative;
          }
          .sk-center-row::after {
            display: block;
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.05) 50%, transparent 80%);
            animation: skShine 3s ease-in-out infinite;
          }
          .sk-center-card {
            width: 100%;
            aspect-ratio: unset;
            height: 100%;
            border-radius: 0;
            border: none;
            background: transparent;
            animation: none;
          }
          .sk-center-card::after { display: none; }

          .gallery-overlay {
            opacity: 0;
            transform: translateY(25px);
            transition: none;
            animation: none;
          }
          :global(.gallery-item.in-center) .gallery-overlay {
            animation: fadeInUpMobile 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          :global(.gallery-item.center.in-center) .center-inner .gallery-overlay {
            animation: fadeInUpMobile 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          @keyframes fadeInUpMobile {
            from { opacity: 0; transform: translateY(25px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .copyright-container { padding: 40px 20px; gap: 20px; }
          .copyright { font-size: 12px; text-align: center; }
          .sk-hero { padding: 20px; }
        }

        /* ============================================
           SMALL MOBILE — single column
           ============================================ */
        @media (max-width: 480px) {
          .hero-title { font-size: 68px; }
          .section-header h2 { font-size: 42px; }

          .gallery-grid { grid-template-columns: 1fr; gap: 10px; }
          .sk-grid      { grid-template-columns: 1fr; gap: 10px; }

          /* FIX 3: All types collapse to single column with same gap */
          .gallery-item.horizontal,
          .gallery-item.vertical,
          .gallery-item.center { grid-column: span 1; }
          .gallery-item.vertical   { aspect-ratio: 9 / 12; }
          .gallery-item.horizontal,
          .gallery-item.center     { aspect-ratio: 16 / 9; }

          .sk-card.horizontal,
          .sk-card.vertical { grid-column: span 1; }
          .sk-center-row { grid-column: span 1; }

          .gallery-overlay {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px 20px 5px;
          }
          .gallery-overlay h3 { font-size: 13px; }
          .gallery-overlay p  { font-size: 11px; }
        }

        @media (max-width: 360px) {
          .gallery-grid { gap: 8px; }
          .sk-grid      { gap: 8px; }
          .gallery-overlay { padding: 20px 15px; }
          .gallery-overlay h3 { font-size: 18px; margin-bottom: 5px; }
          .gallery-overlay p  { font-size: 12px; }
        }
      `}</style>

      {/* SKELETON LOADER */}
      <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>
        <div className="sk-hero">
          <div className="sk-hero-line title" />
          <div className="sk-hero-line sub" />
        </div>

        <div className="sk-gallery-section">
          <div className="sk-section-header">
            <div className="sk-heading" />
            <div className="sk-subtext" />
            <div className="sk-subtext short" />
          </div>

          <div className="sk-grid">
            {images.map((img, i) => {
              if (img.type === 'center') {
                return (
                  <div key={i} className="sk-center-row" style={{ animationDelay: `${(i % 5) * 0.15}s` }}>
                    <div className="sk-center-card">
                      <div className="sk-card-bars">
                        <div className="sk-bar title-bar" />
                        <div className="sk-bar desc-bar" />
                      </div>
                    </div>
                  </div>
                )
              }
              return (
                <div
                  key={i}
                  className={`sk-card ${img.type}`}
                  style={{ animationDelay: `${(i % 5) * 0.15}s` }}
                >
                  <div className="sk-card-bars">
                    <div className="sk-bar title-bar" />
                    <div className="sk-bar desc-bar" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* REAL CONTENT */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Prints & <br />
            banners
          </h1>
        </div>
      </section>

      <section id="gallery-section">
        <div className="section-header">
          <h2>Our Work</h2>
          <p>Crafting visual stories that captivate, engage, and inspire audiences worldwide</p>
        </div>

        <div className="gallery-grid">
          {images.map((image, index) => {
            if (image.type === 'center') {
              return (
                <div key={index} className="gallery-item center">
                  <div className="center-inner">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={image.width}
                      height={image.height}
                      priority
                      quality={100}
                      unoptimized
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="gallery-overlay">
                      <h3>{image.title}</h3>
                      <p>{image.desc}</p>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div key={index} className={`gallery-item ${image.type}`}>
                <div className="gallery-image-wrapper">
                  <Image
                    src={image.src}
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    priority
                    quality={100}
                    unoptimized
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="gallery-overlay">
                  <h3>{image.title}</h3>
                  <p>{image.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="copyright-container">
        <a
          href="https://www.instagram.com/5feet4.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
          aria-label="Follow us on Instagram"
        >
          {/* Instagram SVG icon */}
          <svg className="instagram-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
          </svg>
          <span className="instagram-text">Instagram</span>
        </a>
        <p className="copyright">
          © 2026{' '}
          <Link href="/" className="copyright-link">
            5feet4
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </>
  )
}