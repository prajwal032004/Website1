'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import LoadingScreen from '../components/LoadingScreen'

export default function Home() {
  const heroRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isMuted, setIsMuted] = useState(true)   // bg video starts muted

  // Toggle background video sound
  const toggleBgSound = () => {
    const video = document.querySelector('.background-video')
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  useEffect(() => {
    const LOADING_SCREEN_DURATION = 3200

    const showTimer = setTimeout(() => {
      setIsLoaded(true)
      setShowContent(true)

      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({
          duration: 1000,
          once: true,
          offset: 80,
          easing: 'ease-out-cubic',
        })
        window.AOS.refresh()
      }
    }, LOADING_SCREEN_DURATION)

    // Preload images in background (non-blocking)
    const imageUrls = [
      'https://framerusercontent.com/images/W3b7GDV4XQVsSrHdhkRlv9NUU.jpg',
      'https://framerusercontent.com/images/nBAbSF2jsYWNlnzuGllEEDf3zIg.jpg',
      'https://framerusercontent.com/images/pg0d0nNtcT9BhUuLbSw3Fzr6iOE.jpeg',
      'https://framerusercontent.com/images/wsyzQwaYYJG6SEPJvyMJ3In9qMQ.jpg',
      'https://framerusercontent.com/images/Udo1gQX7crsTSWxQ2sUxyZoupI.jpg',
      'https://framerusercontent.com/images/UKGoy93tcBEGklBQdyZXhFQ.png',
    ]
    imageUrls.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    // Background blur on scroll
    const updateBlur = () => {
      const heroSection = heroRef.current
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

    // Listen for ads-page video unmute — mute bg video in response
    const handleAdsMuted = () => {
      const video = document.querySelector('.background-video')
      if (video && !video.muted) {
        video.muted = true
        setIsMuted(true)
      }
    }
    window.addEventListener('ads-video-unmuted', handleAdsMuted)

    return () => {
      clearTimeout(showTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('ads-video-unmuted', handleAdsMuted)
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
        /* ==============================
           BASE & RESET
           ============================== */
        :global(*) { box-sizing: border-box; }
        :global(body) {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #000;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        :global(body.blur-active .background-video) {
          filter: blur(15px) brightness(0.5);
          transition: filter 0.8s ease;
        }

        /* ==============================
           SKELETON LOADER
           ============================== */
        .skeleton-wrapper {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: #000;
          display: flex;
          flex-direction: column;
          transition: opacity 0.6s ease-out, visibility 0.6s;
          opacity: 1;
          visibility: visible;
          overflow: hidden;
        }
        .skeleton-wrapper.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .sk-block {
          background: #111;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }
        .sk-block::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.04) 30%,
            rgba(255,255,255,0.09) 50%,
            rgba(255,255,255,0.04) 70%,
            transparent 100%
          );
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer { to { transform: translateX(100%); } }

        .sk-hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          gap: 18px;
        }
        .sk-hero-line { height: clamp(52px, 10vw, 120px); border-radius: 14px; }
        .sk-hero-line-1 { width: min(55%, 520px); }
        .sk-hero-line-2 { width: min(35%, 320px); }

        .sk-contact {
          padding: 60px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .sk-contact-sub   { width: min(60%, 340px); height: 28px; }
        .sk-contact-email { width: min(80%, 460px); height: clamp(34px, 5vw, 64px); border-radius: 10px; }
        .sk-copy          { width: min(40%, 200px); height: 14px; margin-top: 40px; opacity: 0.5; }

        .sk-floats {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .sk-float {
          position: absolute;
          border-radius: 14px;
          background: #141414;
          animation: sk-float-pulse 3s ease-in-out infinite;
        }
        .sk-float:nth-child(1) { width: 100px; height: 100px; left: 44%;  top: 15%; animation-delay: 0s; }
        .sk-float:nth-child(2) { width: 115px; height: 115px; left: 69%;  top: 22%; animation-delay: 0.3s; }
        .sk-float:nth-child(3) { width: 130px; height: 130px; left: 14%;  top: 20%; animation-delay: 0.6s; }
        .sk-float:nth-child(4) { width: 90px;  height: 90px;  left: 44%;  top: 58%; animation-delay: 0.9s; }
        .sk-float:nth-child(5) { width: 155px; height: 155px; left: 60%;  top: 54%; animation-delay: 1.2s; }
        .sk-float:nth-child(6) { width: 108px; height: 108px; left: 25%;  top: 56%; animation-delay: 1.5s; }
        @keyframes sk-float-pulse {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50%       { opacity: 0.6;  transform: translateY(-8px); }
        }

        @media (max-width: 768px) {
          .sk-float:nth-child(1) { left: 50%; top: 5%;  transform: translateX(-50%); width: 82px;  height: 82px; }
          .sk-float:nth-child(2) { left: auto; right: 8%; top: 18%; width: 76px; height: 76px; }
          .sk-float:nth-child(3) { left: 8%; top: 20%; width: 88px; height: 88px; }
          .sk-float:nth-child(4) { left: 50%; top: 42%; transform: translateX(-50%); width: 72px; height: 72px; }
          .sk-float:nth-child(5) { left: auto; right: 10%; top: auto; bottom: 22%; width: 96px; height: 96px; }
          .sk-float:nth-child(6) { left: 10%; top: auto; bottom: 25%; width: 80px; height: 80px; }
          .sk-contact-email { height: 40px; width: 90%; }
        }

        /* ==============================
           MAIN CONTENT
           ============================== */
        .main-container {
          opacity: 0;
          transition: opacity 0.7s ease-in;
        }
        .main-container.visible { opacity: 1; }

        .contact-label-wrap,
        .contact-subtitle,
        .contact-email,
        .divider-line,
        .copyright {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .main-container.visible .contact-label-wrap { opacity: 1; transform: translateY(0); transition-delay: 0.15s; }
        .main-container.visible .contact-subtitle    { opacity: 1; transform: translateY(0); transition-delay: 0.28s; }
        .main-container.visible .contact-email       { opacity: 1; transform: translateY(0); transition-delay: 0.40s; }
        .main-container.visible .divider-line        { opacity: 1; transform: translateY(0); transition-delay: 0.52s; }
        .main-container.visible .copyright           { opacity: 1; transform: translateY(0); transition-delay: 0.62s; }

        /* ---- HERO ---- */
        .hero-section {
          position: relative;
          height: 100svh;
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
          padding: 0 24px;
        }
        .hero-title {
          font-size: clamp(64px, 13vw, 160px);
          font-weight: 700;
          line-height: 0.88;
          letter-spacing: -4px;
          color: #fff;
          margin: 0 0 20px;
          animation: fadeInUp 1.2s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ---- SCROLL HINT (bottom-left) ---- */
        .scroll-hint {
          position: absolute;
          bottom: 36px;
          left: 47%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.4s forwards;
        }
        .scroll-hint span {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
        }
        .scroll-arrow {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%   { transform: scaleY(1); opacity: 0.7; }
          50%  { transform: scaleY(0.6); opacity: 0.3; }
          100% { transform: scaleY(1); opacity: 0.7; }
        }

        /* ==============================
           SOUND TOGGLE — bottom-right of hero,
           same vertical level as scroll hint
           ============================== */
        .sound-toggle {
          position: absolute;
          bottom: 36px;
          right: 36px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.6s forwards;
        }

        .sound-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .sound-btn:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.35);
          transform: scale(1.08);
        }
        .sound-btn:active { transform: scale(0.94); }
        .sound-btn svg {
          width: 18px;
          height: 18px;
          stroke: rgba(255,255,255,0.75);
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke 0.2s ease;
        }
        .sound-btn:hover svg { stroke: #fff; }

        /* Label under button */
        .sound-label {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          font-weight: 500;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .sound-toggle:hover .sound-label { color: rgba(255,255,255,0.55); }

        /* Unmuted state — subtle glow ring */
        .sound-btn.unmuted {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 0 16px rgba(255,255,255,0.1);
        }
        .sound-btn.unmuted svg { stroke: #fff; }

        /* ---- CONTACT SECTION ---- */
        .contact-section {
          min-height: 100svh;
          background: linear-gradient(to bottom, transparent, #000);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 120px 24px 100px;
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
          box-shadow: 0 20px 60px rgba(255,255,255,0.15);
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
          pointer-events: auto;
          opacity: 0;
          will-change: transform;
        }
        .float-img:hover {
          transform: scale(1.08) !important;
          z-index: 10;
          box-shadow: 0 30px 80px rgba(255,255,255,0.28);
        }

        @keyframes floatIn {
          0%   { opacity: 0; transform: scale(0.3) translateY(-80px) rotate(-8deg); }
          60%  { opacity: 1; transform: scale(1.06) translateY(8px) rotate(1.5deg); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotate(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }

        .float-img:nth-child(1) { width: 119px; height: 119px; left: 43.6%; top: 24%;   animation: floatIn 0.9s ease-out 0.1s forwards, float 4.0s ease-in-out 1.0s infinite; }
        .float-img:nth-child(2) { width: 137px; height: 137px; left: 69.2%; top: 27.8%; animation: floatIn 0.9s ease-out 0.2s forwards, float 4.3s ease-in-out 1.1s infinite; }
        .float-img:nth-child(3) { width: 156px; height: 156px; left: 14.2%; top: 29.4%; animation: floatIn 0.9s ease-out 0.3s forwards, float 4.6s ease-in-out 1.2s infinite; }
        .float-img:nth-child(4) { width: 111px; height: 111px; left: 43.7%; top: 63.1%; animation: floatIn 0.9s ease-out 0.4s forwards, float 4.9s ease-in-out 1.3s infinite; }
        .float-img:nth-child(5) { width: 192px; height: 192px; left: 60.1%; top: 59.8%; animation: floatIn 0.9s ease-out 0.5s forwards, float 5.2s ease-in-out 1.4s infinite; }
        .float-img:nth-child(6) { width: 130px; height: 130px; left: 25.1%; top: 61.2%; animation: floatIn 0.9s ease-out 0.6s forwards, float 5.5s ease-in-out 1.5s infinite; }

        .contact-content {
          text-align: center;
          z-index: 10;
          position: relative;
          padding: 0 24px;
          max-width: 1200px;
          width: 100%;
        }
        .contact-dot {
          width: 8px;
          height: 8px;
          background: #4eff91;
          border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .contact-subtitle {
          font-size: clamp(22px, 3.8vw, 46px);
          color: rgba(255,255,255,0.55);
          margin: 0 0 20px;
          font-weight: 300;
          letter-spacing: -0.5px;
          line-height: 1.3;
        }
        .contact-email {
          font-size: clamp(28px, 5vw, 70px);
          color: #fff;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-weight: 700;
          display: inline-block;
          position: relative;
          letter-spacing: -1px;
          word-break: break-all;
          line-height: 1.15;
        }
        .contact-email:hover {
          color: #5B9BF3;
          transform: scale(1.04);
          text-shadow: 0 0 40px rgba(91,155,243,0.4);
        }
        .contact-email::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 3px;
          background: linear-gradient(90deg, #5B9BF3, #437ed1);
          transition: width 0.4s ease;
          border-radius: 2px;
        }
        .contact-email:hover::after { width: 100%; }

        .divider-line {
          width: 1px; height: 60px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent);
          margin: 40px auto;
        }
        .copyright {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
          letter-spacing: 0.5px;
          margin-top: 0;
        }
        .copyright-link { color: inherit; text-decoration: none; transition: color 0.3s; }
        .copyright-link:hover { color: rgba(255,255,255,0.65); }

        /* ==============================
           MOBILE
           ============================== */
        @media (max-width: 768px) {
          .hero-title { font-size: clamp(58px, 18vw, 100px); letter-spacing: -3px; }
          .scroll-hint { display:none; }

          .sound-toggle {
            bottom: 28px;
            right: 20px;
            gap: 8px;
          }
          .sound-btn { width: 38px; height: 38px; }
          .sound-btn svg { width: 16px; height: 16px; }
          .sound-label { font-size: 8px; letter-spacing: 2px; }

          .contact-section { padding: 100px 20px 80px; min-height: 100svh; }
          .floating-container { height: 360px; top: 28%; pointer-events: none; }
          .float-img { border-radius: 12px; transform: none !important; }

          .float-img:nth-child(1) { left: 44% !important; top: -5% !important; width: 88px !important; height: 88px !important; }
          .float-img:nth-child(2) { left: auto !important; right: 4% !important; top: 8% !important; width: 82px !important; height: 110px !important; }
          .float-img:nth-child(3) { left: 4% !important; top: 10% !important; width: 96px !important; height: 120px !important; }
          .float-img:nth-child(4) { left: 44% !important; top: 54% !important; width: 80px !important; height: 80px !important; }
          .float-img:nth-child(5) { left: auto !important; right: 4% !important; top: 56% !important; width: 108px !important; height: 130px !important; }
          .float-img:nth-child(6) { left: 4% !important; top: 58% !important; width: 90px !important; height: 118px !important; }

          .contact-content { margin-top: 260px; }
          .contact-subtitle { font-size: clamp(18px, 5.5vw, 28px); margin-bottom: 14px; }
          .contact-email { font-size: clamp(22px, 7vw, 38px); word-break: break-word; }
          .divider-line { height: 40px; margin: 28px auto; }
          .copyright { font-size: 11px; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: clamp(52px, 20vw, 80px); letter-spacing: -2px; }
          .floating-container { height: 320px; top: 22%; }
          .contact-content { margin-top: 420px; }
          .scroll-hint { left: 44%; }
          .contact-email { font-size: clamp(20px, 8vw, 32px); }
          .contact-subtitle { font-size: clamp(16px, 5vw, 22px); }

          .float-img:nth-child(1) { left: 41% !important; top: 21% !important; width: 110px !important; height: 145px !important; }
          .float-img:nth-child(2) { left: auto !important; right: 6% !important; top: 11% !important; width: 70px !important; height: 96px !important; }
          .float-img:nth-child(3) { left: 6% !important; top: 11% !important; width: 84px !important; height: 105px !important; }
          .float-img:nth-child(4) { left: 37% !important; top: 97% !important; width: 104px !important; height: 140px !important; }
          .float-img:nth-child(5) { left: auto !important; right: 6% !important; top: 84% !important; width: 94px !important; height: 121px !important; }
          .float-img:nth-child(6) { left: 6% !important; top: 83% !important; width: 102px !important; height: 115px !important; }
        }

        @media (hover: none) {
          .float-img { box-shadow: 0 12px 40px rgba(255,255,255,0.12); }
          .contact-email:hover { color: #fff; transform: none; text-shadow: none; }
          .contact-email:active { color: #5B9BF3; transform: scale(0.98); }
          .contact-email::after { display: none; }
        }
      `}</style>

      <LoadingScreen />

      {/* ========================
          SKELETON LOADER
          ======================== */}
      <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>
        <div className="sk-floats" style={{ position: 'absolute', top: '10%', bottom: '40%' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="sk-block sk-float" />
          ))}
        </div>
        <div className="sk-hero">
          <div className="sk-block sk-hero-line sk-hero-line-1" />
          <div className="sk-block sk-hero-line sk-hero-line-2" />
        </div>
        <div className="sk-contact">
          <div className="sk-block" style={{ width: '120px', height: '28px', borderRadius: '100px', opacity: 0.4 }} />
          <div className="sk-block sk-contact-sub" />
          <div className="sk-block sk-contact-email" />
          <div className="sk-block sk-copy" />
        </div>
      </div>

      {/* ========================
          REAL CONTENT
          ======================== */}
      <div className={`main-container${showContent ? ' visible' : ''}`}>

        {/* HERO */}
        <section className="hero-section" ref={heroRef}>
          <div className="hero-content">
            <h1 className="hero-title">
              <br />
            </h1>
          </div>

          {/* Scroll hint — centred */}
          <div className="scroll-hint">
            <span>Scroll</span>
            <div className="scroll-arrow" />
          </div>

          {/* ── SOUND TOGGLE — bottom-right ── */}
          <div className="sound-toggle">
            <button
              className={`sound-btn${isMuted ? '' : ' unmuted'}`}
              onClick={toggleBgSound}
              aria-label={isMuted ? 'Unmute background sound' : 'Mute background sound'}
            >
              {isMuted ? (
                /* Muted speaker */
                <svg viewBox="0 0 24 24">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                /* Speaker with waves */
                <svg viewBox="0 0 24 24">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
            <span className="sound-label">{isMuted ? 'Sound' : 'Live'}</span>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section">
          <div className="floating-container">
            <img className="float-img" src="https://framerusercontent.com/images/W3b7GDV4XQVsSrHdhkRlv9NUU.jpg" alt="Portfolio work 1" loading="lazy" />
            <img className="float-img" src="https://framerusercontent.com/images/nBAbSF2jsYWNlnzuGllEEDf3zIg.jpg" alt="Portfolio work 2" loading="lazy" />
            <img className="float-img" src="https://framerusercontent.com/images/pg0d0nNtcT9BhUuLbSw3Fzr6iOE.jpeg" alt="Portfolio work 3" loading="lazy" />
            <img className="float-img" src="https://framerusercontent.com/images/wsyzQwaYYJG6SEPJvyMJ3In9qMQ.jpg" alt="Portfolio work 4" loading="lazy" />
            <img className="float-img" src="https://framerusercontent.com/images/Udo1gQX7crsTSWxQ2sUxyZoupI.jpg" alt="Portfolio work 5" loading="lazy" />
            <img className="float-img" src="https://framerusercontent.com/images/UKGoy93tcBEGklBQdyZXhFQ.png" alt="Portfolio work 6" loading="lazy" />
          </div>

          <div className="contact-content">
            <p className="contact-subtitle">Let's have a chat</p>
            <a
              href="mailto:business@5feet4.co"
              className="contact-email"
              onClick={handleEmailClick}
            >
              business@5feet4.co
            </a>
            <div className="divider-line" />
            <p className="copyright">
              © 2026{' '}
              <Link href="/" className="copyright-link">5feet4</Link>
              . All Rights Reserved.
            </p>
          </div>
        </section>

      </div>
    </>
  )
}