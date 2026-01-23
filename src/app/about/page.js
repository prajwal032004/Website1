'use client'

import { useEffect } from 'react'

export default function About() {
    useEffect(() => {
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
    }, [])

    return (
        <>
            <style jsx>{`
        body.blur-active .background-video {
          filter: blur(10px);
        }

        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
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
          padding: 60px 40px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 16px;
          backdrop-filter: blur(10px);
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
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .trusted-header h2 {
          font-size: 1.2rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .carousel-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .logo-track {
          display: flex;
          gap: 80px;
          align-items: center;
          width: fit-content;
          animation: scroll 25s linear infinite;
        }

        .logo-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .logo-track img {
          height: 40px;
          width: auto;
          object-fit: contain;
          opacity: 0.6;
          filter: grayscale(1) brightness(2);
          transition: all 0.4s ease;
          flex-shrink: 0;
        }

        .logo-track img:hover {
          opacity: 1;
          filter: grayscale(0) brightness(1);
          transform: scale(1.15);
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
          background: rgba(255, 255, 255, 0.05);
          padding: 50px 40px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-5px);
        }

        .stat-card h3 {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-card p {
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 110px;
          }

          #team-section {
            padding: 80px 20px;
          }

          .team-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>

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
                    {[
                        {
                            img: 'https://framerusercontent.com/images/kzXamvuqsPYwBBGCcSPysFAeNg.png',
                            name: 'John',
                            role: 'Content Strategist',
                            desc: 'Driving creative direction for high-performing social media content. Focused on crafting scroll-stopping visuals and messaging.',
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
                    ].map((member, index) => (
                        <div key={index} className="team-card" data-aos="fade-up" data-aos-delay={index * 100}>
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
                            "We don't just capture moments—we create magic through our lens. Every frame tells a story, every shot brings dreams to life."
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
                        {[
                            'https://framerusercontent.com/images/k1pA1LiCJg6nUlCNRlaxu8SZDog.png',
                            'https://framerusercontent.com/images/cRAFkDiaKDUHopQXqhZTPMgY1s.png',
                            'https://framerusercontent.com/images/evN3P0cbS9xsJjpDA9L5ibL4.png',
                            'https://framerusercontent.com/images/k4O62oeDUdl4WVuArbshE8e40o.png',
                            'https://framerusercontent.com/images/q3wQHUngCJoGMPGvAkCaZAVtPk.png',
                            'https://framerusercontent.com/images/k1pA1LiCJg6nUlCNRlaxu8SZDog.png',
                            'https://framerusercontent.com/images/cRAFkDiaKDUHopQXqhZTPMgY1s.png',
                            'https://framerusercontent.com/images/evN3P0cbS9xsJjpDA9L5ibL4.png',
                            'https://framerusercontent.com/images/k4O62oeDUdl4WVuArbshE8e40o.png',
                            'https://framerusercontent.com/images/q3wQHUngCJoGMPGvAkCaZAVtPk.png',
                        ].map((logo, i) => (
                            <img key={i} src={logo} alt={`Client ${i + 1}`} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card" data-aos="zoom-in">
                        <h3>10M+</h3>
                        <p>With over 10M+ views for our clients, we craft high-impact content that captivates and drives engagement.</p>
                    </div>

                    <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
                        <h3>100+</h3>
                        <p>With over 100+ clients served, we've partnered with brands of all sizes to create compelling content.</p>
                    </div>

                    <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
                        <h3>10+</h3>
                        <p>Our team of 10+ includes creative directors, editors, animators, and a skilled film crew.</p>
                    </div>
                </div>
            </section>
        </>
    )
}