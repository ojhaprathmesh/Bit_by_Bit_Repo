import React, { useState, useEffect } from "react";
import BitByBitNav from "../BitbyBit/BitbyBitNav.jsx";
import CosmicBackground from "../BitbyBit/CosmicBackground.jsx";
import cluesData from "../BitbyBit/treasure-hunt-clues.json";
import "./BitbyBit.css";

function BitByBit() {
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [currentHint, setCurrentHint] = useState(null);
  const [showPulse, setShowPulse] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [foundLocations, setFoundLocations] = useState([]);

  // Show initial pulse animation only once when the page loads
  useEffect(() => {
    if (initialLoad) {
      setShowPulse(true);
      setTimeout(() => {
        setShowPulse(false);
        setInitialLoad(false);
      }, 1500);
    }
  }, [initialLoad]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      
      // Cleanup timer on component unmount or when message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert user input to a number for comparison
    const numInput = parseFloat(userInput);
    
    // Check if it's a valid number
    if (isNaN(numInput)) {
      setMessage("Please enter a valid number");
      setCurrentHint(null);
      return;
    }

    // Find the matching clue using small epsilon for floating point comparison
    const epsilon = 0.0001;
    const matchingClue = cluesData.find(
      clue => Math.abs(numInput - clue.answer) < epsilon
    );
    
    if (matchingClue) {
      setCurrentHint(matchingClue.hint);
      setMessage("Location found! Check your hint below.");
      
      // Add to found locations if not already found
      if (!foundLocations.includes(matchingClue.answer)) {
        setFoundLocations([...foundLocations, matchingClue.answer]);
      }
    } else {
      setMessage("No location mapped to this code. Try another number.");
      setCurrentHint(null);
    }
  };

  const resetMapping = () => {
    setUserInput("");
    setMessage("");
    setCurrentHint(null);
    setFoundLocations([]);
  };

  return (
    <div className="clue-hunt-wrapper">
      <BitByBitNav 
        showReset={true}
        handleReset={resetMapping}
      />
      
      <CosmicBackground showPulse={showPulse} />
      
      <div className="clue-hunt-content">
        <div className={`clue-hunt-container ${showPulse ? 'pulse-active' : ''}`}>
          <div className="container-glow"></div>
          
          <div className="treasure-hunt-header">
            <h1>Bit-by-Bit Mapper</h1>
            <p className="mapper-description">
              Enter any numeric code to discover its corresponding location
            </p>
          </div>
          
          <div className="mapper-card">
            <form onSubmit={handleSubmit} className="answer-form">
              <div className="input-group">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter a numeric code"
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Find Location
              </button>
            </form>
            
            {message && (
              <p className={`message ${currentHint ? "success" : "error"}`}>
                {message}
              </p>
            )}
            
            {currentHint && (
              <div className="hint-container">
                <h3>Location Information:</h3>
                <p>{currentHint}</p>
              </div>
            )}
            
            {foundLocations.length > 0 && (
              <div className="found-locations">
                <h3>Found Locations: {foundLocations.length}/{8}</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(foundLocations.length / 8) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BitByBit; 