import React, { useState } from 'react';
import './TeamLogin.css';

const TeamLogin = ({ onLogin }) => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      onLogin(teamName.trim());
    }
  };

  return (
    <div className="team-login-container">
      <div className="login-box">
        <h2>Team Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter Team Name"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Start Challenge
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamLogin; 