import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import AnimatedAvatar from './AnimatedAvatar';

// --- TYPEWRITER HOOK ---
function useTypewriter(text, speed = 30) {
  const [displayText, setDisplayText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.substring(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, done };
}

// PERFORMANCE FIX: Lazy load the heavy 3D component
const TechScene = lazy(() => import('./TechScene')); 

const Icons = {
  Code: () => (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>),
  Globe: () => (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>),
  Brain: () => (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>),
  Download: () => (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>),
  ArrowRight: () => (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>),
  Send: () => (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>),
  Mail: () => (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-2 11H4a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2z" /></svg>),
  MapPin: () => (<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
  ExternalLink: () => (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>),
  Github: () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>),
  Linkedin: () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>),
  Twitter: () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>),
  Instagram: () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>),
  React: () => (<svg viewBox="-11.5 -10.23174 23 20.46348" width="28" height="28"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>),
  Nextjs: () => (<svg viewBox="0 0 180 180" width="28" height="28" fill="none"><circle cx="90" cy="90" r="90" fill="white"/><path d="M149.508 157.52L69.142 54H54v72h13.5v-50.53l70.183 90.31a90 90 0 0011.825-8.26z" fill="black"/><rect x="112.5" y="54" width="13.5" height="72" fill="black"/></svg>),
  Tailwind: () => (<svg viewBox="0 0 248 31" width="44" height="16" fill="none"><path d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.146-2.551 3.382-5.528 4.65-8.93 3.805-1.942-.482-3.33-1.882-4.865-3.432C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.433-2.502-2.524-5.398-5.445-11.722-5.445z" fill="#38bdf8"/></svg>),
  Javascript: () => (<svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="4" fill="#f7df1e"/><text x="8" y="25" fill="#000" fontSize="16" fontFamily="system-ui" fontWeight="bold">JS</text></svg>),
};

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); observer.unobserve(el); } }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
    observer.observe(el); return () => observer.disconnect();
  }, []);
  return ref;
}

function ProjectCard({ proj }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`glass-panel project-card ${expanded ? 'project-expanded' : ''}`} onClick={() => setExpanded(v => !v)}>
      
      {/* NEW: VISUAL PROJECT HEADER */}
      <div style={{ 
        height: '140px', 
        background: `linear-gradient(135deg, ${proj.iconColor}15, ${proj.iconColor}05)`, 
        borderRadius: '12px', 
        marginBottom: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: `1px solid ${proj.iconColor}20`
      }}>
        <div style={{ transform: 'scale(2.5)', opacity: 0.8, color: proj.iconColor }}><Icons.Code /></div>
      </div>

      <div className="project-card-glow" style={{ '--proj-color': proj.iconColor }} />
      <div className="project-card-header"><div className="project-icon-box" style={{ background: `${proj.iconColor}18`, color: proj.iconColor }}><Icons.Code /></div><span className="project-category-label">{proj.category}</span></div>
      <h3 className="project-title">{proj.title}</h3><div className="project-subtitle" style={{ color: proj.iconColor }}>{proj.subtitle}</div>
      <p className="project-desc">{proj.desc}</p>
      <div className="project-tags">{proj.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}</div>
      <div className={`project-links ${expanded ? 'links-visible' : ''}`}>
        <a href={proj.liveUrl || '#'} className="project-btn solid" onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer">Live Demo <Icons.ExternalLink /></a>
        <a href={proj.githubUrl || '#'} className="project-btn outline" onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer">GitHub <Icons.Github /></a>
      </div>
      <div className="project-click-hint">{expanded ? 'Click to collapse' : 'Click to expand'}</div>
    </div>
  );
}

