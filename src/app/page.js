'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const heroRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [phase, setPhase] = useState('loading') // 'loading' | 'exiting' | 'visible'

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exiting'), 3500)
    const t2 = setTimeout(() => setPhase('visible'), 4400)

    const updateBlur = () => {
      const hero = heroRef.current
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      if (rect.bottom < window.innerHeight * 0.2) {
        document.body.classList.add('blur-active')
      } else {
        document.body.classList.remove('blur-active')
      }
    }
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateBlur(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateBlur()

    const handleAdsMuted = async () => {
      const player = window.__vimeoPlayer
      if (!player) return
      try { await player.setMuted(true); setIsMuted(true) } catch (_) { }
    }
    window.addEventListener('ads-video-unmuted', handleAdsMuted)

    return () => {
      clearTimeout(t1); clearTimeout(t2)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('ads-video-unmuted', handleAdsMuted)
      document.body.classList.remove('blur-active')
    }
  }, [])

  const toggleBgSound = async () => {
    const player = window.__vimeoPlayer
    if (!player) return
    try {
      const muted = await player.getMuted()
      if (muted) {
        await player.setMuted(false)
        await player.setVolume(1)
        setIsMuted(false)
      } else {
        await player.setMuted(true)
        setIsMuted(true)
      }
    } catch (err) {
      console.error('Vimeo sound toggle error:', err)
    }
  }

  const handleEmailClick = (e) => {
    e.preventDefault()
    const email = 'business@5feet4.co'
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) {
      window.location.href = `mailto:${email}`
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      <style jsx>{`
        :global(*) { box-sizing: border-box; }
        :global(html) { scroll-behavior: smooth; }
        :global(body) {
          margin: 0; padding: 0;
          overflow-x: hidden;
          background: #000;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        :global(body.blur-active .background-video) {
          filter: blur(15px) brightness(0.5);
          transition: filter 0.8s ease;
        }

        /* ── LOADING ── */
        .loading-screen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          overflow: hidden;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          transition: none;
        }
        .loading-screen.exiting {
          opacity: 0;
          transform: translateY(-100%);
          pointer-events: none;
          transition:
            opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .loading-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ── MAIN ── */
        .main-container {
          opacity: 0;
          transition: opacity 0.9s ease-in;
        }
        .main-container.visible { opacity: 1; }

        /* ── HERO ── */
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

        /* scroll hint */
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
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%,100% { transform: scaleY(1); opacity: 0.7; }
          50%      { transform: scaleY(0.6); opacity: 0.3; }
        }

        /* sound toggle */
        .sound-toggle {
          position: absolute;
          bottom: 36px; right: 36px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.6s forwards;
        }
        .sound-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .sound-btn:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.35); transform: scale(1.08); }
        .sound-btn:active { transform: scale(0.94); }
        .sound-btn svg {
          width: 18px; height: 18px;
          stroke: rgba(255,255,255,0.75); fill: none;
          stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
          transition: stroke 0.2s;
        }
        .sound-btn:hover svg { stroke: #fff; }
        .sound-label {
          font-size: 9px; letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          font-weight: 500; white-space: nowrap;
        }
        .sound-toggle:hover .sound-label { color: rgba(255,255,255,0.55); }
        .sound-btn.unmuted {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 0 16px rgba(255,255,255,0.1);
        }
        .sound-btn.unmuted svg { stroke: #fff; }

        /* ── CONTACT SECTION ── */
        .contact-section {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 24px;
          overflow: hidden;
        }

        /* soft ambient glow */
        .contact-section::before {
          content: '';
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(91,155,243,0.06) 0%, transparent 68%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .contact-content {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 1000px;
          width: 100%;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s ease-out 0.15s, transform 0.9s ease-out 0.15s;
        }
        .main-container.visible .contact-content { opacity: 1; transform: translateY(0); }

        /* eyebrow */
        .contact-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }
        .eyebrow-line { width: 28px; height: 1px; background: rgba(255,255,255,0.18); }
        .eyebrow-text {
          font-size: 10px; letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          font-weight: 500;
        }

        /* heading */
        .contact-heading {
          font-size: clamp(16px, 2.6vw, 34px);
          color: rgba(255,255,255,0.35);
          margin: 0 0 28px;
          font-weight: 300;
          letter-spacing: -0.2px;
          line-height: 1.3;
        }

        /* email */
        .contact-email {
          font-size: clamp(30px, 5.5vw, 76px);
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          display: inline-block;
          position: relative;
          letter-spacing: -2px;
          line-height: 1;
          word-break: break-all;
          transition:
            color 0.5s ease,
            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
            text-shadow 0.5s ease;
        }
        .contact-email:hover {
          color: #5B9BF3;
          transform: scale(1.03);
          text-shadow: 0 0 60px rgba(91,155,243,0.3);
        }
        .contact-email::after {
          content: '';
          position: absolute;
          bottom: -6px; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #5B9BF3, transparent);
          transition: width 0.5s ease;
          border-radius: 1px;
        }
        .contact-email:hover::after { width: 100%; }

        /* subtle hint below email */
        .click-hint {
          margin-top: 22px;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.12);
          font-weight: 400;
          transition: color 0.4s ease;
          display: block;
        }
        .contact-email:hover ~ .click-hint { color: rgba(91,155,243,0.35); }

        /* divider */
        .divider-line {
          width: 1px; height: 56px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent);
          margin: 52px auto;
          opacity: 0;
          transition: opacity 0.7s ease 0.55s;
        }
        .main-container.visible .divider-line { opacity: 1; }

        /* footer */
        .copyright-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s;
        }
        .main-container.visible .copyright-container { opacity: 1; transform: translateY(0); }

        .instagram-link {
          border-radius: 50%;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          text-decoration: none;
          color: #fff;
        }
        .instagram-icon { width: 19px; height: 19px; transition: opacity 0.3s ease; flex-shrink: 0; }
        .instagram-text {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-weight: 600; font-size: 13px; letter-spacing: 0.5px;
          opacity: 0; transition: opacity 0.4s ease; white-space: nowrap;
        }
        .instagram-link:hover {
          width: 110px; border-radius: 28px;
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.15);
        }
        .instagram-link:hover .instagram-text { opacity: 1; }
        .instagram-link:hover .instagram-icon { opacity: 0; }

        .copyright {
          font-size: 12px;
          color: rgba(255,255,255,0.18);
          font-weight: 400;
          letter-spacing: 0.8px;
          margin: 0;
        }
        .copyright-link { color: inherit; text-decoration: none; transition: color 0.3s; }
        .copyright-link:hover { color: rgba(255,255,255,0.45); }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .hero-title { font-size: clamp(58px, 18vw, 100px); letter-spacing: -3px; }
          .scroll-hint { display: none; }
          .sound-toggle { bottom: 28px; right: 20px; gap: 8px; }
          .sound-btn { width: 38px; height: 38px; }
          .sound-btn svg { width: 16px; height: 16px; }
          .sound-label { font-size: 8px; letter-spacing: 2px; }
          .contact-section { padding: 60px 24px; }
          .contact-email { letter-spacing: -1px; word-break: break-word; }
          .divider-line { height: 44px; margin: 40px auto; }
          .copyright-container { gap: 18px; }
          .copyright { font-size: 11px; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: clamp(52px, 20vw, 80px); letter-spacing: -2px; }
          .contact-email { letter-spacing: -0.5px; }
        }
        @media (hover: none) {
          .contact-email:hover { color: #fff; transform: none; text-shadow: none; }
          .contact-email:active { color: #5B9BF3; transform: scale(0.98); }
          .contact-email::after { display: none; }
          .instagram-link:hover { width: 44px; border-radius: 50%; border-color: rgba(255,255,255,0.08); background: rgba(255,255,255,0.04); }
          .instagram-link:hover .instagram-text { opacity: 0; }
          .instagram-link:hover .instagram-icon { opacity: 1; }
          .instagram-link:active { transform: scale(0.93); }
        }
      `}</style>

      {/* ── LOADING SCREEN ── */}
      {phase !== 'visible' && (
        <div className={`loading-screen${phase === 'exiting' ? ' exiting' : ''}`}>
          <video autoPlay muted playsInline loop className="loading-video">
            <source src="/5'4.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className={`main-container${phase === 'visible' ? ' visible' : ''}`}>

        {/* HERO */}
        <section className="hero-section" ref={heroRef}>
          <div className="hero-content">
            <h1 className="hero-title"><br /></h1>
          </div>

          <div className="scroll-hint">
            <span>Scroll</span>
            <div className="scroll-arrow" />
          </div>

          <div className="sound-toggle">
            <button
              className={`sound-btn${isMuted ? '' : ' unmuted'}`}
              onClick={toggleBgSound}
              aria-label={isMuted ? 'Unmute background sound' : 'Mute background sound'}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
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
          <div className="contact-content">
            <div className="contact-eyebrow">
              <span className="eyebrow-line" />
              <span className="eyebrow-text">Get in touch</span>
              <span className="eyebrow-line" />
            </div>

            <p className="contact-heading">Let's have a chat</p>

            <a
              href="mailto:business@5feet4.co"
              className="contact-email"
              onClick={handleEmailClick}
            >
              business@5feet4.co
            </a>

            <span className="click-hint">Click to open email</span>
          </div>

          <div className="divider-line" />

          <div className="copyright-container">
            <a
              href="https://www.instagram.com/5feet.4/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
              aria-label="Follow us on Instagram"
            >
              <svg className="instagram-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="white" />
              </svg>
              <span className="instagram-text">Instagram</span>
            </a>
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