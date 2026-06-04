import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Projects() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef([]);

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

    projectsRef.current.forEach((el, index) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
          }
        }
      );
    });
  }, []);

  const projects = [
    { 
      id: "01",
      title: "CURO", 
      subtitle: "AI-Powered Career Assistant",
      desc: "Engineered a full-stack AI-driven career companion featuring comprehensive resume parsing, interview preparation workflows, and personalized job recommendation engines.",
      tech: ["React", "TypeScript", "Supabase", "TanStack"],
      link: "https://curo-five.vercel.app/",
      img: "/proj_curo.png"
    },
    { 
      id: "02",
      title: "Pixel Canvas", 
      subtitle: "Interactive Web Application",
      desc: "A digital drawing tool allowing users to create custom grid sizes and select brush colors to design pixel artwork effortlessly.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://jini0703.github.io/all-tasks-project/ass2/index.html",
      img: "/proj_pixel.png"
    },
    { 
      id: "03",
      title: "Roommate Finder", 
      subtitle: "Full-Stack Platform",
      desc: "A platform designed to help college students find highly compatible roommates based on detailed lifestyle preferences and habits.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://jini0703.github.io/all-tasks-project/group%20project/index.html",
      img: "/proj_roommate.png"
    },
    { 
      id: "04",
      title: "Web Dev Archive", 
      subtitle: "Collection of My Work",
      desc: "A complete collection of all my front-end development assignments, mini-projects, and creative UI experiments.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://jini0703.github.io/all-tasks-project/",
      img: "/proj_archive.png"
    }
  ];

  return (
    <section 
      ref={containerRef}
      style={{
        padding: '10vh 5vw',
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
        <span>✧</span> My Projects <span>✧</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '3rem',
        width: '100%'
      }}>
        {projects.map((proj, i) => (
          <div 
            key={i}
            ref={el => projectsRef.current[i] = el}
            className="glass-panel"
            style={{
              padding: '2.5rem',
              borderRadius: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
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
            {/* ID Badge */}
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              color: 'var(--color-primary)',
              fontWeight: 'bold',
              opacity: 0.8
            }}>
              {proj.id}
            </div>

            {/* Circular Illustration */}
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'var(--pill-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
              border: '2px solid var(--glass-border)',
              overflow: 'hidden'
            }}>
              <img src={proj.img} alt={proj.title} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
            </div>
            
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '2.2rem',
              color: 'var(--color-text-main)',
              marginBottom: '0.5rem',
              textAlign: 'center',
              fontWeight: 600
            }}>
              {proj.title}
            </h3>
            
            <h4 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              color: 'var(--color-primary)',
              marginBottom: '1.5rem',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              {proj.subtitle}
            </h4>
            
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              textAlign: 'center',
              flexGrow: 1
            }}>
              {proj.desc}
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '0.8rem', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              {proj.tech.map((t, index) => (
                <span key={index} className="tech-pill">{t}</span>
              ))}
            </div>
            
            <a href={proj.link} target="_blank" rel="noreferrer" className="btn-premium" style={{ width: '100%' }}>
              View Project ➔
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
