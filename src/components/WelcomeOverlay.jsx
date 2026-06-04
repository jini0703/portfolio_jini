import React from 'react';

export default function WelcomeOverlay() {
  return (
    <>
    <style>
      {`
        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 10px); }
        }
      `}
    </style>
    <div 
      id="welcome-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        padding: '5vw'
      }}
    >
      <div className="glass-panel" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4rem',
        padding: '4rem 5rem',
        borderRadius: '40px',
        maxWidth: '1100px',
        width: '100%',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        border: '2px solid var(--glass-border)',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        
        {/* Left Side: Photo */}
        <div style={{
          padding: '1rem',
          background: 'var(--glass-bg)',
          borderRadius: '32px',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 0 30px var(--glass-shadow)',
          flexShrink: 0
        }}>
          <img 
            src="https://drive.google.com/thumbnail?id=12EbuAYqe_pjYoi1DvuA52xnpIgEDcf7t&sz=w1000" 
            alt="Anjini Pandey" 
            style={{
              width: '280px',
              height: '350px',
              objectFit: 'cover',
              objectPosition: 'center 15%', // Perfectly centers on the face
              borderRadius: '24px',
              display: 'block'
            }}
          />
        </div>

        {/* Right Side: Details */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          textAlign: 'left',
          flex: '1 1 300px'
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            ✦ Welcome to my portfolio ✦
          </p>
          
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '4.5rem',
            margin: '0 0 1rem 0',
            color: 'var(--color-text-main)',
            textShadow: '0 0 20px var(--text-glow)',
            lineHeight: 1.1
          }}>
            Anjini Pandey
          </h1>
          
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
            margin: 0,
            lineHeight: 1.6
          }}>
            CSE Student • Web Developer • Cloud & AI Enthusiast
          </h2>
        </div>
      </div>

      {/* Scroll to Enter Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '8vh',
        left: '50%',
        animation: 'bounce-slow 2s infinite ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--color-primary)'
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontWeight: 700,
          opacity: 0.8
        }}>
          Scroll to Enter
        </span>
        <span style={{ fontSize: '1.2rem', opacity: 0.8 }}>↓</span>
      </div>
    </div>
    </>
  );
}
