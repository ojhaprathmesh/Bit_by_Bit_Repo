import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('INITIALIZING SYSTEM');
  const messages = [
    'INITIALIZING SYSTEM',
    'CALIBRATING QUANTUM CIRCUITS',
    'DECRYPTING SPACE-TIME VECTORS',
    'LOADING NEURAL INTERFACE',
    'CONNECTING TO CYBERSPACE',
    'SYNCING DIGITAL REALITY'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 30); // Faster progress for a shorter loading experience

    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[randomIndex]);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  // Generate stars dynamically
  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        delay: `${Math.random() * 5}s`
      });
    }
    return stars;
  };

  const stars = generateStars(50);

  return (
    <div className="retro-loader-container">
      <div className="scanner">
        <div className="scan-line"></div>
      </div>
      
      <div className="grid-background"></div>
      
      <div className="radar-container">
        <div className="radar">
          <div className="radar-beam"></div>
          <div className="blip blip1"></div>
          <div className="blip blip2"></div>
          <div className="blip blip3"></div>
        </div>
      </div>
      
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-button"></div>
            <div className="terminal-button"></div>
            <div className="terminal-button"></div>
          </div>
          <div className="terminal-title">SYSTEM BOOT</div>
        </div>
        
        <div className="terminal-content">
          <div className="typing-text">{message}</div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <div className="progress-text">{progress}%</div>
          </div>
          <div className="blink-cursor"></div>
          
          <div className="terminal-lines">
            {Array(8).fill().map((_, i) => (
              <div key={i} className="terminal-line">
                <span className="line-number">{i + 1}</span>
                <span className="line-content">
                  {Array(Math.floor(Math.random() * 15) + 5).fill().map((_, j) => (
                    <span key={j} className="pixel" 
                      style={{ 
                        opacity: Math.random() * 0.7 + 0.3,
                        width: `${Math.random() * 30 + 10}px`
                      }}>
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="orbiting-objects">
        <div className="planet planet1"></div>
        <div className="planet planet2"></div>
        <div className="satellite"></div>
        <div className="asteroid"></div>
      </div>
      
      <div className="stars">
        {stars.map(star => (
          <div 
            key={star.id} 
            className="star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              width: star.size,
              height: star.size
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;