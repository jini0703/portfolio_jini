import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Skills() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 95%',
        }
      }
    );

    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 95%',
        }
      }
    );
  }, []);

  const skills = [
    { title: 'Languages', items: ['C', 'C++', 'Python', 'Java'], icon: '</>' },
    { title: 'Web Development', items: ['HTML', 'CSS', 'JavaScript', 'GitHub'], icon: '🌐' },
    { title: 'Core CS', items: ['DSA', 'OOP', 'DBMS', 'Problem Solving'], icon: '🧠' },
    { title: 'Cloud & Tools', items: ['AWS', 'Oracle OCI', 'Git', 'VS Code', 'Generative AI'], icon: '☁️' }
  ];

  return (
    <section 
      ref={containerRef}
      style={{
        padding: '5vh 5vw 10vh 5vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <h2 
        ref={titleRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '3.5rem',
          marginBottom: '4rem',
          color: 'var(--color-primary)',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <span>✧</span> My Skills <span>✧</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        width: '100%'
      }}>
        {skills.map((skillGroup, index) => (
          <div 
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="glass-panel"
            style={{
              padding: '3rem 2rem',
              borderRadius: '30px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              transition: 'all 0.4s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px var(--glass-shadow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px 0 var(--glass-shadow)';
            }}
          >
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'var(--pill-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--glass-border)',
              color: 'var(--color-primary)'
            }}>
              {skillGroup.icon}
            </div>

            <h3 style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1.5rem', 
              color: 'var(--color-text-main)', 
              marginBottom: '1.5rem',
              fontWeight: 600
            }}>
              {skillGroup.title}
            </h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {skillGroup.items.map((item, i) => (
                <li key={i} style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '1.1rem', 
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }}>✦</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
