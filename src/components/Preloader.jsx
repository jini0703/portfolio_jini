import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ loading }) {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Fade in first text
    tl.to(textRef1.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out'
    })
    // Fade out first text
    .to(textRef1.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: 'power2.in',
      delay: 0.2
    })
    // Fade in second text
    .to(textRef2.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    })
    // Fade out container
    .to(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      delay: 0.5
    });

  }, []);

  if (!loading) return null;

  return (
    <div 
      ref={containerRef} 
      className="preloader"
      style={{
        backgroundImage: 'url(/pink_dream_garden.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Deepened overlay to ensure text is perfectly readable over the 4k image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255, 182, 193, 0.5)',
        backdropFilter: 'blur(2px)',
        zIndex: -1
      }} />

      <div 
        ref={textRef1} 
        className="preloader-text glow-text"
        style={{ 
          position: 'absolute',
          color: '#ffffff',
          textShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 10px rgba(255,105,180,0.8)'
        }}
      >
        Entering the Dream Garden...
      </div>
      <div 
        ref={textRef2} 
        className="preloader-text glow-text"
        style={{ 
          position: 'absolute', 
          opacity: 0, 
          transform: 'translateY(20px)',
          color: '#ffffff',
          textShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 10px rgba(255,105,180,0.8)'
        }}
      >
        Close your eyes.
      </div>
    </div>
  );
}
