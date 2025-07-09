import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../navbar/navbar1.css';  // Use the main navbar styles

const BitByBitNav = ({ showReset, handleReset }) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navStarCount = 40;
  
  return (
    <div className="cosmic-nav-wrapper">
      <div className="nebula-effect"></div>

      <nav className={`cosmic-nav ${scrolled ? 'scrolled' : ''}`}>
        {/* Navbar stars */}
        <div className="navbar-static-stars">
          {[...Array(navStarCount)].map((_, i) => {
            const size = Math.random() * 2 + 0.5;
            const opacity = Math.random() * 0.7 + 0.3;
            
            return (
              <div 
                key={`nav-star-${i}`} 
                className="navbar-static-star" 
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: opacity
                }}
              />
            );
          })}
        </div>

        <div className="cosmic-nav-container">
          <div className="cosmic-glow-effect"></div>
          
          {/* Logo - with direct link to home */}
          <Link to="/" className="cosmic-logo-container" style={{ marginLeft: "-10px" }}>
            <div className="cosmic-logo">
              <div className="logo-planet"></div>
            </div>
            <div className="logo-image-wrapper">
              <img 
                src="/img/hack.png" 
                alt="HackBMU Logo" 
                className="cosmic-logo-image enlarged" 
              />
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="cosmic-nav-desktop">
            <Link to="/" className="cosmic-nav-item">
              <span className="nav-text">Home</span>
              <span className="nav-hover-effect"></span>
            </Link>
            
            <Link to="#about" className="cosmic-nav-item">
              <span className="nav-text">Mapper</span>
              <span className="nav-hover-effect"></span>
            </Link>
            
            {showReset && (
              <div className="cosmic-nav-item cosmic-nav-reset" onClick={handleReset}>
                <span className="nav-text">Reset</span>
                <span className="nav-hover-effect"></span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BitByBitNav; 