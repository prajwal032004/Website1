'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function About() {
  const scrollSectionRef = useRef(null)
  const scrollTextRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // ... [Keep existing data arrays: teamMembers, logos] ...
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
    'https://framerusercontent.com/images/k1pA1LiCJg6nUlCNRlaxu8SZDog.png',
    'https://framerusercontent.com/images/cRAFkDiaKDUHopQXqhZTPMgY1s.png',
    'https://framerusercontent.com/images/evN3P0cbS9xsJjpDA9L5ibL4.png',
    'https://framerusercontent.com/images/k4O62oeDUdl4WVuArbshE8e40o.png',
    'https://framerusercontent.com/images/q3wQHUngCJoGMPGvAkCaZAVtPk.png',
  ]

  useEffect(() => {
    const startTime = Date.now()
    const MIN_LOADING_TIME = 2500

    const uniqueTeamImages = [...new Set(teamMembers.map((m) => m.img))]
    const allImageUrls = [...uniqueTeamImages, ...logos]

    const imagePromises = allImageUrls.map((src) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = () => resolve(src)
        img.src = src
      })
    })

    Promise.all(imagePromises).then(() => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime)

      setTimeout(() => {
        setIsLoaded(true)
      }, remainingTime)
    })
  }, [])

  useEffect(() => {
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

  // Scroll text animation
  useEffect(() => {
    if (!isLoaded) return

    const scrollText = scrollTextRef.current
    const scrollSection = scrollSectionRef.current

    if (!scrollText || !scrollSection) return

    const fullText = scrollText.textContent.trim()
    const words = fullText.split(/\s+/).filter((w) => w.length > 0)

    scrollText.innerHTML = words
      .map((w) => `<span class="word">${w}</span>`)
      .join(' ')

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
        if (i < activeCount) {
          el.classList.add('active')
        } else {
          el.classList.remove('active')
        }
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
        .sk-hero-title-line {
          height: clamp(60px, 10vw, 120px);
          width: 70%;
          border-radius: 12px;
          margin-bottom: 20px;
          background: #111;
        }
        
        .sk-hero-title-line.short {
          width: 20%; /* "About" */
        }
        
        .sk-hero-title-line.shorter {
          width: 15%; /* "Us" - Very small */
        }

        /* Team Card Skeleton */
        .sk-card {
          aspect-ratio: 3/4;
          background: #121212;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
        }
        
        .sk-card-text {
          width: 60%;
          height: 24px;
          border-radius: 4px;
          margin-bottom: 12px;
          background: #1a1a1a;
        }
        .sk-card-sub {
          width: 40%;
          height: 16px;
          border-radius: 4px;
          margin-bottom: 24px;
          background: #1a1a1a;
        }
        .sk-card-desc-line {
          width: 100%;
          height: 12px;
          border-radius: 2px;
          margin-bottom: 8px;
          background: #1a1a1a;
        }

        /* Wisdom Text Skeleton */
        .sk-wisdom-box {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .sk-text-line {
          height: 20px;
          border-radius: 4px;
          background: #1a1a1a;
        }

        /* Logos Skeleton */
        .sk-logo {
          width: 140px;
          height: 40px;
          background: #161616;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.03);
        }

        /* Stats Skeleton */
        .sk-stat-card {
          background: rgba(255, 255, 255, 0.02);
          padding: 60px 40px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          height: 100%;
        }
        .sk-stat-num {
          width: 120px;
          height: 60px;
          border-radius: 8px;
          margin-bottom: 24px;
          background: #1a1a1a;
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
        }
        .content-wrapper.loaded {
          opacity: 1;
        }

        /* [Existing styles unchanged...] */
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
          transition: transform 0.3s ease;
        }
        .team-card:hover {
          transform: scale(1.02);
        }
        .team-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          background-color: #00000069;
        }
        .team-card:hover img {
          transform: scale(1.1);
        }
        .team-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
          padding: 30px;
          transform: translateY(0);
          transition: all 0.3s ease;
        }
        .team-info h3 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .team-info p {
          font-size: 16px;
          opacity: 0.7;
          margin-bottom: 15px;
        }
        .team-description {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
        }
        .wisdom-section {
          margin: 80px auto;
          padding: 80px 40px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 16px;
          backdrop-filter: blur(5px);
          max-width: 1200px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .wisdom-section p:first-child {
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 20px;
        }
        .wisdom-section p:last-child {
          font-size: 1rem;
          opacity: 0.6;
        }
        .trusted-section {
          padding: 80px 20px;
          text-align: center;
          overflow: hidden;
        }
        .trusted-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-bottom: 60px;
        }
        .pulse-dot {
          width: 12px;
          height: 12px;
          background: #ff0000;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .trusted-header h2 {
          font-size: 1.2rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .carousel-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .logo-track {
          display: flex;
          gap: 80px;
          align-items: center;
          width: fit-content;
          animation: scroll 25s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-track img {
          height: 40px;
          opacity: 0.6;
          filter: grayscale(1) brightness(2);
          transition: all 0.4s ease;
        }
        .logo-track img:hover {
          opacity: 1;
          filter: grayscale(0) brightness(1);
          transform: scale(1.1);
        }
        .scroll-text-section {
          padding: 100px 40px;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .text-container {
          max-width: 1200px;
          width: 100%;
          text-align: center;
        }
        .scroll-text {
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.6;
          font-weight: 400;
        }
        :global(.scroll-text .word) {
          opacity: 0.2;
          transition: opacity 0.3s ease;
        }
        :global(.scroll-text .word.active) {
          opacity: 1;
        }
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
          background: rgba(255, 255, 255, 0.03);
          padding: 60px 40px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }
        .stat-card h3 {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 90px; }
          #team-section { padding: 80px 20px; }
          .team-grid, .stats-grid { grid-template-columns: 1fr; }
          .scroll-text-section { padding: 60px 20px; }
          .copyright-container { padding: 40px 20px; }
          .copyright { font-size: 12px; text-align: center; }
        }
      `}</style>

      {/* =======================
          AESTHETIC SKELETON
          ======================= */}
      <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>

        {/* 1. Hero Skeleton */}
        <section className="hero-section">
          {/* Top line (About) */}
          <div className="skeleton-block sk-hero-title-line short"></div>
          {/* Bottom line (Us) - EXTRA SMALL */}
          <div className="skeleton-block sk-hero-title-line shorter"></div>
        </section>

        {/* 2. Team Section Skeleton */}
        <section id="team-section">
          <div className="team-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-block sk-card">
                <div className="skeleton-block sk-card-text"></div>
                <div className="skeleton-block sk-card-sub"></div>
                <div className="skeleton-block sk-card-desc-line" style={{ width: '95%' }}></div>
                <div className="skeleton-block sk-card-desc-line" style={{ width: '80%' }}></div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Wisdom/Quote Skeleton */}
        <section className="scroll-text-section">
          <div className="text-container">
            <div className="sk-wisdom-box">
              <div className="skeleton-block sk-text-line" style={{ width: '90%', height: '30px' }}></div>
              <div className="skeleton-block sk-text-line" style={{ width: '70%', height: '30px' }}></div>
              <div className="skeleton-block sk-text-line" style={{ width: '30%', marginTop: '20px' }}></div>
            </div>
          </div>
        </section>

        {/* 4. Trusted By Skeleton */}
        <section className="trusted-section">
          <div className="trusted-header" style={{ opacity: 0.5 }}>
            <div className="skeleton-block" style={{ width: '150px', height: '14px', borderRadius: '4px' }}></div>
          </div>
          <div style={{ display: 'flex', gap: '80px', justifyContent: 'center', opacity: 0.6 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-block sk-logo"></div>
            ))}
          </div>
        </section>

        {/* 5. Long Scroll Text Skeleton */}
        <section className="scroll-text-section">
          <div className="text-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <div className="skeleton-block sk-text-line" style={{ width: '100%' }}></div>
            <div className="skeleton-block sk-text-line" style={{ width: '92%' }}></div>
            <div className="skeleton-block sk-text-line" style={{ width: '98%' }}></div>
            <div className="skeleton-block sk-text-line" style={{ width: '85%' }}></div>
            <div className="skeleton-block sk-text-line" style={{ width: '60%' }}></div>
          </div>
        </section>

        {/* 6. Stats Skeleton */}
        <section className="stats-section">
          <div className="stats-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-block sk-stat-card">
                <div className="skeleton-block sk-stat-num"></div>
                <div className="skeleton-block sk-text-line" style={{ width: '90%', marginBottom: '10px' }}></div>
                <div className="skeleton-block sk-text-line" style={{ width: '70%' }}></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* =======================
          REAL CONTENT
          ======================= */}
      <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <section className="hero-section">
          <div className="hero-content" data-aos="fade-up">
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
              <div
                key={index}
                className="team-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img src={member.img} alt={member.name} />
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
            <div className="wisdom-section" data-aos="fade-up">
              <p>
                "We don't just capture moments—we create magic through our lens.
                Every frame tells a story, every shot brings dreams to life."
              </p>
              <p>— The 5feet4 Team</p>
            </div>
          </div>
        </section>

        <section className="trusted-section">
          <div className="trusted-header" data-aos="fade-up">
            <div className="pulse-dot"></div>
            <h2>TRUSTED BY</h2>
          </div>

          <div className="carousel-container">
            <div className="logo-track">
              {[...logos, ...logos].map((logo, i) => (
                <img key={i} src={logo} alt={`Client ${(i % logos.length) + 1}`} />
              ))}
            </div>
          </div>
        </section>

        <section ref={scrollSectionRef} className="scroll-text-section">
          <div className="text-container">
            <p ref={scrollTextRef} className="scroll-text">
              Specializing in creative direction and full-scale production, Moment
              Studios guides your brand from concept to final delivery. From
              pre-production planning to post-production polish, we lead the
              entire process ensuring impactful content that resonates across
              social media, commercials, and creative campaigns.
            </p>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card" data-aos="zoom-in">
              <h3>10M+</h3>
              <p>
                With over 10M+ views for our clients, we craft high-impact content
                that captivates and drives engagement.
              </p>
            </div>

            <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
              <h3>100+</h3>
              <p>
                With over 100+ clients served, we've partnered with brands of all
                sizes to create compelling content.
              </p>
            </div>

            <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
              <h3>10+</h3>
              <p>
                Our team of 10+ includes creative directors, editors, animators,
                and a skilled film crew.
              </p>
            </div>
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