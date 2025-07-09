import React from "react";
import "./ClueCard.css";

const ClueCard = ({ 
  currentClueIndex, 
  clue, 
  answer, 
  setAnswer, 
  handleSubmitAnswer, 
  isCorrect, 
  message, 
  teamId, 
  cluesLength,
  resetProgress 
}) => {
  return (
    <div className="clue-container">
      <h2>Clue #{currentClueIndex + 1}</h2>
      <div className="clue-card">
        <div className="card-scanner"></div>
        <p>{clue.question}</p>
        <form onSubmit={handleSubmitAnswer}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
            className={isCorrect ? "correct" : ""}
          />
          <button type="submit"><span>Submit</span></button>
        </form>
        {message && (
          <p className={`message ${isCorrect ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
      <p className="team-info">
        <span className="data-bit"></span>
        Team: {teamId} | Progress: {currentClueIndex + 1}/{cluesLength}
        <span className="data-bit"></span>
      </p>
      <button className="reset-btn" onClick={resetProgress}><span>Reset Progress</span></button>
    </div>
  );
};

export default ClueCard; 