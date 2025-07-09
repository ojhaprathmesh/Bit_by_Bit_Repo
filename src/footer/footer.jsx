import React, { useState, useEffect } from 'react';
import './footer.css';

const Footer = () => {
  const [revealLinks, setRevealLinks] = useState(false);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [starOpacity, setStarOpacity] = useState([]);
  
  // Initialize random star opacities
  useEffect(() => {
    const starCount = 50;
    const randomOpacities = Array.from({ length: starCount }, () => 
      Math.random() * 0.7 + 0.3
    );
    setStarOpacity(randomOpacities);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      // setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    };
    
    // Update time immediately and then every second
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    
    // Animate star twinkle effect
    // const twinkleInterval = setInterval(() => {
    //   setStarOpacity(prev => 
    //     prev.map(opacity => {
    //       const newOpacity = opacity + (Math.random() * 0.4 - 0.2);
    //       return Math.max(0.3, Math.min(1, newOpacity));
    //     })
    //   );
    // }, 1000);
    
    // Clean up intervals on component unmount
    return () => {
      clearInterval(timeInterval);
      // clearInterval(twinkleInterval);
    };
  }, []);

  return (
    <footer className="retro-cosmic-footer">
      {/* Stars background */}
      <div className="star-field">
        {starOpacity.map((opacity, index) => (
          <div 
            key={index}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: opacity,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="parallax-layer"></div>
      
      <div className="footer-content items-center">
        <div className="footer-identity">
          <div className="company-mark">
            <div className="geometric-logo">
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <polygon points="20,5 5,20 20,35 35,20" fill="none" stroke="#67e8f9" strokeWidth="2" className="logo-shape" />
                <circle cx="20" cy="20" r="6" fill="none" stroke="#7dd3fc" strokeWidth="1.5" className="logo-orbit" />
                <circle cx="20" cy="20" r="2" fill="#67e8f9" className="logo-center" />
              </svg>
            </div>
            <h3 className="company-name">ACM BMU <span className="highlight">STUDENT CHAPTER</span></h3>
          </div>
          
          <p className="tagline">Bringing Our Legacy to you in an <span className="highlight">Innovative</span> way.</p>
        </div>
        
        <div className="interactive-panel">
          <div className={`linkset ${revealLinks || window.innerWidth < 768 ? 'revealed' : ''}`}>
            <div className="linkset-column pl-2">
              <a href="#about" className="link-item" style={{ textDecoration: 'none' }}>About Us</a>
              <a href="#gallery" className="link-item" style={{ textDecoration: 'none' }}>Gallery</a>
              <a href="#timeline" className="link-item" style={{ textDecoration: 'none' }}>Timeline</a>
            </div>
            <div className='linkset-column'>
              <a href="#organisers" className="link-item" style={{ textDecoration: 'none' }}>Organisers</a>
              <a href="#contact" className="link-item" style={{ textDecoration: 'none' }}>Contact Us</a>
              <a href="#faqs" className="link-item" style={{ textDecoration: 'none' }}>FAQs</a>
            </div>

            <div className='linkset-column'>
              <a href="https://www.instagram.com" className="link-item" style={{ textDecoration: 'none' }}>Instagram</a>
              <a href="https://www.linkedin.com" className="link-item" style={{ textDecoration: 'none' }}>LinkedIn</a>
              <a href="https://www.twitter.com" className="link-item" style={{ textDecoration: 'none' }}>Twitter</a>
            </div>
          </div>
        </div>
          
          <button 
            className="reveal-button" 
            onClick={() => setRevealLinks(!revealLinks)}
            aria-label={revealLinks ? "Hide navigation" : "Show navigation"}
          >
            <span className="reveal-icon"></span>
          </button>
        </div>
      
      <div className="footer-lower">
        <div className="coordinates">
          <span className="coordinate-value">42°.1337.N</span>
          <span className="coordinate-value">88°.0101.W</span>
        </div>
        
        <div className="legal">
          <span>© 2024-25 <span className="highlight">ACM BMU STUDENT CHAPTER</span></span>
          <span className="separator">|</span>
          <span>HACKBMU 7.0</span>
        </div>
        
        <div className="time-indicator">
          <span className="dot pulse"></span>
          <span className="time-value">{currentTime}</span>
          <span className="system-status">SYSTEM ONLINE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;