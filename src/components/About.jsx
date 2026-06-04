import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 100 },
      {
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 95%',
        }
      }
    );

    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 50, scale: 0.9, rotationX: 10 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
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
    { title: 'Languages', items: ['C', 'C++', 'Python', 'Java'] },
    { title: 'Web Development', items: ['HTML', 'CSS', 'JavaScript', 'GitHub'] },
    { title: 'Core CS', items: ['DSA', 'OOP', 'DBMS', 'Problem Solving'] },
    { title: 'Cloud & Tools', items: ['AWS', 'Oracle OCI', 'Git', 'VS Code', 'Generative AI'] }
  ];

  return (
    <section 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        padding: '10vh 10vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        perspective: '1000px'
      }}
    >
      <div 
        ref={contentRef}
        style={{
          display: 'flex',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '6rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <div className="glass" style={{ padding: '1rem', borderRadius: '30px', transform: 'rotate(-3deg)' }}>
            <img 
              src="https://drive.google.com/thumbnail?id=12EbuAYqe_pjYoi1DvuA52xnpIgEDcf7t&sz=w1000" 
              alt="Anjini Pandey" 
              style={{
                width: '100%',
                borderRadius: '20px',
                display: 'block',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
            />
          </div>
        </div>

        <div style={{ flex: '2 1 400px' }}>
          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '4rem',
              marginBottom: '1.5rem',
              color: 'var(--color-primary)',
              textShadow: '0 0 20px rgba(255,105,180,0.3)'
            }}
          >
            About Me
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.4rem',
            lineHeight: '1.8',
            color: 'var(--color-text-main)',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            I am Anjini Pandey, a B.Tech CSE student at VIT Vellore passionate about web development, cloud computing, and exploring generative AI. I enjoy building modern projects and constantly learning new technologies.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {skills.map((skillGroup, index) => (
          <div 
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="glass-panel"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              transformStyle: 'preserve-3d',
              transition: 'all 0.4s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px var(--glass-shadow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 30px var(--glass-shadow)';
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
              {skillGroup.title}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {skillGroup.items.map((item, i) => (
                <li key={i} style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '1.1rem', 
                  color: 'var(--color-text-main)',
                  marginBottom: '0.8rem',
                  opacity: 0.9
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
