'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  const scrollSectionRef = useRef(null)
  const scrollTextRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const teamMembers = [
    {
      img: 'https://framerusercontent.com/images/kzXamvuqsPYwBBGCcSPysFAeNg.png',
      name: 'John',
      role: 'Content Strategist',
      desc: 'Driving creative direction for high-performing social media content. Focused on crafting scroll-stopping visuals.',
    },
    {
      img: 'https://framerusercontent.com/images/nWuBJonrjn7pFV4h3SBbU7ozog.png',
      name: 'Darshan',
      role: 'Producer',
      desc: 'Overseeing seamless execution from concept to final cut. Focused on coordinating teams and resources.',
    },
    {
      img: 'https://framerusercontent.com/images/NjG12P0Ks1gMTdEsYOHezB84vtU.png',
      name: 'Roman',
      role: 'Production Lead',
      desc: 'Leading teams, elevating visual storytelling, and delivering cinematic content that drives results.',
    },
    {
      img: 'https://framerusercontent.com/images/NjG12P0Ks1gMTdEsYOHezB84vtU.png',
      name: 'Roman',
      role: 'Production Lead',
      desc: 'Leading teams, elevating visual storytelling, and delivering cinematic content that drives results.',
    },
    {
      img: 'https://framerusercontent.com/images/NjG12P0Ks1gMTdEsYOHezB84vtU.png',
      name: 'Roman',
      role: 'Production Lead',
      desc: 'Leading teams, elevating visual storytelling, and delivering cinematic content that drives results.',
    },
    {
      img: 'https://framerusercontent.com/images/kzXamvuqsPYwBBGCcSPysFAeNg.png',
      name: 'John',
      role: 'Content Strategist',
      desc: 'Driving creative direction for high-performing social media content. Focused on crafting scroll-stopping visuals.',
    },
    {
      img: 'https://framerusercontent.com/images/NjG12P0Ks1gMTdEsYOHezB84vtU.png',
      name: 'Roman',
      role: 'Production Lead',
      desc: 'Leading teams, elevating visual storytelling, and delivering cinematic content that drives results.',
    },
    {
      img: 'https://framerusercontent.com/images/nWuBJonrjn7pFV4h3SBbU7ozog.png',
      name: 'Darshan',
      role: 'Producer',
      desc: 'Overseeing seamless execution from concept to final cut. Focused on coordinating teams and resources.',
    },
  ]

  const logos = [
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/2.png?updatedAt=1772060171475", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/42.png?updatedAt=1772060171459", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/38.png?updatedAt=1772060171476", desktop: { h: '250px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/1.png?updatedAt=1772060171468", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/17.png?updatedAt=1772060170074", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/37.png?updatedAt=1772060168651", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/3.png?updatedAt=1772060169776", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/26.png?updatedAt=1772060169225", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/7.png?updatedAt=1772060169364", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/33.png?updatedAt=1772060169498", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/16.png?updatedAt=1772060168724", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/45.png?updatedAt=1772060169206", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/44.png?updatedAt=1772060169198", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/29.png?updatedAt=1772060168281", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
    { src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/11.png?updatedAt=1772060168489", desktop: { h: '200px', w: 'auto' }, mobile: { h: '40px', w: 'auto' } },
  ]

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Optimized image preloading
  useEffect(() => {
    const startTime = Date.now()
    const MIN_LOADING_TIME = 2300

    const uniqueTeamImages = [...new Set(teamMembers.map((m) => m.img))]
    const allImageUrls = [...uniqueTeamImages, ...logos.map((l) => l.src)]

    const imagePromises = allImageUrls.map((src) => {
      return new Promise((resolve) => {
        const img = document.createElement('img')
        img.onload = () => resolve(true)
        img.onerror = () => resolve(true)
        img.src = src
      })
    })

    Promise.all(imagePromises).then(() => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime)
      setTimeout(() => setIsLoaded(true), remainingTime)
    })
  }, [])

  // Blur effect on scroll
  useEffect(() => {
    if (!isLoaded) return

    const heroSection = document.querySelector('.hero-section')

    const updateBlur = () => {
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
  }, [isLoaded])

  // Progressive scroll text animation
  useEffect(() => {
    if (!isLoaded) return

    const scrollText = scrollTextRef.current
    const scrollSection = scrollSectionRef.current

    if (!scrollText || !scrollSection) return

    const fullText = scrollText.textContent.trim()
    const words = fullText.split(/\s+/).filter((w) => w.length > 0)

    scrollText.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(' ')
    const wordEls = scrollText.querySelectorAll('.word')

    function updateTextOnScroll() {
      const rect = scrollSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      const scrollStart = windowHeight * 0.75
      const scrollEnd = -sectionHeight * 0.25
      const scrollRange = scrollStart - scrollEnd
      const current = scrollStart - sectionTop

      let progress = current / scrollRange
      progress = Math.max(0, Math.min(1, progress))

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2

      const total = wordEls.length
      const activeCount = Math.floor(eased * total)

      wordEls.forEach((el, i) => {
        el.classList.toggle('active', i < activeCount)
      })
    }

    let textTicking = false
    function onScroll() {
      if (!textTicking) {
        textTicking = true
        requestAnimationFrame(() => {
          updateTextOnScroll()
          textTicking = false
        })
      }
    }

    updateTextOnScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateTextOnScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateTextOnScroll)
    }
  }, [isLoaded])

  return (
    <>
      <style jsx suppressHydrationWarning>{`

        /* ── Skeleton pulse animation (no shimmer) ── */
        @keyframes skPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        /* ─── SKELETON WRAPPER ─── */
        .skeleton-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          transition: opacity 0.7s ease-out, visibility 0.7s;
          opacity: 1;
          visibility: visible;
          background: #080808;
        }
        .skeleton-wrapper.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* Base skeleton block — pure pulse, zero shimmer */
        .sk-block {
          animation: skPulse 1.8s ease-in-out infinite;
        }

        /* Stagger delays for depth */
        .sk-block:nth-child(2) { animation-delay: 0.15s; }
        .sk-block:nth-child(3) { animation-delay: 0.3s; }
        .sk-block:nth-child(4) { animation-delay: 0.45s; }
        .sk-block:nth-child(5) { animation-delay: 0.6s; }
        .sk-block:nth-child(6) { animation-delay: 0.75s; }

        /* ── HERO skeleton ── */
        .sk-hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 40px;
        }

        .sk-hero-title {
          border-radius: 16px;
          background: #1a1a1a;
          height: clamp(64px, 10vw, 130px);
        }
        .sk-hero-title.l1 { width: 52%; animation-delay: 0s; }
        .sk-hero-title.l2 { width: 22%; height: clamp(48px, 7.5vw, 105px); animation-delay: 0.2s; }

        /* ── TEAM skeleton ── */
        .sk-team {
          padding: 100px 40px;
        }

        .sk-team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .sk-card {
          aspect-ratio: 3/4;
          background: #111;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.04);
          position: relative;
          overflow: hidden;
        }

        .sk-card-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sk-line {
          border-radius: 6px;
          background: rgba(255,255,255,0.07);
          animation: skPulse 1.8s ease-in-out infinite;
        }

        .sk-line.name   { height: 22px; width: 50%; }
        .sk-line.role   { height: 13px; width: 35%; animation-delay: 0.1s; }
        .sk-line.desc1  { height: 11px; width: 100%; margin-top: 8px; animation-delay: 0.2s; }
        .sk-line.desc2  { height: 11px; width: 78%; animation-delay: 0.3s; }

        /* ── WISDOM skeleton ── */
        .sk-wisdom {
          padding: 80px 40px;
          display: flex;
          justify-content: center;
        }

        .sk-wisdom-inner {
          max-width: 860px;
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 60px 48px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
        }

        .sk-w-line { border-radius: 6px; background: #191919; }
        .sk-w-line.w1 { height: 26px; width: 95%; animation: skPulse 1.8s ease-in-out infinite; }
        .sk-w-line.w2 { height: 26px; width: 88%; animation: skPulse 1.8s 0.1s ease-in-out infinite; }
        .sk-w-line.w3 { height: 26px; width: 91%; animation: skPulse 1.8s 0.2s ease-in-out infinite; }
        .sk-w-line.w4 { height: 16px; width: 38%; margin-top: 20px; animation: skPulse 1.8s 0.3s ease-in-out infinite; }

        /* ── TRUSTED skeleton ── */
        .sk-trusted {
          padding: 100px 40px;
          text-align: center;
        }

        .sk-trusted-head {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 64px;
        }

        .sk-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #1e1e1e;
          animation: skPulse 1.8s ease-in-out infinite;
        }

        .sk-trusted-label {
          height: 16px;
          width: 140px;
          border-radius: 4px;
          background: #1a1a1a;
          animation: skPulse 1.8s 0.1s ease-in-out infinite;
        }

        .sk-logo-row {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .sk-logo-item {
          height: 42px;
          width: 130px;
          border-radius: 8px;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.04);
          animation: skPulse 1.8s ease-in-out infinite;
        }

        .sk-logo-item:nth-child(1) { animation-delay: 0s; }
        .sk-logo-item:nth-child(2) { animation-delay: 0.12s; }
        .sk-logo-item:nth-child(3) { animation-delay: 0.24s; }
        .sk-logo-item:nth-child(4) { animation-delay: 0.36s; }
        .sk-logo-item:nth-child(5) { animation-delay: 0.48s; }
        .sk-logo-item:nth-child(6) { animation-delay: 0.6s; }

        /* ── SCROLL TEXT skeleton ── */
        .sk-scroll {
          padding: 100px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
        }

        .sk-scroll-inner {
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
        }

        .sk-t-line { border-radius: 6px; background: #161616; }
        .sk-t-line.t1 { height: 28px; width: 100%; animation: skPulse 1.8s ease-in-out infinite; }
        .sk-t-line.t2 { height: 28px; width: 97%; animation: skPulse 1.8s 0.1s ease-in-out infinite; }
        .sk-t-line.t3 { height: 28px; width: 99%; animation: skPulse 1.8s 0.2s ease-in-out infinite; }
        .sk-t-line.t4 { height: 28px; width: 95%; animation: skPulse 1.8s 0.3s ease-in-out infinite; }
        .sk-t-line.t5 { height: 28px; width: 68%; animation: skPulse 1.8s 0.4s ease-in-out infinite; }

        /* ── STATS skeleton ── */
        .sk-stats {
          padding: 100px 40px;
          min-height: 60vh;
          display: flex;
          align-items: center;
        }

        .sk-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
        }

        .sk-stat-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px;
          padding: 56px 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sk-stat-num {
          height: 64px;
          width: 150px;
          border-radius: 10px;
          background: #1a1a1a;
          margin-bottom: 8px;
          animation: skPulse 1.8s ease-in-out infinite;
        }

        .sk-stat-text {
          height: 14px;
          border-radius: 4px;
          background: #161616;
          animation: skPulse 1.8s ease-in-out infinite;
        }

        .sk-stat-text.st1 { width: 100%; animation-delay: 0s; }
        .sk-stat-text.st2 { width: 88%; animation-delay: 0.1s; }
        .sk-stat-text.st3 { width: 72%; animation-delay: 0.2s; }

        /* ── FOOTER skeleton ── */
        .sk-footer {
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .sk-footer-text {
          height: 14px;
          width: 220px;
          border-radius: 4px;
          background: #141414;
          animation: skPulse 1.8s ease-in-out infinite;
        }

        /* ── Skeleton responsive ── */
        @media (max-width: 1024px) {
          .sk-team-grid { grid-template-columns: repeat(2, 1fr); }
          .sk-team, .sk-trusted, .sk-scroll, .sk-stats, .sk-wisdom { padding: 80px 24px; }
        }

        @media (max-width: 768px) {
          .sk-team { padding: 60px 20px; }
          .sk-team-grid { grid-template-columns: 1fr; gap: 16px; }
          .sk-card { aspect-ratio: 9/12; }
          .sk-wisdom { padding: 60px 20px; }
          .sk-wisdom-inner { padding: 40px 24px; }
          .sk-trusted { padding: 60px 20px; }
          .sk-logo-row { gap: 14px; }
          .sk-logo-item { width: 100px; height: 32px; }
          .sk-scroll { padding: 60px 20px; }
          .sk-stats { padding: 60px 20px; }
          .sk-stats-grid { grid-template-columns: 1fr; gap: 20px; }
          .sk-footer { padding: 40px 20px; }
          .sk-hero-title.l1 { width: 75%; }
          .sk-hero-title.l2 { width: 50%; }
        }

        @media (max-width: 480px) {
          .sk-team-grid { gap: 12px; }
          .sk-logo-item { width: 80px; height: 26px; }
          .sk-wisdom-inner { padding: 32px 20px; }
          .sk-stat-card { padding: 36px 24px; }
        }

        /* ── Content ── */
        .content-wrapper {
          opacity: 0;
          transition: opacity 0.8s ease-in;
        }
        .content-wrapper.loaded {
          opacity: 1;
        }

        :global(body.blur-active .background-video) {
          filter: blur(12px) brightness(0.6);
          transition: filter 0.8s ease;
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
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -2px;
          color: #fff;
          animation: fadeInUp 1s ease-out;
        }

        #team-section {
          min-height: 100vh;
          padding: 100px 40px;
          position: relative;
          z-index: 1;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .team-card {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          background: #0a0a0a;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .team-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .team-card:hover img { transform: scale(1.08); }

        .team-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.4) 60%, transparent);
          padding: 30px;
          transition: all 0.3s ease;
        }

        .team-info h3 { font-size: 28px; font-weight: 700; margin-bottom: 5px; color: #fff; }
        .team-info p { font-size: 14px; opacity: 0.7; margin-bottom: 15px; color: #fff; }
        .team-description { font-size: 13px; line-height: 1.6; opacity: 0.9; color: #fff; }

        .wisdom-section {
          margin: 80px auto;
          padding: 80px 40px;
          background: rgba(0,0,0,0.4);
          border-radius: 16px;
          backdrop-filter: blur(5px);
          max-width: 1200px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .wisdom-section p:first-child {
          font-size: clamp(1.3rem, 2.5vw, 2rem);
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 24px;
          color: #fff;
        }

        .wisdom-section p:last-child { font-size: 0.95rem; opacity: 0.65; color: #fff; }

        .trusted-section {
          padding: 100px 40px;
          text-align: center;
          overflow: hidden;
        }

        .trusted-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 80px;
        }

        .pulse-dot {
          width: 12px;
          height: 12px;
          background: #ff0000;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }

        .trusted-header h2 {
          font-size: 1.1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          color: #fff;
        }

        /* ── Logo carousel: no separator, tighter gap ── */
        .carousel-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }

        .logo-track {
          display: flex;
          gap: 0;
          align-items: center;
          width: fit-content;
          animation: scroll 35s linear infinite;
        }

        .carousel-container:hover .logo-track {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Each logo item — no separator, reduced padding for closeness */
        .logo-item {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }

        .logo-item img {
          width: auto;
          opacity: 0.45;
          filter: grayscale(1) brightness(0.95);
          transition: opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease;
          flex-shrink: 0;
          display: block;
          /* Tighter horizontal padding — no bars between items */
          padding: 0 18px;
        }

        .logo-item:hover img {
          opacity: 1;
          filter: grayscale(0) brightness(1);
          transform: scale(1.1);
        }

        /* Separator REMOVED — no .logo-separator element rendered */

        .scroll-text-section {
          padding: 100px 40px;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-container { max-width: 1200px; width: 100%; text-align: center; }

        .scroll-text {
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.7;
          font-weight: 400;
          color: #fff;
        }

        :global(.scroll-text .word) { opacity: 0.2; transition: opacity 0.3s ease; }
        :global(.scroll-text .word.active) { opacity: 1; }

        .stats-section {
          padding: 100px 40px;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          padding: 60px 40px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .stat-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-8px);
        }

        .stat-card h3 {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #fff, #999);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-card p { font-size: 15px; line-height: 1.6; opacity: 0.75; color: #fff; }

        .copyright-container {
          width: 100%;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 100;
          border-top: 1px solid rgba(255,255,255,0.05);
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
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #ffffff;
          transition: width 0.3s ease;
        }

        .copyright-link:hover::after { width: 100%; }
        .copyright-link:hover { opacity: 0.8; transform: translateY(-1px); }

        /* ── Main responsive ── */
        @media (max-width: 1200px) {
          .team-grid { gap: 24px; }
          #team-section { padding: 80px 32px; }
        }

        @media (max-width: 1024px) {
          .team-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          #team-section { padding: 80px 24px; }
          .wisdom-section { padding: 60px 32px; }
          .scroll-text-section { padding: 80px 24px; }
          .stats-section { padding: 80px 24px; }
          .trusted-section { padding: 80px 24px; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: clamp(50px, 12vw, 100px); }
          #team-section { padding: 60px 20px; }
          .team-grid { grid-template-columns: 1fr; gap: 16px; }
          .team-card { aspect-ratio: 9/12; }
          .wisdom-section { margin: 60px auto; padding: 60px 24px; }
          .wisdom-section p:first-child { font-size: clamp(1.1rem, 2.2vw, 1.6rem); }
          .trusted-section { padding: 60px 20px; }
          .trusted-header { margin-bottom: 50px; }
          .logo-item img { padding: 0 12px; }
          .scroll-text-section { padding: 60px 20px; }
          .scroll-text { font-size: clamp(22px, 3.5vw, 36px); }
          .stats-section { padding: 60px 20px; }
          .stats-grid { grid-template-columns: 1fr; gap: 24px; }
          .stat-card { padding: 40px 24px; }
          .copyright-container { padding: 40px 20px; }
          .copyright { font-size: 12px; text-align: center; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: clamp(42px, 14vw, 80px); }
          #team-section { padding: 50px 16px; }
          .team-grid { gap: 12px; }
          .wisdom-section { margin: 50px 0; padding: 50px 20px; border-radius: 12px; }
          .wisdom-section p:first-child { font-size: clamp(1rem, 2vw, 1.4rem); }
          .trusted-section { padding: 50px 16px; }
          .logo-item img { padding: 0 8px; }
          .scroll-text-section { padding: 50px 16px; }
          .scroll-text { font-size: clamp(18px, 3vw, 28px); line-height: 1.5; }
          .stats-section { padding: 50px 16px; }
          .stat-card { padding: 30px 20px; }
          .stat-card h3 { font-size: clamp(36px, 5vw, 52px); }
          .stat-card p { font-size: 13px; }
          .copyright-container { padding: 30px 16px; }
          .copyright { font-size: 11px; }
        }
      `}</style>

      <div style={{ position: 'relative' }}>

        {/* ═══════════════ SKELETON ═══════════════ */}
        <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>

          {/* Hero */}
          <section className="sk-hero">
            <div className="sk-block sk-hero-title l1" />
            <div className="sk-block sk-hero-title l2" />
          </section>

          {/* Team */}
          <section className="sk-team">
            <div className="sk-team-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="sk-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="sk-card-bottom">
                    <div className="sk-line name" style={{ animationDelay: `${i * 0.08}s` }} />
                    <div className="sk-line role" style={{ animationDelay: `${i * 0.08 + 0.1}s` }} />
                    <div className="sk-line desc1" style={{ animationDelay: `${i * 0.08 + 0.2}s` }} />
                    <div className="sk-line desc2" style={{ animationDelay: `${i * 0.08 + 0.3}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Wisdom */}
          <section className="sk-wisdom">
            <div className="sk-wisdom-inner">
              <div className="sk-w-line w1" />
              <div className="sk-w-line w2" />
              <div className="sk-w-line w3" />
              <div className="sk-w-line w4" />
            </div>
          </section>

          {/* Trusted */}
          <section className="sk-trusted">
            <div className="sk-trusted-head">
              <div className="sk-dot" />
              <div className="sk-trusted-label" />
            </div>
            <div className="sk-logo-row">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="sk-logo-item" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </section>

          {/* Scroll text */}
          <section className="sk-scroll">
            <div className="sk-scroll-inner">
              <div className="sk-t-line t1" />
              <div className="sk-t-line t2" />
              <div className="sk-t-line t3" />
              <div className="sk-t-line t4" />
              <div className="sk-t-line t5" />
            </div>
          </section>

          {/* Stats */}
          <section className="sk-stats">
            <div className="sk-stats-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="sk-stat-card" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="sk-stat-num" style={{ animationDelay: `${i * 0.12}s` }} />
                  <div className="sk-stat-text st1" style={{ animationDelay: `${i * 0.12 + 0.1}s` }} />
                  <div className="sk-stat-text st2" style={{ animationDelay: `${i * 0.12 + 0.2}s` }} />
                  <div className="sk-stat-text st3" style={{ animationDelay: `${i * 0.12 + 0.3}s` }} />
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="sk-footer">
            <div className="sk-footer-text" />
          </div>

        </div>

        {/* ═══════════════ CONTENT ═══════════════ */}
        <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>

          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                About
                <br />
                Us
              </h1>
            </div>
          </section>

          <section id="team-section">
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    priority={index < 3}
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div className="team-overlay">
                    <div className="team-info">
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </div>
                    <p className="team-description">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="scroll-text-section">
            <div className="text-container">
              <div className="wisdom-section">
                <p>
                  "We don't just capture moments—we create magic through our lens.
                  Every frame tells a story, every shot brings dreams to life."
                </p>
                <p>— The 5feet4 Team</p>
              </div>
            </div>
          </section>

          <section className="trusted-section">
            <div className="trusted-header">
              <div className="pulse-dot"></div>
              <h2>TRUSTED BY</h2>
            </div>

            <div className="carousel-container">
              <div className="logo-track">
                {[...logos, ...logos].map((logo, i) => {
                  const size = isMobile ? logo.mobile : logo.desktop
                  return (
                    <div key={i} className="logo-item">
                      <Image
                        src={logo.src}
                        alt={`Client ${(i % logos.length) + 1}`}
                        width={280}
                        height={140}
                        quality={80}
                        style={{
                          height: size.h,
                          width: size.w,
                          objectFit: 'contain',
                        }}
                      />
                      {/* Separator intentionally removed */}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <section ref={scrollSectionRef} className="scroll-text-section">
            <div className="text-container">
              <p ref={scrollTextRef} className="scroll-text">
                Specializing in creative direction and full-scale production, 5feet4 Studio guides your brand from concept to final delivery. From
                pre-production planning to post-production polish, we lead the
                entire process ensuring impactful content that resonates across
                social media, commercials, and creative campaigns.
              </p>
            </div>
          </section>

          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>10M+</h3>
                <p>
                  With over 10M+ views for our clients, we craft high-impact content
                  that captivates and drives engagement.
                </p>
              </div>

              <div className="stat-card">
                <h3>100+</h3>
                <p>
                  With over 100+ clients served, we've partnered with brands of all
                  sizes to create compelling content.
                </p>
              </div>

              <div className="stat-card">
                <h3>10+</h3>
                <p>
                  Our team of 10+ includes creative directors, editors, animators,
                  and a skilled film crew.
                </p>
              </div>
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
    </>
  )
}