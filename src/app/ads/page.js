'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const videos = [
  {
    src: 'https://vimeo.com/1167679730/a43599f39f',
    title: 'Brand Campaign',
    desc: 'Creative storytelling meets brand vision',
    tag: 'Campaign',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167682809/d726843f75',
    title: 'UNIQLO',
    desc: 'Everyday essentials. Elevated comfort.',
    tag: 'Fashion • Apparel • Global',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167685194/a9c74513ab',
    title: 'MAMAEARTH',
    desc: "Safe, natural skincare solutions.",
    tag: 'Skincare • Beauty • D2C',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167691944',
    title: 'LENSKART',
    desc: 'Stylish eyewear with smart innovation.',
    tag: 'Eyewear • Retail • D2C',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167689633',
    title: 'EUME',
    desc: 'Modern travel gear, minimal design.',
    tag: 'Travel • Lifestyle • Design',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167689020/c15b90820f',
    title: 'TOKYO TOKYO',
    desc: 'High-impact commercials that convert',
    tag: 'Culture • Heritage • Modern',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167684995/8a9eb1db9a',
    title: 'SWAROVSKI',
    desc: 'Timeless crystal elegance redefined.',
    tag: 'Luxury • Jewelry • Lifestyle',
    type: 'vertical',
  },
]

function getVimeoData(url) {
  const idMatch = url.match(/vimeo\.com\/(\d+)/)
  const hashMatch = url.match(/\/(\d+)\/([a-f0-9]+)/)
  return {
    id: idMatch ? idMatch[1] : null,
    hash: hashMatch ? hashMatch[2] : null,
  }
}

