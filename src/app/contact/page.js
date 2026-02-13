'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BackgroundVideo from '../../components/BackgroundVideo'

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const MIN_LOADING_TIME = 1500

    const timer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime)

      setTimeout(() => {
        setIsLoaded(true)
      }, remainingTime)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 1200,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic',
      })
    }
  }, [isLoaded])

  const contactData = {
    representation: [
      {
        region: 'West Coast',
        company: 'Melissa Ross & Reps',
        contacts: [
          { name: 'Melissa Ross', email: 'melissa@rossreps.com' },
          { name: 'Worthy Goodman', email: 'worthy@rossreps.com' }
        ]
      },
      {
        region: 'East Coast',
        company: 'Rep Co',
        contacts: [
          { name: 'Tara Averil', email: 'tara@repco.com' },
          { name: 'John Robertson', email: 'john@repco.com' }
        ]
      }
    ],
    management: [
      {
        category: 'Film & TV',
        company: 'Circle of Confusion',
        contacts: [
          { name: 'Samantha Starr', email: 'samantha@circleofconfusion.com' }
        ]
      }
    ],
    musicVideos: [
      {
        contacts: [
          { name: 'Tommy Labuda', email: 'tommy@5feet4.com', phone: '323.793.1907' }
        ]
      }
    ],
    commercials: [
      {
        region: 'US - London Alley',
        title: 'Executive Producers',
        contacts: [
          { name: 'Luga Podesta', email: 'luga@londonalley.com' },
          { name: 'Matthew Kauth', email: 'matthew@londonalley.com' },
          { name: 'Sandy Haddad', email: 'sandy@londonalley.com' }
        ]
      },
      {
        region: 'France - Phantasm',
        contacts: [
          { name: 'Gary Farkas', email: 'gary@phantasm.fr' },
          { name: 'Olivier Muller', email: 'olivier@phantasm.fr' }
        ]
      }
    ]
  }

  return (
    <>
      <style jsx>{`
        /* ===========================
           SKELETON LOADER STYLES
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

        .sk-hero-title {
          height: clamp(70px, 12vw, 140px);
          width: 60%;
          border-radius: 16px;
          margin: 0 auto 20px;
          background: #111;
        }

        .sk-hero-subtitle {
          height: clamp(30px, 5vw, 50px);
          width: 40%;
          border-radius: 12px;
          margin: 0 auto;
          background: #111;
        }

        .sk-contact-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 40px;
          height: 100%;
        }

        .sk-section-title {
          height: 40px;
          width: 60%;
          border-radius: 8px;
          margin-bottom: 30px;
          background: #1a1a1a;
        }

        .sk-text-line {
          height: 16px;
          border-radius: 4px;
          margin-bottom: 16px;
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

        /* ===========================
           MAIN STYLES
           =========================== */

        .contact-page {
          position: relative;
          min-height: 100vh;
          width: 100%;
          color: #fff;
          overflow-x: hidden;
        }

        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.7) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          z-index: 0;
          pointer-events: none;
          backdrop-filter: blur(2px);
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 140px 40px 80px;
          z-index: 1;
        }

        .hero-title {
          font-size: clamp(60px, 12vw, 140px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
          margin-bottom: 20px;
          mix-blend-mode: difference;
          animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
          font-size: clamp(18px, 3vw, 32px);
          font-weight: 300;
          letter-spacing: 1px;
          opacity: 0.8;
          mix-blend-mode: difference;
          animation: fadeInUp 1s ease-out 0.2s backwards;
        }

        /* Content Section */
        .main-content {
          position: relative;
          z-index: 1;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 40px 100px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }

        /* Contact Cards */
        .contact-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 50px 40px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 136, 0.5),
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .contact-card:hover::before {
          transform: translateX(100%);
        }

        .contact-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 136, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 255, 136, 0.1);
        }

        .section-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin-bottom: 40px;
          background: linear-gradient(135deg, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          padding-bottom: 15px;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, rgba(0, 255, 136, 0.8), transparent);
          border-radius: 2px;
        }

        /* Contact Groups */
        .contact-group {
          margin-bottom: 35px;
        }

        .contact-group:last-child {
          margin-bottom: 0;
        }

        .region-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: rgba(0, 255, 136, 0.7);
          margin-bottom: 8px;
          display: block;
          font-weight: 600;
        }

        .company-name {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          display: block;
          color: rgba(255, 255, 255, 0.95);
        }

        .person-item {
          margin-bottom: 20px;
          padding-left: 15px;
          border-left: 2px solid rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease;
        }

        .person-item:hover {
          border-left-color: rgba(0, 255, 136, 0.5);
        }

        .person-name {
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 6px;
          display: block;
        }

        .contact-link {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
          padding-bottom: 2px;
        }

        .contact-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: rgba(0, 255, 136, 0.8);
          transition: width 0.3s ease;
        }

        .contact-link:hover {
          color: rgba(0, 255, 136, 0.9);
        }

        .contact-link:hover::after {
          width: 100%;
        }

        /* Divider between items */
        .divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          margin: 50px 0;
        }

        /* Footer */
        .copyright-container {
          width: 100%;
          padding: 80px 40px 60px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .copyright {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 400;
          letter-spacing: 1px;
          margin: 0;
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
          transition: all 0.3s ease;
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

        /* Animations */
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

        /* Responsive */
        @media (max-width: 1200px) {
          .contact-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 120px 25px 60px;
            min-height: 50vh;
          }

          .hero-title {
            font-size: 60px;
            letter-spacing: -2px;
          }

          .hero-subtitle {
            font-size: 18px;
          }

          .main-content {
            padding: 0 25px 80px;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .contact-card {
            padding: 35px 25px;
          }

          .section-title {
            font-size: 28px;
            margin-bottom: 30px;
          }

          .copyright-container {
            padding: 60px 25px 40px;
          }

          .copyright {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 48px;
          }

          .contact-card {
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="contact-page">
        <BackgroundVideo />
        <div className="video-overlay" />

        {/* Skeleton Loader */}
        <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>
          <section className="hero-section">
            <div className="skeleton-block sk-hero-title"></div>
            <div className="skeleton-block sk-hero-subtitle"></div>
          </section>

          <section className="main-content">
            <div className="contact-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-block sk-contact-card">
                  <div className="skeleton-block sk-section-title"></div>
                  <div className="skeleton-block sk-text-line" style={{ width: '70%' }}></div>
                  <div className="skeleton-block sk-text-line" style={{ width: '85%' }}></div>
                  <div className="skeleton-block sk-text-line" style={{ width: '60%', marginTop: '25px' }}></div>
                  <div className="skeleton-block sk-text-line" style={{ width: '75%' }}></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Real Content */}
        <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>
          <section className="hero-section">
            <h1 className="hero-title" data-aos="fade-up">Get in Touch</h1>
            <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
              Let's create something extraordinary together
            </p>
          </section>

          <main className="main-content">
            <div className="contact-grid">

              {/* REPRESENTATION CARD */}
              <div className="contact-card" data-aos="fade-up">
                <h2 className="section-title">Representation</h2>

                {contactData.representation.map((item, idx) => (
                  <div key={idx} className="contact-group">
                    <span className="region-label">{item.region}</span>
                    <span className="company-name">{item.company}</span>

                    {item.contacts.map((contact, cIdx) => (
                      <div key={cIdx} className="person-item">
                        <span className="person-name">{contact.name}</span>
                        <a href={`mailto:${contact.email}`} className="contact-link">
                          {contact.email}
                        </a>
                      </div>
                    ))}

                    {idx < contactData.representation.length - 1 && (
                      <div className="divider"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* MANAGEMENT & MUSIC VIDEOS CARD */}
              <div className="contact-card" data-aos="fade-up" data-aos-delay="100">
                <h2 className="section-title">Management</h2>

                {contactData.management.map((item, idx) => (
                  <div key={idx} className="contact-group">
                    <span className="region-label">{item.category}</span>
                    <span className="company-name">{item.company}</span>

                    {item.contacts.map((contact, cIdx) => (
                      <div key={cIdx} className="person-item">
                        <span className="person-name">{contact.name}</span>
                        <a href={`mailto:${contact.email}`} className="contact-link">
                          {contact.email}
                        </a>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="divider"></div>

                <h2 className="section-title">Music Videos</h2>

                {contactData.musicVideos.map((item, idx) => (
                  <div key={idx} className="contact-group">
                    {item.contacts.map((contact, cIdx) => (
                      <div key={cIdx} className="person-item">
                        <span className="person-name">{contact.name}</span>
                        <a href={`mailto:${contact.email}`} className="contact-link">
                          {contact.email}
                        </a>
                        <br />
                        {contact.phone && (
                          <a href={`tel:${contact.phone.replace(/\./g, '')}`} className="contact-link">
                            {contact.phone}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* COMMERCIALS CARD */}
              <div className="contact-card" data-aos="fade-up" data-aos-delay="200">
                <h2 className="section-title">Commercials</h2>

                {contactData.commercials.map((item, idx) => (
                  <div key={idx} className="contact-group">
                    <span className="region-label">{item.region}</span>
                    {item.title && <span className="company-name">{item.title}</span>}

                    {item.contacts.map((contact, cIdx) => (
                      <div key={cIdx} className="person-item">
                        <span className="person-name">{contact.name}</span>
                        <a href={`mailto:${contact.email}`} className="contact-link">
                          {contact.email}
                        </a>
                      </div>
                    ))}

                    {idx < contactData.commercials.length - 1 && (
                      <div className="divider"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* GENERAL INQUIRIES CARD */}
              <div className="contact-card" data-aos="fade-up" data-aos-delay="300">
                <h2 className="section-title">General Inquiries</h2>

                <div className="contact-group">
                  <span className="region-label">Main Office</span>
                  <div className="person-item">
                    <span className="person-name">General Contact</span>
                    <a href="mailto:hello@5feet4.com" className="contact-link">
                      hello@5feet4.com
                    </a>
                    <br />
                    <a href="tel:3237931907" className="contact-link">
                      323.793.1907
                    </a>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="contact-group">
                  <span className="region-label">Careers</span>
                  <div className="person-item">
                    <span className="person-name">Join Our Team</span>
                    <a href="mailto:careers@5feet4.com" className="contact-link">
                      careers@5feet4.com
                    </a>
                  </div>
                </div>
              </div>

            </div>

            <div className="copyright-container">
              <p className="copyright" data-aos="fade-up">
                © 2025 <Link href="/" className="copyright-link">5FEET4</Link>. ALL RIGHTS RESERVED.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}