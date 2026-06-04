import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Certificates() {
  const containerRef = useRef(null);
  const certRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(certRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: certRef.current,
          start: 'top 95%',
        }
      }
    );

    cardsRef.current.forEach((el, index) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          delay: index * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
          }
        }
      );
    });
  }, []);

  const certs = [
    { title: "Data Analytics Job Simulation", org: "Deloitte", icon: "📑", link: "https://drive.google.com/file/d/1efHEH9KRo4bxq3R2rVBqMl1BjYjZH8Do/preview" },
    { title: "AWS Technical Essentials", org: "AWS", icon: "☁️", link: "https://drive.google.com/file/d/1uaGQJrquk27VjzRtdsBkVxDoghC-5WQ7/preview" },
    { title: "AWS Cloud Practitioner Essentials", org: "AWS", icon: "☁️", link: "https://drive.google.com/file/d/19kaKdouYiPSLp00ljn8716_HW7BxbO0A/preview" },
    { title: "AWS Certified Cloud Practitioner", org: "AWS", icon: "🎓", link: "https://drive.google.com/file/d/1JckMJHxKjGdKJ22bVjIUUTEKYjwTVgbR/preview" },
    { title: "Generative AI Foundations", org: "AWS Academy", icon: "🧠", link: "https://drive.google.com/file/d/1CeTIbuE4dhv18fqQAgqTf3Jh4UjjYKXF/preview" },
    { title: "OCI AI Foundations Associate", org: "Oracle University", icon: "🏛️", link: "https://drive.google.com/file/d/1apE-tNuP4-TQnEtbBJY8J4MLftd-p4OJ/preview" },
    { title: "OCI Gen AI Professional", org: "Oracle University", icon: "🏆", link: "https://drive.google.com/file/d/1G82QlCQBemn1brxuSzc42fiCGT7evboF/preview" }
  ];

  return (
    <section 
      style={{
        padding: '5vh 5vw 15vh 5vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <h2 
        ref={certRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '3.5rem',
          color: 'var(--color-primary)',
          marginBottom: '4rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <span>✧</span> My Certificates <span>✧</span>
      </h2>
        
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        width: '100%',
        justifyContent: 'center'
      }}>
        {certs.map((cert, i) => (
          <a 
            key={i} 
            ref={el => cardsRef.current[i] = el}
            href={cert.link} 
            target="_blank" 
            rel="noreferrer"
            className="glass-panel"
            style={{
              padding: '2.5rem 1.5rem',
              borderRadius: '24px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
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
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--pill-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--glass-border)'
            }}>
              {cert.icon}
            </div>
            <h3 style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1.2rem', 
              color: 'var(--color-text-main)',
              marginBottom: '0.8rem',
              fontWeight: 600
            }}>
              {cert.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic'
            }}>
              {cert.org}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
