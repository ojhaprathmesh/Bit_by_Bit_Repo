import React from "react";
import "./HuntCompletion.css";

const HuntCompletion = ({ resetProgress }) => {
  // Generate celebration particles for completed hunt
  const generateCompletedParticles = () => {
    const particleCount = 20;
    
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const size = 2 + Math.random() * 5;
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = 3 + Math.random() * 3;
      
      particles.push(
        <div 
          key={i}
          className="completed-particle" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: `-10px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div className="completed-hunt">
      <div className="completed-particles">
        {generateCompletedParticles()}
      </div>
      <div className="trophy-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      <h2 className="glitch-text" data-text="Congratulations!">Congratulations!</h2>
      <p>You've completed all the clues in the treasure hunt!</p>
      <p>You've reached the final destination. All paths lead to Rome!</p>
      <button onClick={resetProgress}><span>Start Over</span></button>
    </div>
  );
};

export default HuntCompletion; 