import React, { useState, useEffect } from "react";
import "./CosmicBackground.css";

const CosmicBackground = ({ showPulse }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [scannerPos, setScannerPos] = useState({ x: 0, y: 0 });
  const [floatingObjects, setFloatingObjects] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initialize floating objects
    generateFloatingObjects();

    // Scanner effect
    const scannerInterval = setInterval(() => {
      setScannerPos({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }, 3000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(scannerInterval);
    };
  }, []);

  // Generate floating objects
  const generateFloatingObjects = () => {
    const objects = [];
    const types = ['satellite', 'asteroid', 'data-packet'];
    
    for (let i = 0; i < 5; i++) {
      objects.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        size: Math.random() * 30 + 10,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    
    setFloatingObjects(objects);
  };
  
  // Generate cosmic stars for the background
  const generateCosmicStars = () => {
    // Scale stars based on screen width
    const starCount = windowWidth > 1600 ? 150 : windowWidth > 1200 ? 120 : 80;
    
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 3 + 0.5;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const opacity = 0.2 + Math.random() * 0.6;
      const animationDuration = 3 + Math.random() * 7;
      
      stars.push(
        <div 
          key={i}
          className="cosmic-star" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            opacity: opacity,
            animation: Math.random() > 0.7 ? `twinkle ${animationDuration}s infinite alternate` : 'none'
          }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="cosmic-stars">
        {generateCosmicStars()}
      </div>
      
      {/* Digital scanner effect */}
      <div 
        className="digital-scanner" 
        style={{ 
          left: `${scannerPos.x}%`, 
          top: `${scannerPos.y}%` 
        }}
      ></div>
      
      {/* Grid overlay for cyberpunk effect */}
      <div className="grid-overlay"></div>
      
      {/* Floating cosmic objects */}
      <div className="floating-objects">
        {floatingObjects.map(obj => (
          <div 
            key={obj.id}
            className={`floating-object ${obj.type}`}
            style={{
              width: `${obj.size}px`,
              height: `${obj.size}px`,
              left: `${obj.left}%`,
              top: `${obj.top}%`,
              animationDuration: `${obj.animationDuration}s`,
              animationDelay: `${obj.delay}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Pulse animation */}
      {showPulse && <div className="cosmic-pulse"></div>}
    </>
  );
};

export default CosmicBackground; 