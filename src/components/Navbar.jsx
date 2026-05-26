import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`top-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={(e) => scrollToSection(e, 'home')}>
          <span className="dot"></span> Shibin
        </a>
        
        <ul className="navbar-links">
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
          <li><a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a></li>
          <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a></li>
          <li><a href="#experience" onClick={(e) => scrollToSection(e, 'experience')}>Experience</a></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
        </ul>

        <div className="navbar-connect">
          <a href="mailto:pkshibin82@gmail.com">pkshibin82@gmail.com</a>
        </div>
      </div>
    </nav>
  );
}