export default function PortfolioHome() {
  const [projectCategory, setProjectCategory] = useState('All');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' }); 
  const [submitted, setSubmitted] = useState(false);
  const homeRef = useScrollReveal(); const aboutRef = useScrollReveal(); const skillsRef = useScrollReveal();
  const projectsRef = useScrollReveal(); const expRef = useScrollReveal(); const contactRef = useScrollReveal();

  // NEW: ACTIVATE TYPEWRITER
  const { displayText: heroText, done: isTypingDone } = useTypewriter("Building modern web experiences with clean code and creative ideas. Crafting interfaces that feel alive.", 25);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true); 
    
    try {
      const res = await fetch("https://formsubmit.co/ajax/kit26.ad54@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formState)
      });
      
      if (res.ok) {
        setTimeout(() => { 
          setSubmitted(false); 
          setFormState({ name: '', email: '', message: '' }); 
        }, 3000);
      }
    } catch (error) {
      console.error("Form submission failed", error);
      setSubmitted(false); 
    }
  };

  const projects = [
    { title: 'DevConnect', subtitle: 'Developer Social Network', desc: 'A full-stack community application built with the MERN stack featuring real-time chat, code snippet sharing, and developer profiles with live notifications.', tags: ['MERN Stack', 'Socket.io', 'JWT', 'CSS Grid'], category: 'Full Stack', iconColor: '#3B82F6', liveUrl: '#', githubUrl: '#' },
    { title: 'TaskFlow', subtitle: 'Interactive Project Board', desc: 'Collaborative task management platform with drag-and-drop workspace lanes, custom task priorities, and animated transition logs.', tags: ['React', 'Framer Motion', 'Tailwind', 'Node.js'], category: 'Web Apps', iconColor: '#10B981', liveUrl: '#', githubUrl: '#' },
    { title: 'ShopEase', subtitle: 'E-commerce Platform', desc: 'A fully responsive e-commerce storefront with product filtering, cart management, Stripe payment integration, and an admin dashboard.', tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'], category: 'Full Stack', iconColor: '#F59E0B', liveUrl: '#', githubUrl: '#' },
  ];

  const floatingHeroIcons = [
    { icon: Icons.React, top: '5%', left: '5%', delay: '0s' },
    { icon: Icons.Tailwind, top: '15%', right: '0%', delay: '1.5s' },
    { icon: Icons.Nextjs, bottom: '15%', left: '0%', delay: '3s' },
    { icon: Icons.Javascript, bottom: '5%', right: '10%', delay: '4.5s' },
  ];

  return (
    <div className="main-content">
      
      {/* HOME HERO */}
      <section id="home" className="dashboard-panel animate-section reveal-section" ref={homeRef}>
        <div className="hero-layout">
          <div className="hero-left">
            <div className="badge-pill"><span className="dot" /> Available for Projects</div>
            <h1 className="hero-title">Hi, I'm<br /><span className="gradient-text">Shibin</span></h1>
            
            {/* NEW: USE TYPEWRITER HERE */}
            <p className="hero-description">
              {heroText}
              <span className="typewriter-cursor" style={{ opacity: isTypingDone ? 0 : 1 }}>|</span>
            </p>

            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>View My Work <Icons.ArrowRight /></button>
              <button className="btn-outline">Download CV <Icons.Download /></button>
            </div>
            <div className="stats-grid">
              {[ { n: '2+', l: 'Years Learning' }, { n: '20+', l: 'Projects Built' }, { n: '12+', l: 'Technologies' }, { n: '100+', l: 'Problems Solved' } ].map((s, i) => (
                <div key={i} className="glass-panel stat-card"><div className="stat-number">{s.n}</div><div className="stat-label">{s.l}</div></div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="avatar-ring-outer" /><div className="avatar-ring-inner" />
            {floatingHeroIcons.map((item, i) => { const IconComp = item.icon; return (<div key={i} className="floating-tech-icon" style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay }}><IconComp /></div>); })}
            <div className="glass-panel floating-badge left-top"><div className="badge-icon-box"><Icons.Code /></div><div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>MERN Stack</div><div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Developer</div></div></div>
            <div className="glass-panel floating-badge right-top"><div className="badge-icon-box"><Icons.Globe /></div><div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Open Source</div><div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Enthusiast</div></div></div>
            <div className="glass-panel floating-badge left-bottom"><div className="badge-icon-box"><Icons.Brain /></div><div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>100+ Solved</div><div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Problem Solver</div></div></div>
            <div className="glass-panel floating-badge right-bottom"><div className="badge-icon-box"><Icons.Code /></div><div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Modern Web</div><div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Builder</div></div></div>
            <div className="hero-avatar-wrapper"><AnimatedAvatar /><div className="holographic-podium"></div><div className="scanning-laser"></div></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="dashboard-panel animate-section reveal-section" ref={aboutRef}>
        <div className="section-container"><div className="section-left">
          <div><span className="section-label">Get to know me</span><h2 className="section-title">About Me</h2></div>
          <div className="glass-panel" style={{ padding: '2rem', lineHeight: 1.75 }}>
            <p style={{ marginBottom: '1rem' }}>I'm a passionate Full-Stack Developer who loves building modern web applications.</p>
            <p style={{ color: 'var(--text-muted)' }}>My developer journey is fueled by a desire to combine clean software engineering practices with delightful UI design.</p>
            <div className="about-grid-details">
              {[{ label: 'Name', value: 'Shibin' }, { label: 'Location', value: 'Kerala, India' }, { label: 'Experience', value: '2+ Years' }, { label: 'Email', value: 'pkshibin82@gmail.com' }].map(d => (<div key={d.label} className="detail-row"><span className="detail-label">{d.label}:</span><span className="detail-value">{d.value}</span></div>))}
            </div>
            <button className="btn-primary" style={{ marginTop: '2rem' }}>Download CV <Icons.Download /></button>
          </div>
        </div></div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="dashboard-panel animate-section reveal-section" ref={skillsRef}>
        <div className="section-container">
          <div className="section-left" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-label">What I Know</span>
              <h2 className="section-title">My Tech Stack</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Move your mouse over the spheres to interact with them.
              </p>
            </div>
            
            <div className="tech-3d-wrapper" aria-label="Interactive 3D representation of my tech stack">
              <Suspense fallback={
                <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                  Initializing 3D Engine...
                </div>
              }>
                <TechScene />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="dashboard-panel animate-section reveal-section" ref={projectsRef}>
        <div className="section-container"><div className="section-left">
          <div className="projects-header">
            <div><span className="section-label">Things I've Built</span><h2 className="section-title">My Projects</h2></div>
            <div className="skills-categories" style={{ marginBottom: 0 }}>{['All', 'Web Apps', 'Full Stack'].map(cat => (<button key={cat} className={`skill-tab-btn ${projectCategory === cat ? 'active' : ''}`} onClick={() => setProjectCategory(cat)}>{cat}</button>))}</div>
          </div>
          <div className="projects-grid">{projects.filter(p => projectCategory === 'All' || p.category === projectCategory).map((proj, i) => (<div key={i} className="project-card-wrapper" style={{ animationDelay: `${i * 80}ms` }}><ProjectCard proj={proj} /></div>))}</div>
        </div></div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="dashboard-panel animate-section reveal-section" ref={contactRef}>
        <div className="section-container"><div className="section-left">
          <div><span className="section-label">Get in Touch</span><h2 className="section-title">Contact Me</h2></div>
          <div className="contact-grid">
            <div className="glass-panel contact-form">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>Let's build something amazing together!</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[{ id: 'name', label: 'Your Name', type: 'text', placeholder: 'Enter your name' }, { id: 'email', label: 'Your Email', type: 'email', placeholder: 'Enter your email' }].map(f => (<div key={f.id} className="form-group"><label className="form-label" htmlFor={f.id}>{f.label}</label><input type={f.type} id={f.id} required className="form-input" placeholder={f.placeholder} value={formState[f.id]} onChange={e => setFormState({ ...formState, [f.id]: e.target.value })} /></div>))}
                <div className="form-group"><label className="form-label" htmlFor="message">Your Message</label><textarea id="message" required rows="4" className="form-input" placeholder="Type your message..." style={{ resize: 'none' }} value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })} /></div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={submitted}>{submitted ? 'Sending…' : 'Send Message'} <Icons.Send /></button>
              </form>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[{ icon: Icons.Mail, label: 'Email', value: 'pkshibin82@gmail.com' }, { icon: Icons.MapPin, label: 'Location', value: 'Kerala, India' }].map(item => (<div key={item.label} className="glass-panel contact-info-item"><div className="contact-info-icon-box"><item.icon /></div><div className="contact-info-details"><span className="contact-info-label">{item.label}</span><span className="contact-info-value">{item.value}</span></div></div>))}
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Follow Me</div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>{[Icons.Github, Icons.Linkedin, Icons.Twitter, Icons.Instagram].map((Icon, i) => (<a key={i} href="#" className="social-link" aria-label={`Social link ${i+1}`}><Icon /></a>))}</div>
              </div>
            </div>
          </div>
        </div></div>
      </section>

      {/* NEW: FOOTER */}
      <footer className="portfolio-footer">
        <div className="footer-content">
          <div className="footer-dot"></div>
          <span className="footer-text">
            Designed & Built by Shibin © {new Date().getFullYear()}
          </span>
        </div>
      </footer>

    </div>
  );
}