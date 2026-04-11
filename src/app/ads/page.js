'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const videos = [
  { src: 'https://vimeo.com/1167679730/a43599f39f', title: 'Brand Campaign', type: 'horizontal' },
  { src: 'https://vimeo.com/1167682809/d726843f75', title: 'UNIQLO', type: 'horizontal' },
  { src: 'https://vimeo.com/1167685194/a9c74513ab', title: 'MAMAEARTH', type: 'horizontal' },
  { src: 'https://vimeo.com/1167691944', title: 'LENSKART', type: 'horizontal' },
  { src: 'https://vimeo.com/1167689633', title: 'EUME', type: 'horizontal' },
  { src: 'https://vimeo.com/1167689020/c15b90820f', title: 'TOKYO TOKYO', type: 'horizontal' },
  { src: 'https://vimeo.com/1167684995/8a9eb1db9a', title: 'SWAROVSKI', type: 'vertical' },
  { src: 'https://vimeo.com/1182145252/3a68497660', title: 'HERO DIRT', type: 'vertical' },
  { src: 'https://vimeo.com/1182149661/b217fa5c0d', title: 'French Factor', type: 'vertical' },
  { src: 'https://vimeo.com/1182149674/1f426ebc4e', title: 'French Factor II', type: 'vertical' },
  { src: 'https://vimeo.com/1182145888', title: 'SAMURAI', type: 'horizontal' },
  { src: 'https://vimeo.com/1182149692/c834348c18', title: 'Hyundai Creta', type: 'horizontal' },
  { src: 'https://vimeo.com/1182149898/245601feb1', title: 'Mahindra BE6', type: 'horizontal' },
]

// Robust parser: strips query strings before extracting id + hash
function getVimeoData(url) {
  const clean = url.split('?')[0]
  const idMatch = clean.match(/vimeo\.com\/(\d+)/)
  const hashMatch = clean.match(/\/(\d+)\/([a-f0-9]+)$/)
  return {
    id: idMatch ? idMatch[1] : null,
    hash: hashMatch ? hashMatch[2] : null,
  }
}

function buildEmbedSrc(src, { autoplay = 1, muted = 1, loop = 1, background = 1 } = {}) {
  const { id, hash } = getVimeoData(src)
  if (!id) return ''
  const base = `https://player.vimeo.com/video/${id}`
  const h = hash ? `?h=${hash}` : '?'
  const sep = hash ? '&' : ''
  return `${base}${h}${sep}autoplay=${autoplay}&muted=${muted}&loop=${loop}&background=${background}`
}

function formatCount(n) {
  return String(n).padStart(2, '0')
}

