import React, { useState, useEffect, useCallback } from 'react';
import './glimpses.css';
import { assets } from '../assets/assets';

const Glimpses = () => {
  const hackathonMemories = [
    {
      id: 3,
      image: assets.img2,
      color: "#10b981"
    },
    {
      id: 4,
      image: assets.img3,
      color: "#3b82f6"
    },
    {
      id: 5,
      image: assets.img4,
      color: "#8b5cf6"
    },
    {
      id: 6,
      image: assets.img5,
      color: "#f59e0b"
    },
    {
      id:7,
      image: assets.img6,
      color: "#ef4444"
    },
    {
      id: 8,
      image: assets.img7,
      color: "#10b981"
    },
    {
      id: 9,
      image: assets.img8,
      color: "#3b82f6"
    },
    {
      id: 10,
      image: assets.img9,
      color: "#8b5cf6"
    },
    {
      id: 11,
      image: assets.img10,
      color: "#f59e0b"
    },
    {
      id: 12,
      image: assets.img11,
      color: "#ef4444"
    },
    {
      id: 13,
      image: assets.img12,
      color: "#10b981"
    },
    {
      id: 14,
      image: assets.img13,
      color: "#3b82f6"
    },
    {
      id: 15,
      image: assets.img14,
      color: "#8b5cf6"
    },
    {
      id: 16,
      image: assets.img15,
      color: "#f59e0b"
    },
    {
      id: 17,
      image: assets.img16,
      color: "#ef4444"
    },
    {
      id: 18,
      image: assets.img17,
      color: "#10b981"
    },
    {
      id: 19,
      image: assets.img18, 
      color: "#3b82f6"
    },
    {
      id: 20,
      image: assets.img19,  
      color: "#8b5cf6"
    },
    {
      id: 21,
      image: assets.img20,
      color: "#f59e0b"
    },
    {
      id: 22,
      image: assets.img3,
      color: "#ef4444"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  // Memoize the visible indices calculation
  const getVisibleIndices = useCallback(() => {
    const totalMemories = hackathonMemories.length;
    return [
      (currentIndex - 1 + totalMemories) % totalMemories,
      currentIndex,
      (currentIndex + 1) % totalMemories,
    ];
  }, [currentIndex, hackathonMemories.length]);

  const visibleIndices = getVisibleIndices();

  const handleNext = useCallback(() => {
    if (!isAnimating) {
      setDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % hackathonMemories.length);
        setIsAnimating(false);
      }, 400); // Reduced duration for snappier feel
    }
  }, [isAnimating, hackathonMemories.length]);

  const handlePrev = useCallback(() => {
    if (!isAnimating) {
      setDirection('prev');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? hackathonMemories.length - 1 : prevIndex - 1
        );
        setIsAnimating(false);
      }, 400);
    }
  }, [isAnimating, hackathonMemories.length]);

  const goToIndex = useCallback((index) => {
    if (!isAnimating) {
      setDirection(index > currentIndex ? 'next' : 'prev');
      setCurrentIndex(index);
    }
  }, [currentIndex, isAnimating]);

  // Auto-rotate through memories
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3500); // Adjusted interval
    
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="gallery-container" id='gallery'>
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="terminal-circle red"></span>
          <span className="terminal-circle yellow"></span>
          <span className="terminal-circle green"></span>
        </div>
        <div className="terminal-title">hackbmu_memories.sh</div>
        <div className="terminal-info">bash - 80×24</div>
      </div>
      
      <div className="gallery-carousel">
        <div className="terminal-line">
          <span className="prompt">$</span> 
          <span className="command">ls -la ./hackbmu_memories/</span>
        </div>

        <button 
          onClick={handlePrev}
          className="nav-button prev-button"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className={`memories-container ${isAnimating ? `animating-${direction}` : ''}`}>
          {hackathonMemories.map((memory, index) => {
            const isVisible = visibleIndices.includes(index);
            
            let positionClass = '';
            if (isVisible) {
              if (index === visibleIndices[0]) positionClass = 'left-memory';
              if (index === visibleIndices[1]) positionClass = 'center-memory';
              if (index === visibleIndices[2]) positionClass = 'right-memory';
            }
            
            return isVisible ? (
              <div 
                key={memory.id}
                className={`memory-card ${positionClass}`}
              >
                <div className={`memory-wrapper ${index === visibleIndices[1] ? 'active' : ''}`}>
                  <div className="memory-overlay"></div>
                  <img 
                    src={memory.image} 
                    alt={`Hackathon memory ${memory.id}`}
                    className="memory-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div 
                    className="memory-color-bar" 
                    style={{ backgroundColor: memory.color }}
                  />
                </div>
              </div>
            ) : null;
          })}
        </div>

        <button 
          onClick={handleNext}
          className="nav-button next-button"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="nav-dots">
        {hackathonMemories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to memory ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Glimpses;