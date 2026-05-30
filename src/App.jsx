import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // <-- Added this import!
import Navbar from './components/Navbar';
import PortfolioHome from './components/PortfolioHome';
import LandingScene from './components/LandingScene';

import './animations.css';
import './scroll-animations.css';

console.log('%c🚀 Welcome to Shibin\'s Portfolio', 'background: #00F0FF; color: #000; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');

export default function App() {
  // We start directly at 'overture' now! No more boring boot screen.
  const [stage, setStage] = useState('overture'); 
  const cursorRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    // OPTIMIZED MOUSE TRACKING (Your v1 code)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
          document.documentElement.style.setProperty('--mx', mouseX + 'px');
          document.documentElement.style.setProperty('--my', mouseY + 'px');
          rafId.current = null;
        });
      }
    };

    const handleMouseOver = (e) => {
      const t = e.target;
      if (t.tagName === 'BUTTON' || t.tagName === 'A' || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.closest('button') || t.closest('a') || t.closest('.project-card')) {
        cursor.classList.add('cursor-hover');
      } else {
        cursor.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (cursorRef.current) cursorRef.current.remove();
    };
  }, []);

  // Lock scrolling during Overture, unlock for Portfolio
  useEffect(() => {
    if (stage === 'portfolio') {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [stage]);

  return (
    <>
      {/* STAGE 1: PROJECT OVERTURE (Cinematic Room Zoom) */}
      {stage === 'overture' && (
        <LandingScene setStage={setStage} />
      )}

      {/* STAGE 2: YOUR V1 PORTFOLIO (Fades in smoothly from the black) */}
      {stage === 'portfolio' && (
        <motion.div 
          className="app-container"
          initial={{ opacity: 0 }} // Starts invisible (black)
          animate={{ opacity: 1 }}  // Fades in seamlessly
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mouse-glow"></div>

          <div className="bg-scroll-wrapper top-20">
            <div className="bg-scroll-track">
              <span className="bg-scroll-text">DEVELOPER &nbsp;&nbsp;&nbsp; FULL STACK &nbsp;&nbsp;&nbsp; REACT &nbsp;&nbsp;&nbsp; JAVASCRIPT &nbsp;&nbsp;&nbsp; NODE.JS &nbsp;&nbsp;&nbsp; TYPESCRIPT &nbsp;&nbsp;&nbsp;</span>
              <span className="bg-scroll-text">DEVELOPER &nbsp;&nbsp;&nbsp; FULL STACK &nbsp;&nbsp;&nbsp; REACT &nbsp;&nbsp;&nbsp; JAVASCRIPT &nbsp;&nbsp;&nbsp; NODE.JS &nbsp;&nbsp;&nbsp; TYPESCRIPT &nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>

          <div className="bg-scroll-wrapper bottom-20 reverse">
            <div className="bg-scroll-track">
              <span className="bg-scroll-text">MONGODB &nbsp;&nbsp;&nbsp; NEXT.JS &nbsp;&nbsp;&nbsp; UI/UX &nbsp;&nbsp;&nbsp; TAILWIND &nbsp;&nbsp;&nbsp; DOCKER &nbsp;&nbsp;&nbsp; GRAPHQL &nbsp;&nbsp;&nbsp;</span>
              <span className="bg-scroll-text">MONGODB &nbsp;&nbsp;&nbsp; NEXT.JS &nbsp;&nbsp;&nbsp; UI/UX &nbsp;&nbsp;&nbsp; TAILWIND &nbsp;&nbsp;&nbsp; DOCKER &nbsp;&nbsp;&nbsp; GRAPHQL &nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>

          <Navbar />
          <PortfolioHome />
        </motion.div>
      )}
    </>
  );
}