export default function Ads() {
  const [loaded, setLoaded] = useState(false)
  const [unmutedIndex, setUnmutedIndex] = useState(null)
  const [fullscreenIndex, setFullscreenIndex] = useState(null)
  const [lastTapTime, setLastTapTime] = useState({})
  const containerRefs = useRef([])
  const iframeRefs = useRef([])
  const heroRef = useRef(null)
  const prevUnmutedRef = useRef(null)
  const bgWasUnmutedRef = useRef(false)

  // ── Instant reveal ─────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // ── Background blur on scroll ───────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return
    const updateBlur = () => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      document.body.classList.toggle('blur-active', rect.bottom < window.innerHeight * 0.2)
    }
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { updateBlur(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateBlur()
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.body.classList.remove('blur-active')
    }
  }, [loaded])

  // ── Auto-play / pause via IntersectionObserver ──────────────────────────────
  useEffect(() => {
    if (!loaded) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = parseInt(e.target.dataset.idx)
          const iframe = iframeRefs.current[idx]
          if (!iframe) return
          iframe.contentWindow?.postMessage(
            { method: e.isIntersecting ? 'play' : 'pause' }, '*'
          )
        })
      },
      { threshold: 0.4 }
    )
    containerRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [loaded])

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const muteAllCards = () => {
    iframeRefs.current.forEach((iframe) =>
      iframe?.contentWindow?.postMessage({ method: 'setVolume', value: 0 }, '*')
    )
  }

  const toggleSound = (e, idx) => {
    e.stopPropagation()
    const wasUnmuted = unmutedIndex === idx
    muteAllCards()
    if (!wasUnmuted) {
      setUnmutedIndex(idx)
      iframeRefs.current[idx]?.contentWindow?.postMessage({ method: 'setVolume', value: 1 }, '*')
      window.__vimeoPlayer?.setMuted(true).catch(() => { })
      window.dispatchEvent(new CustomEvent('ads-video-unmuted'))
    } else {
      setUnmutedIndex(null)
    }
  }

  const openFullscreen = async (idx) => {
    prevUnmutedRef.current = unmutedIndex
    muteAllCards()
    setUnmutedIndex(null)
    if (window.__vimeoPlayer) {
      try {
        const muted = await window.__vimeoPlayer.getMuted()
        bgWasUnmutedRef.current = !muted
        if (!muted) await window.__vimeoPlayer.setMuted(true)
      } catch (_) {
        bgWasUnmutedRef.current = false
      }
    }
    setFullscreenIndex(idx)
    document.body.style.overflow = 'hidden'
  }

  const exitFullscreen = () => {
    setFullscreenIndex(null)
    document.body.style.overflow = ''
    const prev = prevUnmutedRef.current
    if (prev !== null) {
      setUnmutedIndex(prev)
      setTimeout(() => {
        iframeRefs.current[prev]?.contentWindow?.postMessage({ method: 'setVolume', value: 1 }, '*')
      }, 100)
    }
    prevUnmutedRef.current = null
    if (bgWasUnmutedRef.current && window.__vimeoPlayer) {
      window.__vimeoPlayer.setMuted(false).catch(() => { })
      window.__vimeoPlayer.setVolume(1).catch(() => { })
    }
    bgWasUnmutedRef.current = false
  }

  const handleDoubleTap = (idx) => {
    const now = Date.now()
    const lastTap = lastTapTime[idx] || 0
    if (now - lastTap < 300) {
      openFullscreen(idx)
      setLastTapTime({})
    } else {
      setLastTapTime((prev) => ({ ...prev, [idx]: now }))
    }
  }

  // ── Escape key ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && fullscreenIndex !== null) exitFullscreen() }
    if (fullscreenIndex !== null) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [fullscreenIndex])

  return (
    <>
      <style jsx suppressHydrationWarning>{`

        /* ─── FULLSCREEN ──────────────────────────────────────────────────────── */
        .fullscreen-overlay {
          position: fixed; inset: 0;
          background: #000; z-index: 9999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          animation: fadeIn 0.25s ease-in;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .fullscreen-container {
          position: relative; width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .fullscreen-video-wrap {
          position: relative; width: 100%; flex: 1;
          background: #000; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .fullscreen-video-wrap iframe {
          width: 100%; height: 100%; border: none;
          max-width: 100vw; max-height: calc(100vh - 88px);
        }
        .fullscreen-controls {
          position: relative; width: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.7), transparent);
          padding: 36px 24px 20px;
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
          z-index: 100;
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(60px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .fs-title {
          font-size: 18px; font-weight: 700; color: #fff;
          line-height: 1.2; flex: 1;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .fs-close-btn {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0; padding: 0;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          backdrop-filter: blur(12px);
          -webkit-tap-highlight-color: transparent;
        }
        .fs-close-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.35);
          transform: scale(1.08) rotate(90deg);
        }
        .fs-close-btn:active { transform: scale(0.94); }
        .fs-close-btn svg {
          width: 20px; height: 20px;
          stroke: #fff; stroke-width: 2.5;
          stroke-linecap: round; stroke-linejoin: round;
        }

        /* ─── BG BLUR ─────────────────────────────────────────────────────────── */
        :global(body.blur-active .background-video) {
          filter: blur(12px) brightness(0.6);
          transition: filter 0.8s ease;
        }

        /* ─── SKELETON ────────────────────────────────────────────────────────── */
        .skeleton-wrapper {
          position: absolute; top: 0; left: 0; width: 100%; z-index: 50;
          transition: opacity 0.5s ease-out, visibility 0.5s;
          opacity: 1; visibility: visible; pointer-events: auto;
        }
        .skeleton-wrapper.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

        .sk-block { background: #0f0f0f; position: relative; overflow: hidden; }
        .sk-block::after {
          content: ''; position: absolute; inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.1) 60%, transparent 100%);
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer { to { transform: translateX(100%); } }

        .sk-hero { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; }
        .sk-hero-line { border-radius: 12px; background: #111; }
        .sk-hero-line.l1 { width: 40%; height: clamp(60px, 10vw, 140px); }
        .sk-hero-line.l2 { width: 37%; height: clamp(44px, 7vw, 100px); }

        .sk-work { padding: 100px 32px 80px; max-width: 1500px; margin: 0 auto; width: 100%; }
        .sk-work-hd { display: flex; justify-content: center; margin-bottom: 52px; }
        .sk-work-t  { width: 220px; height: clamp(40px, 5vw, 68px); border-radius: 8px; background: #111; }
        .sk-divider { width: 40px; height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 44px; }

        .sk-bento { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; grid-auto-flow: dense; }
        .sk-card  {
          border-radius: 14px; background: #111;
          border: 1px solid rgba(255,255,255,0.05);
          position: relative; overflow: hidden;
        }
        .sk-card::after {
          content: ''; position: absolute; inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          animation: skSweep 2.4s ease-in-out infinite;
        }
        .sk-card:nth-child(1)::after  { animation-delay: 0s;    }
        .sk-card:nth-child(2)::after  { animation-delay: 0.12s; }
        .sk-card:nth-child(3)::after  { animation-delay: 0.24s; }
        .sk-card:nth-child(4)::after  { animation-delay: 0.36s; }
        .sk-card:nth-child(5)::after  { animation-delay: 0.48s; }
        .sk-card:nth-child(6)::after  { animation-delay: 0.60s; }
        .sk-card:nth-child(7)::after  { animation-delay: 0.72s; }
        .sk-card:nth-child(8)::after  { animation-delay: 0.84s; }
        .sk-card:nth-child(9)::after  { animation-delay: 0.96s; }
        .sk-card:nth-child(10)::after { animation-delay: 1.08s; }
        .sk-card:nth-child(11)::after { animation-delay: 1.20s; }
        .sk-card:nth-child(12)::after { animation-delay: 1.32s; }
        .sk-card:nth-child(13)::after { animation-delay: 1.44s; }
        @keyframes skSweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .sk-card.sk-h { grid-column: span 2; height: 420px; }
        .sk-card.sk-v { grid-column: span 1; height: 550px; }
        .sk-sound { position: absolute; top: 16px; right: 16px; width: 42px; height: 42px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); }
        .sk-info  { position: absolute; bottom: 28px; left: 28px; right: 28px; }
        .sk-ttl   { width: 50%; height: 20px; border-radius: 4px; background: rgba(255,255,255,0.08); }

        .sk-footer { padding: 60px 20px; display: flex; justify-content: center; border-top: 1px solid rgba(255,255,255,0.07); }
        .sk-foot-line { width: 200px; height: 14px; border-radius: 4px; background: #111; }

        @media (max-width: 1024px) {
          .sk-bento { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .sk-card.sk-h { grid-column: 1 / -1; height: 340px; }
          .sk-card.sk-v { grid-column: span 1; height: auto; aspect-ratio: 9 / 16; }
        }
        @media (max-width: 768px) {
          .sk-work { padding: 60px 16px 56px; }
          .sk-bento { gap: 8px; }
          .sk-card.sk-h { grid-column: 1 / -1; height: 220px; }
          .sk-card.sk-v { grid-column: span 1; height: auto; aspect-ratio: 9 / 16; }
          .sk-hero-line.l1 { width: 80%; height: 80px; }
          .sk-hero-line.l2 { width: 55%; height: 60px; }
          .sk-footer { padding: 40px 20px; }
        }
        @media (max-width: 480px) {
          .sk-bento { grid-template-columns: 1fr; }
          .sk-card.sk-h { grid-column: 1; height: auto; aspect-ratio: 16 / 9; }
          .sk-card.sk-v { grid-column: 1; height: auto; aspect-ratio: 9 / 16; }
        }

        /* ─── PAGE ────────────────────────────────────────────────────────────── */
        .content-wrapper { opacity: 0; transition: opacity 0.8s ease-in; }
        .content-wrapper.loaded { opacity: 1; }
        .page { min-height: 100vh; background: transparent; display: flex; flex-direction: column; }

        /* ─── HERO ────────────────────────────────────────────────────────────── */
        .hero {
          height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          position: relative; padding: 0 24px;
        }
        .hero-eyebrow {
          font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); margin-bottom: 28px;
          opacity: 0; animation: heroFade 1s ease 0.4s forwards;
        }
        .hero-content { position: relative; z-index: 2; text-align: center; mix-blend-mode: difference; }
        .hero-title {
          font-size: clamp(72px, 13vw, 180px); font-weight: 800;
          line-height: 0.9; letter-spacing: -0.04em; text-transform: uppercase;
          color: #fff; text-align: center;
          opacity: 0; animation: fadeInUp 1.2s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
        }
        @keyframes fadeInUp  { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroFade  { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .hero-title   { font-size: clamp(58px, 18vw, 110px); }
          .hero-eyebrow { font-size: 10px; }
        }
        @media (max-width: 480px) { .hero-title { font-size: clamp(50px, 20vw, 88px); } }

        /* ─── WORK ────────────────────────────────────────────────────────────── */
        .work { padding: 100px 32px 80px; max-width: 1500px; margin: 0 auto; width: 100%; }
        .work-header {
          position: relative;
          display: flex; align-items: baseline; justify-content: center;
          margin-bottom: 52px;
        }
        .work-title {
          font-size: clamp(40px, 6vw, 72px); font-weight: 800;
          letter-spacing: -0.04em; text-transform: uppercase;
          line-height: 1; color: #fff; text-align: center;
        }
        .work-count {
          position: absolute; right: 0; bottom: 0;
          font-size: 10px; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.28); text-transform: uppercase; white-space: nowrap;
        }
        .work-divider { width: 40px; height: 1px; background: rgba(255,255,255,0.1); margin-bottom: 44px; }

        /* ─── BENTO GRID ──────────────────────────────────────────────────────── */
        .bento {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 12px; grid-auto-flow: dense; align-items: start;
        }

        .video-card {
          position: relative; border-radius: 14px; overflow: hidden;
          background: #080808; border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.3s ease;
          -webkit-user-select: none; user-select: none; -webkit-touch-callout: none;
        }
        .video-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 24px 60px rgba(0,0,0,0.7);
          border-color: rgba(255,255,255,0.13);
        }
        .video-card.horizontal { grid-column: span 2; height: 420px; }
        .video-card.vertical   { grid-column: span 1; height: 550px; }

        /* ─── VIMEO IFRAME ────────────────────────────────────────────────────── */
        .vimeo-wrap { position: absolute; inset: 0; background: #000; overflow: hidden; }
        .vimeo-wrap iframe {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 170%; height: 170%;
          border: none; pointer-events: none;
        }
        .video-card.vertical .vimeo-wrap iframe { width: 130%; height: 130%; }

        /* ─── CARD OVERLAY ────────────────────────────────────────────────────── */
        .card-info {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 45%, transparent 100%);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 26px; opacity: 0; transition: opacity 0.3s ease;
        }
        .video-card:hover .card-info { opacity: 1; }
        .card-title {
          font-size: 24px; font-weight: 700;
          letter-spacing: -0.02em; color: #fff; line-height: 1.1;
        }

        /* ─── SOUND BTN ───────────────────────────────────────────────────────── */
        .sound-btn {
          position: absolute; top: 14px; right: 14px;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s ease;
          backdrop-filter: blur(10px); z-index: 10; padding: 0;
          -webkit-tap-highlight-color: transparent;
        }
        .sound-btn:hover  { background: rgba(255,255,255,0.12); transform: scale(1.08); }
        .sound-btn:active { transform: scale(0.94); }
        .sound-btn svg    { width: 16px; height: 16px; stroke: #fff; fill: none; }

        /* ─── RESPONSIVE ──────────────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .bento { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .video-card.horizontal { grid-column: 1 / -1; height: 340px; }
          .video-card.vertical   { grid-column: span 1; height: auto; aspect-ratio: 9 / 16; }
          .video-card.vertical .vimeo-wrap { position: absolute !important; inset: 0 !important; }
        }
        @media (max-width: 768px) {
          .work { padding: 60px 16px 56px; }
          .work-header { flex-direction: column; align-items: flex-start; margin-bottom: 24px; gap: 4px; }
          .work-count  { position: static; }
          .work-divider { margin-bottom: 28px; }
          .bento { gap: 8px; }
          .video-card.horizontal { grid-column: 1 / -1; height: 220px; }
          .video-card.vertical   { grid-column: span 1; height: auto; aspect-ratio: 3 / 4; }
          .video-card.vertical .vimeo-wrap { position: absolute !important; inset: 0 !important; }
          .card-info  { opacity: 1; padding: 12px; }
          .card-title { font-size: 14px; }
          .sound-btn  { width: 32px; height: 32px; top: 8px; right: 8px; }
          .sound-btn svg { width: 12px; height: 12px; }
          .video-card:hover { transform: none; box-shadow: none; }
          .fullscreen-controls { padding: 20px; }
          .fs-title { font-size: 16px; }
          .fs-close-btn { width: 40px; height: 40px; }
        }
        @media (max-width: 480px) {
          .work { padding: 52px 14px 48px; }
          .bento { grid-template-columns: 1fr; gap: 8px; }
          .video-card.horizontal { grid-column: 1; height: auto; aspect-ratio: 16 / 9; }
          .video-card.vertical   { grid-column: 1; height: auto; aspect-ratio: 9 / 16; }
          .video-card.horizontal .vimeo-wrap,
          .video-card.vertical   .vimeo-wrap { position: absolute !important; inset: 0 !important; }
          .video-card.vertical .vimeo-wrap iframe { width: 130%; height: 130%; }
          .fullscreen-controls { padding: 14px; }
          .fs-title { font-size: 14px; }
          .fs-close-btn { width: 38px; height: 38px; }
          .fs-close-btn svg { width: 18px; height: 18px; }
        }

        /* ─── FOOTER ──────────────────────────────────────────────────────────── */
        .copyright-container {
          width: 100%; padding: 60px 20px;
          display: flex; justify-content: center; align-items: center;
          position: relative; z-index: 100;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .copyright {
          font-size: 14px; color: rgba(255,255,255,0.9);
          font-weight: 400; letter-spacing: 0.5px; margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .copyright-link,
        .copyright-link:visited,
        .copyright-link:active {
          color: #fff; font-weight: 700; text-decoration: none;
          position: relative; display: inline-block; margin: 0 4px; cursor: pointer;
        }
        .copyright-link::after {
          content: ''; position: absolute;
          width: 0; height: 1px; bottom: -2px; left: 0;
          background: #fff; transition: width 0.3s ease;
        }
        .copyright-link:hover::after { width: 100%; }
        .copyright-link:hover { opacity: 0.8; transform: translateY(-1px); }
        @media (max-width: 768px) {
          .copyright-container { padding: 40px 20px; }
          .copyright { font-size: 12px; text-align: center; }
        }
      `}</style>

      <div style={{ position: 'relative' }}>

        {/* ── SKELETON ─────────────────────────────────────────────────────────── */}
        <div className={`skeleton-wrapper ${loaded ? 'hidden' : ''}`}>
          <section className="sk-hero">
            <div className="sk-block sk-hero-line l1" />
            <div className="sk-block sk-hero-line l2" />
          </section>
          <div className="sk-work">
            <div className="sk-work-hd"><div className="sk-block sk-work-t" /></div>
            <div className="sk-divider" />
            <div className="sk-bento">
              {videos.map((v, i) => (
                <div key={i} className={`sk-block sk-card ${v.type === 'vertical' ? 'sk-v' : 'sk-h'}`}>
                  <div className="sk-sound" />
                  <div className="sk-info"><div className="sk-ttl" /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="sk-footer"><div className="sk-block sk-foot-line" /></div>
        </div>

        {/* ── CONTENT ──────────────────────────────────────────────────────────── */}
        <div className={`content-wrapper ${loaded ? 'loaded' : ''}`}>
          <div className="page">

            <section className="hero" ref={heroRef}>
              <p className="hero-eyebrow">5feet4 Studio — Mumbai</p>
              <div className="hero-content">
                <h1 className="hero-title">Creative <br />Stories</h1>
              </div>
            </section>

            <section className="work">
              <div className="work-header">
                <h2 className="work-title">Our Work</h2>
                <span className="work-count">{formatCount(videos.length)} Projects</span>
              </div>
              <div className="work-divider" />

              <div className="bento">
                {videos.map((video, i) => {
                  const iframeSrc = buildEmbedSrc(video.src)
                  const isUnmuted = unmutedIndex === i

                  return (
                    <div
                      key={i}
                      className={`video-card ${video.type}`}
                      ref={(el) => (containerRefs.current[i] = el)}
                      data-idx={i}
                      onDoubleClick={() => openFullscreen(i)}
                      onTouchEnd={() => handleDoubleTap(i)}
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

                      <button
                        className="sound-btn"
                        aria-label={isUnmuted ? 'Mute' : 'Unmute'}
                        onClick={(e) => toggleSound(e, i)}
                      >
                        {isUnmuted ? (
                          <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        )}
                      </button>

                      <div className="card-info">
                        <h3 className="card-title">{video.title}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <div className="copyright-container">
              <p className="copyright">
                © 2026{' '}
                <Link href="/" className="copyright-link">5feet4</Link>
                . All Rights Reserved.
              </p>
            </div>
          </div>
        </div>

        {/* ── FULLSCREEN PLAYER ────────────────────────────────────────────────── */}
        {fullscreenIndex !== null && (() => {
          const video = videos[fullscreenIndex]
          const src = buildEmbedSrc(video.src, { autoplay: 1, muted: 0, loop: 0, background: 0 })
          return (
            <div className="fullscreen-overlay" onClick={exitFullscreen}>
              <div className="fullscreen-container" onClick={(e) => e.stopPropagation()}>
                <div className="fullscreen-video-wrap">
                  <iframe
                    src={src}
                    title={video.title}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="fullscreen-controls">
                  <div className="fs-title">{video.title}</div>
                  <button className="fs-close-btn" onClick={exitFullscreen} aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )
        })()}

      </div>
    </>
  )
}