export default function Ads() {
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [unmutedIndex, setUnmutedIndex] = useState(null)
  const containerRefs = useRef([])
  const iframeRefs = useRef([])
  const heroRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(t)
  }, [])

  // Background video blur on scroll — same as about/prints
  useEffect(() => {
    if (!loaded) return

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

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('blur-active')
    }
  }, [loaded])

  // IntersectionObserver for auto-play/pause Vimeo iframes
  useEffect(() => {
    if (!loaded) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = parseInt(e.target.dataset.idx)
          const iframe = iframeRefs.current[idx]
          if (!iframe) return
          iframe.contentWindow?.postMessage(
            { method: e.isIntersecting ? 'play' : 'pause' },
            '*'
          )
        })
      },
      { threshold: 0.4 }
    )
    containerRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [loaded])

  const toggleSound = (e, idx) => {
    e.stopPropagation()
    const isUnmuted = unmutedIndex === idx

    // Mute all vimeo players first
    iframeRefs.current.forEach((iframe) => {
      iframe?.contentWindow?.postMessage({ method: 'setVolume', value: 0 }, '*')
    })

    if (!isUnmuted) {
      setUnmutedIndex(idx)
      iframeRefs.current[idx]?.contentWindow?.postMessage(
        { method: 'setVolume', value: 1 },
        '*'
      )
      // Mute background video so it doesn't clash, and notify home page
      const bgVideo = document.querySelector('.background-video')
      if (bgVideo) bgVideo.muted = true
      window.dispatchEvent(new CustomEvent('ads-video-unmuted'))
    } else {
      setUnmutedIndex(null)
    }
  }

  if (!mounted) return null

  return (
    <>
      <style jsx suppressHydrationWarning>{`

        /* ─────────────────────────────────────
           BACKGROUND VIDEO BLUR
        ───────────────────────────────────── */
        :global(body.blur-active .background-video) {
          filter: blur(12px) brightness(0.6);
          transition: filter 0.8s ease;
        }

        /* ─────────────────────────────────────
           SKELETON — prints.js pattern:
           position: absolute, scrolls with page
        ───────────────────────────────────── */
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

        /* Shimmer base */
        .sk-block {
          background-color: #0f0f0f;
          position: relative;
          overflow: hidden;
        }
        .sk-block::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.05) 20%,
            rgba(255,255,255,0.09) 60%,
            rgba(255,255,255,0) 100%
          );
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }

        /* Hero skeleton */
        .sk-hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        .sk-hero-line {
          border-radius: 12px;
          background: #111;
          height: clamp(60px, 10vw, 140px);
        }
        .sk-hero-line.line1 { width: 40%; }
        .sk-hero-line.line2 { width: 37%; }

        /* Work section skeleton */
        .sk-work-section {
          padding: 100px 32px 80px;
          max-width: 1500px;
          margin: 0 auto;
          width: 100%;
        }
        .sk-work-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 52px;
        }
        .sk-work-title {
          width: 220px;
          height: clamp(40px, 5vw, 68px);
          border-radius: 8px;
          background: #111;
        }
        .sk-work-divider {
          width: 40px;
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin-bottom: 44px;
        }

        /* Bento skeleton — mirrors real grid exactly */
        .sk-bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          grid-auto-flow: dense;
          align-items: start;
        }
        .sk-card {
          border-radius: 14px;
          background: #111;
          border: 1px solid rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }
        .sk-card::after {
          content: '';
          position: absolute; inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          animation: skSweep 2.2s ease-in-out infinite;
        }
        .sk-card:nth-child(1)::after { animation-delay: 0s; }
        .sk-card:nth-child(2)::after { animation-delay: 0.1s; }
        .sk-card:nth-child(3)::after { animation-delay: 0.2s; }
        .sk-card:nth-child(4)::after { animation-delay: 0.3s; }
        .sk-card:nth-child(5)::after { animation-delay: 0.4s; }
        .sk-card:nth-child(6)::after { animation-delay: 0.5s; }
        .sk-card:nth-child(7)::after { animation-delay: 0.6s; }
        @keyframes skSweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .sk-card.sk-h { grid-column: span 2; height: 420px; }
        .sk-card.sk-v { grid-column: span 1; height: 550px; }

        /* Inner ghost elements on each card */
        .sk-card-badge {
          position: absolute;
          top: 16px; left: 16px;
          width: 72px; height: 24px;
          border-radius: 100px;
          background: rgba(255,255,255,0.06);
        }
        .sk-card-sound {
          position: absolute;
          top: 16px; right: 16px;
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .sk-card-info {
          position: absolute;
          bottom: 28px; left: 28px; right: 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sk-card-tag  { width: 50px;  height: 10px; border-radius: 2px; background: rgba(255,255,255,0.06); }
        .sk-card-title { width: 55%; height: 22px; border-radius: 4px; background: rgba(255,255,255,0.08); }
        .sk-card-desc { width: 75%; height: 14px; border-radius: 2px; background: rgba(255,255,255,0.05); }

        /* Footer skeleton */
        .sk-footer {
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .sk-footer-line {
          width: 200px; height: 14px;
          border-radius: 4px;
          background: #111;
        }

        /* Skeleton responsive */
        @media (max-width: 1024px) {
          .sk-bento { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .sk-card.sk-h { grid-column: 1 / -1; height: 340px; }
          .sk-card.sk-v { grid-column: span 1; height: auto; aspect-ratio: 9 / 16; }
        }
        @media (max-width: 768px) {
          .sk-work-section { padding: 60px 16px 56px; }
          .sk-bento { gap: 8px; }
          .sk-card.sk-h { grid-column: 1 / -1; height: 220px; }
          .sk-card.sk-v { grid-column: span 1; height: auto; aspect-ratio: 9 / 16; }
          .sk-hero-line.line1 { width: 80%; height: 80px; }
          .sk-hero-line.line2 { width: 55%; height: 60px; }
          .sk-footer { padding: 40px 20px; }
        }
        @media (max-width: 480px) {
          .sk-bento { grid-template-columns: 1fr; }
          .sk-card.sk-h { grid-column: 1; height: auto; aspect-ratio: 16 / 9; }
          .sk-card.sk-v { grid-column: 1; height: auto; aspect-ratio: 9 / 16; }
        }

        /* ─────────────────────────────────────
           CONTENT WRAPPER — prints.js pattern
        ───────────────────────────────────── */
        .content-wrapper {
          opacity: 0;
          transition: opacity 0.8s ease-in;
        }
        .content-wrapper.loaded {
          opacity: 1;
        }

        /* ─────────────────────────────────────
           PAGE — transparent, video shows through
        ───────────────────────────────────── */
        .page {
          min-height: 100vh;
          background: transparent;
          display: flex;
          flex-direction: column;
        }

        /* ─────────────────────────────────────
           HERO
        ───────────────────────────────────── */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 24px;
        }
        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 28px;
          opacity: 0;
          animation: heroFade 1s ease 0.4s forwards;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          mix-blend-mode: difference;
        }
        .hero-title {
          font-size: clamp(72px, 13vw, 180px);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #fff;
          text-align: center;
          opacity: 0;
          animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
        }
        .hero-scroll {
          position: absolute;
          bottom: 40px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: heroFade 1s ease 1.3s forwards;
        }
        .hero-scroll-label {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
        }
        .hero-scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.28), transparent);
          animation: scrollPulse 1.6s ease-in-out infinite;
        }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: clamp(58px, 18vw, 110px); }
          .hero-eyebrow { font-size: 10px; }
          .hero-scroll { bottom: 24px; }
        }
        @media (max-width: 480px) { .hero-title { font-size: clamp(50px, 20vw, 88px); } }

        /* ─────────────────────────────────────
           WORK
        ───────────────────────────────────── */
        .work {
          padding: 100px 32px 80px;
          max-width: 1500px;
          margin: 0 auto;
          width: 100%;
        }
        .work-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 52px;
        }
        .work-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          line-height: 1;
          color: #fff;
          text-align: center;
        }
        .work-count {
          position: absolute;
          right: 0; bottom: 6px;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .work-divider {
          width: 40px; height: 1px;
          background: rgba(255,255,255,0.1);
          margin-bottom: 44px;
        }

        /* ─────────────────────────────────────
           BENTO GRID
        ───────────────────────────────────── */
        .bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          grid-auto-flow: dense;
          align-items: start;
        }
        .video-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: #080808;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.45s ease,
                      border-color 0.3s ease;
        }
        .video-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 28px 70px rgba(0,0,0,0.65);
          border-color: rgba(255,255,255,0.14);
        }
        .video-card.horizontal { grid-column: span 2; height: 420px; }
        .video-card.vertical   { grid-column: span 1; height: 550px; }

        .vimeo-wrap {
          position: absolute; inset: 0;
          background: #000;
          overflow: hidden;
        }
        .vimeo-wrap iframe {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 170%; height: 170%;
          border: none;
          pointer-events: none;
        }
        .video-card.vertical .vimeo-wrap iframe { width: 130%; height: 130%; }

        .card-info {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .video-card:hover .card-info { opacity: 1; }
        .card-tag  { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 8px; }
        .card-title { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #fff; line-height: 1.1; margin-bottom: 8px; }
        .card-desc  { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.5; }

        .card-badge {
          position: absolute;
          top: 16px; left: 16px;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(10px);
          padding: 5px 12px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .sound-btn {
          position: absolute;
          top: 16px; right: 16px;
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
        }
        .sound-btn:hover { background: rgba(255,255,255,0.12); transform: scale(1.1); }
        .sound-btn svg  { width: 17px; height: 17px; stroke: #fff; fill: none; }

        @media (max-width: 1024px) {
          .bento { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .video-card.horizontal { grid-column: 1 / -1; height: 340px; }
          .video-card.vertical   { grid-column: span 1; height: auto; aspect-ratio: 9 / 16; }
          .video-card.vertical .vimeo-wrap { position: absolute !important; inset: 0 !important; }
        }
        @media (max-width: 768px) {
          .work { padding: 60px 16px 56px; }
          .work-header { flex-direction: column; align-items: flex-start; margin-bottom: 24px; gap: 6px; }
          .work-divider { margin-bottom: 28px; }
          .bento { gap: 8px; }
          .video-card.horizontal { grid-column: 1 / -1; height: 220px; }
          .video-card.vertical   { grid-column: span 1; height: auto; aspect-ratio: 3 / 4; }
          .video-card.vertical .vimeo-wrap { position: absolute !important; inset: 0 !important; }
          .card-info { opacity: 1; padding: 14px; }
          .card-desc { display: none; }
          .card-title { font-size: 14px; margin-bottom: 0; }
          .card-tag   { font-size: 8px; margin-bottom: 4px; }
          .card-badge { font-size: 8px; padding: 3px 8px; top: 10px; left: 10px; }
          .sound-btn  { width: 34px; height: 34px; top: 10px; right: 10px; }
          .sound-btn svg { width: 13px; height: 13px; }
          .video-card:hover { transform: none; box-shadow: none; }
        }
        @media (max-width: 480px) {
          .work { padding: 52px 14px 48px; }
          .bento { grid-template-columns: 1fr; gap: 8px; }
          .video-card.horizontal { grid-column: 1; height: auto; aspect-ratio: 16 / 9; }
          .video-card.vertical   { grid-column: 1; height: auto; aspect-ratio: 9 / 16; }
          .video-card.horizontal .vimeo-wrap,
          .video-card.vertical   .vimeo-wrap { position: absolute !important; inset: 0 !important; }
          .video-card.vertical .vimeo-wrap iframe { width: 130%; height: 130%; }
        }

        /* ─────────────────────────────────────
           FOOTER
        ───────────────────────────────────── */
        .copyright-container {
          width: 100%;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 100;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .copyright {
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
          letter-spacing: 0.5px;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .copyright-link, .copyright-link:visited, .copyright-link:active {
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
          width: 0; height: 1px;
          bottom: -2px; left: 0;
          background-color: #ffffff;
          transition: width 0.3s ease;
        }
        .copyright-link:hover::after { width: 100%; }
        .copyright-link:hover { opacity: 0.8; transform: translateY(-1px); }
        @media (max-width: 768px) {
          .copyright-container { padding: 40px 20px; }
          .copyright { font-size: 12px; text-align: center; }
        }
      `}</style>

      {/* ────────────────────────────────────────────────────
          OUTER WRAPPER — position: relative so the absolute
          skeleton sits flush on top of real content below.
          This is the exact same pattern as prints.js.
      ──────────────────────────────────────────────────── */}
      <div style={{ position: 'relative' }}>

        {/* ════════════════════════════════════════
            SKELETON — position: absolute
            Scrolls WITH the page (prints.js style)
            Overlays real content, fades out on load
        ════════════════════════════════════════ */}
        <div className={`skeleton-wrapper ${loaded ? 'hidden' : ''}`}>

          {/* 1 · Hero */}
          <section className="sk-hero-section">
            <div className="sk-block sk-hero-line line1" />
            <div className="sk-block sk-hero-line line2" />
          </section>

          {/* 2 · Work section */}
          <div className="sk-work-section">
            <div className="sk-work-header">
              <div className="sk-block sk-work-title" />
            </div>
            <div className="sk-work-divider" />

            {/* Bento — 6 horizontal + 1 vertical, mirrors real grid */}
            <div className="sk-bento">
              {/* Row 1 */}
              <div className="sk-block sk-card sk-h">
                <div className="sk-card-badge" /><div className="sk-card-sound" />
                <div className="sk-card-info"><div className="sk-card-tag" /><div className="sk-card-title" /><div className="sk-card-desc" /></div>
              </div>
              <div className="sk-block sk-card sk-h">
                <div className="sk-card-badge" /><div className="sk-card-sound" />
                <div className="sk-card-info"><div className="sk-card-tag" /><div className="sk-card-title" /><div className="sk-card-desc" /></div>
              </div>
              {/* Row 2 */}
              <div className="sk-block sk-card sk-h">
                <div className="sk-card-badge" /><div className="sk-card-sound" />
                <div className="sk-card-info"><div className="sk-card-tag" /><div className="sk-card-title" /><div className="sk-card-desc" /></div>
              </div>
              <div className="sk-block sk-card sk-h">
                <div className="sk-card-badge" /><div className="sk-card-sound" />
                <div className="sk-card-info"><div className="sk-card-tag" /><div className="sk-card-title" /><div className="sk-card-desc" /></div>
              </div>
              {/* Row 3 */}
              <div className="sk-block sk-card sk-h">
                <div className="sk-card-badge" /><div className="sk-card-sound" />
                <div className="sk-card-info"><div className="sk-card-tag" /><div className="sk-card-title" /><div className="sk-card-desc" /></div>
              </div>
              <div className="sk-block sk-card sk-h">
                <div className="sk-card-badge" /><div className="sk-card-sound" />
                <div className="sk-card-info"><div className="sk-card-tag" /><div className="sk-card-title" /><div className="sk-card-desc" /></div>
              </div>
              {/* Row 4 — single vertical */}
              <div className="sk-block sk-card sk-v">
                <div className="sk-card-badge" /><div className="sk-card-sound" />
                <div className="sk-card-info"><div className="sk-card-tag" /><div className="sk-card-title" /><div className="sk-card-desc" /></div>
              </div>
            </div>
          </div>

          {/* 3 · Footer */}
          <div className="sk-footer">
            <div className="sk-block sk-footer-line" />
          </div>
        </div>

        {/* ════════════════════════════════════════
            REAL CONTENT — opacity: 0 while loading,
            fades in when loaded (prints.js pattern)
        ════════════════════════════════════════ */}
        <div className={`content-wrapper ${loaded ? 'loaded' : ''}`}>
          <div className="page">

            <section className="hero" ref={heroRef}>
              <p className="hero-eyebrow">5feet4 Studio — Mumbai</p>
              <div className="hero-content">
                <h1 className="hero-title">
                  Creative <br />
                  Stories
                </h1>
              </div>

            </section>

            <section className="work">
              <div className="work-header">
                <h2 className="work-title">Our Work</h2>
                <span className="work-count">0{videos.length} Projects</span>
              </div>
              <div className="work-divider" />

              <div className="bento">
                {videos.map((video, i) => {
                  const { id, hash } = getVimeoData(video.src)
                  const iframeSrc = hash
                    ? `https://player.vimeo.com/video/${id}?h=${hash}&autoplay=1&muted=1&loop=1&background=1`
                    : `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`
                  const isUnmuted = unmutedIndex === i

                  return (
                    <div
                      key={i}
                      className={`video-card ${video.type}`}
                      ref={(el) => (containerRefs.current[i] = el)}
                      data-idx={i}
                    >
                      <div className="vimeo-wrap">
                        <iframe
                          ref={(el) => (iframeRefs.current[i] = el)}
                          src={iframeSrc}
                          title={video.title}
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      <div className="card-badge">{video.tag}</div>

                      <button
                        className="sound-btn"
                        aria-label="Toggle sound"
                        onClick={(e) => toggleSound(e, i)}
                      >
                        {isUnmuted ? (
                          <svg className="icon-muted" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                          </svg>
                        ) : (
                          <svg className="icon-unmuted" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        )}
                      </button>

                      <div className="card-info">
                        <p className="card-tag">{video.tag}</p>
                        <h3 className="card-title">{video.title}</h3>
                        <p className="card-desc">{video.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <div className="copyright-container">
              <p className="copyright">
                © 2026{' '}
                <Link href="/" className="copyright-link">
                  5feet4
                </Link>
                . All Rights Reserved.
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}