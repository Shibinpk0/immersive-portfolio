import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import PortfolioHome from './components/PortfolioHome';
import './animations.css';
import './scroll-animations.css';

console.log('%c🚀 Welcome to Shibin\'s Portfolio', 'background: #00F0FF; color: #000; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
console.log('%cInterested in my code? Let\'s talk.', 'color: #888; font-size: 12px;');

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const cursorRef = useRef(null);
  const rafId = useRef(null); // Used to throttle mouse movement

  useEffect(() => {
    // 1. BOOT SCREEN TIMER
    const bootTimer = setTimeout(() => setIsBooted(true), 2200);

    // 2. OPTIMIZED MOUSE TRACKING (Cursor + Background Glow combined)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // RequestAnimationFrame ensures this only runs at the screen's refresh rate (60fps)
      // instead of firing hundreds of times per second which causes lag
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          // Move cursor using Transform (Hardware Accelerated - much faster)
          cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
          
          // Update background glow
          document.documentElement.style.setProperty('--mx', mouseX + 'px');
          document.documentElement.style.setProperty('--my', mouseY + 'px');
          
          rafId.current = null; // Reset for next frame
        });
      }
    };

    // 3. CURSOR HOVER STATES (Optimized to only check specific tags)
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
      clearTimeout(bootTimer);
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (cursorRef.current) cursorRef.current.remove();
    };
  }, []);

  return (
    <div className="app-container">
      <div className={`boot-screen ${isBooted ? 'hidden' : ''}`}>
        <div className="boot-text"> SYSTEM_INIT...</div>
        <div className="boot-bar-container">
          <div className="boot-bar"></div>
        </div>
      </div>

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
    </div>
  );
}