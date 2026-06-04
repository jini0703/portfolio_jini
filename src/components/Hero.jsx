import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        padding: '15vh 5vw 10vh 5vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4rem',
        alignItems: 'stretch',
        width: '100%',
        justifyContent: 'center'
      }}>
        
        {/* Left Side: Portrait & Name */}
        <div style={{
          flex: '1 1 400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: '2rem',
            fontWeight: 600
          }}>
            ✦ Welcome to my portfolio ✦
          </p>
          
          <div style={{
            padding: '1.5rem',
            background: 'var(--glass-bg)',
            borderRadius: '40px',
            border: '2px solid var(--glass-border)',
            boxShadow: '0 0 40px var(--glass-shadow)',
            marginBottom: '2.5rem',
            position: 'relative'
          }}>
            <img 
              src="/profile.jpeg"
              alt="Anjini Pandey" 
              style={{
                width: '100%',
                maxWidth: '350px',
                borderRadius: '24px',
                display: 'block'
              }}
            />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '4rem',
            margin: '0 0 0.5rem 0',
            color: 'var(--color-text-main)',
            textShadow: '0 0 20px var(--text-glow)'
          }}>
            Anjini Pandey ✦
          </h1>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
            letterSpacing: '0.05em'
          }}>
            CSE Student • Web Developer • Cloud & AI Enthusiast
          </h2>
        </div>

        {/* Right Side: About Box */}
        <div style={{
          flex: '1.5 1 500px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div className="glass-panel" style={{
            padding: '4rem 3.5rem',
            borderRadius: '40px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.5rem',
              color: 'var(--color-primary)',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span>✧</span> About Me <span>✧</span>
            </h2>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.2rem',
              color: 'var(--color-text-main)',
              marginBottom: '1rem'
            }}>
              Hi, I'm Anjini Pandey ♡
            </h3>
            
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: 'var(--color-primary)',
              fontWeight: 600,
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              CSE Student • Web Developer • Cloud & AI Enthusiast
            </p>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'var(--color-text-muted)',
              marginBottom: '3rem'
            }}>
              I am a B.Tech CSE student at VIT Vellore passionate about web development, cloud computing, and exploring generative AI. I enjoy building modern projects and constantly learning new technologies.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a 
                href="https://drive.google.com/file/d/1g_Cj9RXy5367DA_ZQK4mxRMSBeBP5l69/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn-premium"
                style={{ background: 'var(--pill-bg)', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}
              >
                View Resume ➔
              </a>
              <a 
                href="https://www.linkedin.com/in/anjini-pandey-76a479319"
                target="_blank"
                rel="noreferrer"
                className="btn-premium"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
