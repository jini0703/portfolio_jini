import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DreamWorldCanvas from './components/DreamWorldCanvas';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import WelcomeOverlay from './components/WelcomeOverlay';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [introComplete, setIntroComplete] = React.useState(false);
  
  // Auto-detect system preference on first load
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Force the browser to start at the very top (the cave) on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Initialize premium buttery smooth scroll but snappier
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.5 for a more responsive scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis; // Expose for scrollTo

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // CRITICAL FIX: Refresh ScrollTrigger when layout changes so sections actually appear
  useEffect(() => {
    if (introComplete) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [introComplete]);

  useEffect(() => {
    if (introComplete) return;

    const st = ScrollTrigger.create({
      trigger: '#intro-zone',
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Fade out welcome overlay in the first 15% of the scroll
        const welcomeOverlay = document.getElementById('welcome-overlay');
        if (welcomeOverlay) {
          const opacity = Math.max(0, 1 - (progress * 6));
          welcomeOverlay.style.opacity = opacity;
          welcomeOverlay.style.transform = `translateY(${progress * -100}px)`;
        }
      },
      onLeave: () => {
        setIntroComplete(true);
        // Instantly snap scroll to top using Lenis to prevent layout/scroll fighting
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

    return () => st.kill();
  }, [introComplete]);

  return (
    <>
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 100 }}>
        <button 
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          style={{
            padding: '12px 24px',
            borderRadius: '30px',
            border: `1px solid var(--glass-border)`,
            background: 'var(--glass-bg)',
            color: 'var(--color-primary)',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontWeight: 'bold',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px var(--glass-shadow)',
            transition: 'all 0.3s ease'
          }}
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      {!introComplete && <WelcomeOverlay />}

      {/* Fixed Animated 3D Background */}
      <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <DreamWorldCanvas introComplete={introComplete} theme={theme} />
      </div>

      {/* Main Scroll Container */}
      <div id="scroll-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        
        {/* The Intro Scroll Zone - User scrolls this to trigger the 3D Zoom */}
        {!introComplete && (
          <div id="intro-zone" style={{ height: '300vh', width: '100%' }}>
            {/* The scroll indicator was moved to WelcomeOverlay */}
          </div>
        )}

        {/* Normal Website Content Starts Here */}
        <div id="portfolio-content" style={{ position: 'relative', zIndex: 10 }}>
          <Hero />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
