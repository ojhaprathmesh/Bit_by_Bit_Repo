import React, { useState, useEffect } from 'react';
import './navbar1.css';

const CosmicNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Add this to prevent scroll handler from causing side effects during programmatic scrolling
  const [isManuallyScrolling, setIsManuallyScrolling] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'aboutglitch', label: 'About' },
    { id: 'memories', label: 'Memories' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'team', label: 'Team' }
  ];

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    setActiveSection(id);

    const element = document.getElementById(id);
    if (!element) return;

    const navHeight = document.querySelector('.cosmic-nav')?.offsetHeight || 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    // Set flag to true before scrolling
    setIsManuallyScrolling(true);
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Update URL without reload
    window.history.pushState({}, '', `#${id}`);
    
    // Reset flag after scrolling is complete
    setTimeout(() => {
      setIsManuallyScrolling(false);
    }, 1000); // Set timeout slightly longer than scroll animation
  };

  const downloadFile = () => {
    // For production build (dist folder structure)
    const filePath = '/event_brochure.pdf'; // Direct root access
    
    // Alternative if in dist/img folder:
    // const filePath = '/img/event_brochure.pdf';
  
    // Create temporary anchor
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'hackbmu_brochure.pdf'; // Ensures proper filename on download
    
    // Add error handling
    link.onerror = () => {
      console.error('Failed to load PDF file');
      // Optional: Implement error UI feedback
    };
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    // Handle navbar background on scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // MODIFICATION: Remove automatic scrolling on initial load
    // Only update the active state without scrolling
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      if (navItems.some(item => item.id === id)) {
        setActiveSection(id);
        // No scrolling triggered here
      }
    }

    // Scroll spy to detect which section is active
    const handleScrollSpy = () => {
      // Skip scroll spy if we're programmatically scrolling
      if (isManuallyScrolling) return;
      
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollSpy);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, [navItems, isManuallyScrolling]); // Added isManuallyScrolling as dependency

  const navStarCount = 60;
  
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

        <div className="cosmic-nav-container" style={{ maxWidth: '1000px' }}>
          <div className="cosmic-glow-effect"></div>
          
          {/* Logo */}
          <div className="cosmic-logo-container" onClick={() => scrollToSection('home')} style={{ marginLeft: "-10px" }}>
            <div className="cosmic-logo">
              <div className="logo-planet"></div>
            </div>
            <div className="logo-image-wrapper">
              <img 
                src="/img/hack.png" 
                alt="Company Logo" 
                className="cosmic-logo-image enlarged" 
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="cosmic-nav-desktop">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`cosmic-nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="nav-text">{item.label}</span>
                <span className="nav-hover-effect"></span>
                {activeSection === item.id && <span className="nav-active-indicator"></span>}
              </button>
            ))}
          </div>

          {/* Download Button - Updated to match theme */}
          <button className="cosmic-download-btn" onClick={downloadFile}>
            <span className="button-glow"></span>
            <span className="button-text">
            brochure</span>
            <span className="download-icon"></span>
            <span className="button-particles">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="button-particle"></span>
              ))}
            </span>
          </button>

          {/* Mobile Toggle Button */}
          <button 
            className="cosmic-nav-mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`cosmic-nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-backdrop"></div>
          <div className="static-menu-stars">
            {[...Array(20)].map((_, i) => {
              const size = Math.random() * 2.5 + 0.5;
              const opacity = Math.random() * 0.7 + 0.3;
              
              return (
                <div 
                  key={i} 
                  className="static-menu-star" 
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
          <div className="cosmic-nav-mobile-content">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`cosmic-mobile-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="mobile-item-text">{item.label}</span>
                <span className="mobile-item-indicator"></span>
              </button>
            ))}
            <button className="cosmic-mobile-download" onClick={downloadFile}>
              <span className="mobile-download-glow"></span>
              <span>Download</span>
              <span className="mobile-download-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CosmicNav;