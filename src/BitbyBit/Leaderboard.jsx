import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

const Leaderboard = ({ eventName = "duality", apiUrl = "http://localhost:3000" }) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${apiUrl}/sheet/${eventName}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data");
      }
      
      const data = await response.json();
      
      // Extract the top 10 teams
      setTeams(data.top10 || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to load leaderboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    
    // Set up auto-refresh every 60 seconds
    const intervalId = setInterval(fetchLeaderboard, 60000);
    
    return () => clearInterval(intervalId);
  }, [eventName]);

  const formatLastUpdated = (date) => {
    if (!date) return "";
    
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Duality Leaderboard</h2>
        
        <div className="refresh-section">
          <button 
            className="refresh-button" 
            onClick={fetchLeaderboard}
            disabled={isLoading}
          >
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
          {lastUpdated && (
            <div className="last-updated">
              Last updated: {formatLastUpdated(lastUpdated)}
            </div>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="leaderboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading leaderboard data...</p>
        </div>
      ) : error ? (
        <div className="leaderboard-error">{error}</div>
      ) : teams.length === 0 ? (
        <div className="leaderboard-empty">No teams have registered yet.</div>
      ) : (
        <div className="leaderboard-table">
          <div className="leaderboard-row header">
            <div className="rank">Rank</div>
            <div className="team-name">Team Name</div>
            <div className="score">Points</div>
          </div>
          
          {teams.map((team, index) => (
            <div 
              key={team.name} 
              className={`leaderboard-row ${index < 3 ? 'top-three' : ''} ${index === 0 ? 'first-place' : ''}`}
            >
              <div className="rank">
                {index === 0 && <span className="crown">👑</span>}
                {index + 1}
              </div>
              <div className="team-name">{team.name}</div>
              <div className="score">{team.points}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard; 