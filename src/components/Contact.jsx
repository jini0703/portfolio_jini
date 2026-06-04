import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
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

  const contacts = [
    { title: "Phone", value: "+91 9958474205", icon: "📞", link: "tel:+919958474205" },
    { title: "Personal Email", value: "anjinipandey71@gmail.com", icon: "✉️", link: "mailto:anjinipandey71@gmail.com" },
    { title: "College Email", value: "anjini.pandey2024@vitstudent.ac.in", icon: "🎓", link: "mailto:anjini.pandey2024@vitstudent.ac.in" },
    { title: "LinkedIn", value: "linkedin.com/in/anjini-pandey-76a479319", icon: "🔗", link: "https://www.linkedin.com/in/anjini-pandey-76a479319" },
    { title: "GitHub", value: "github.com/jini0703", icon: "💻", link: "https://github.com/jini0703" },
    { title: "Location", value: "Faridabad, India", icon: "📍", link: "#" }
  ];

  return (
    <section 
      ref={containerRef}
      style={{
        padding: '5vh 5vw 15vh 5vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <h2 
        ref={titleRef}
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
        <span>✧</span> Let's Connect <span>✧</span>
      </h2>
        
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        justifyContent: 'center'
      }}>
        {contacts.map((contact, i) => (
          <a 
            key={i} 
            ref={el => cardsRef.current[i] = el}
            href={contact.link} 
            target={contact.link !== "#" ? "_blank" : "_self"}
            rel="noreferrer"
            className="glass-panel"
            style={{
              padding: '2rem 1.5rem',
              borderRadius: '24px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px var(--glass-shadow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px 0 var(--glass-shadow)';
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--pill-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              border: '1px solid var(--glass-border)',
              flexShrink: 0
            }}>
              {contact.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <h3 style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '1rem', 
                color: 'var(--color-primary)',
                marginBottom: '0.3rem',
                fontWeight: 600
              }}>
                {contact.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: 'var(--color-text-main)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {contact.value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
