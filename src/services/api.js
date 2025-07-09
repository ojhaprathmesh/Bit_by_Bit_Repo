// API service for communicating with the backend

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * Get leaderboard data for a specific event
 * @param {string} eventName - Name of the event (e.g., "duality")
 * @returns {Promise<Object>} - Leaderboard data
 */
export const getLeaderboard = async (eventName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sheet/${eventName}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

/**
 * Register a team for an event
 * @param {Object} teamData - Team registration data
 * @returns {Promise<Object>} - Registration response
 */
export const registerTeam = async (teamData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData),
    });
    
    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error registering team:', error);
    throw error;
  }
};

/**
 * Update a team's score
 * @param {Object} scoreData - Score update data
 * @param {string} scoreData.teamName - Team name
 * @param {number} scoreData.scoreChange - Score to add
 * @param {string} scoreData.eventName - Event name
 * @returns {Promise<Object>} - Update response
 */
export const updateScore = async (scoreData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoreData),
    });
    
    if (!response.ok) {
      throw new Error(`Score update failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating score:', error);
    throw error;
  }
};

/**
 * Submit an answer for a clue
 * @param {Object} answerData - Answer submission data
 * @returns {Promise<Object>} - Submission response with score update
 */
export const submitAnswer = async (answerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answerData),
    });
    
    if (!response.ok) {
      throw new Error(`Answer submission failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
}; 