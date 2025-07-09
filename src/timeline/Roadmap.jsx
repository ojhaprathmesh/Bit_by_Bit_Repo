import React, { useState, useEffect } from 'react';
import './Roadmap.css';

const Roadmap = () => {
  // State for progress tracking and interactivity
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeEvent, setActiveEvent] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  // Hackathon start and end times
  const hackathonStart = new Date("2025-04-19T09:30:00");
  const hackathonEnd = new Date("2025-04-20T17:30:00")
  const totalDuration = hackathonEnd - hackathonStart;

  // Update time and progress every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Calculate progress percentage
      if (now < hackathonStart) {
        setProgress(0);
      } else if (now > hackathonEnd) {
        setProgress(100);
      } else {
        const elapsed = now - hackathonStart;
        setProgress(Math.min(100, (elapsed / totalDuration) * 100));
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Event data from the spreadsheet - removed venue information
  const events = [
    { id: 1, day: "19th April", time: "9:30 am - 12:00 pm", name: "Check In", type: "logistics" },
    { id: 2, day: "19th April", time: "12:00 pm - 12:30 pm", name: "Opening Ceremony", type: "ceremony" },
    { id: 3, day: "19th April", time: "12:00 pm - 3:15 pm", name: "Hacking Session Begins", type: "hacking" },
    { id: 4, day: "19th April", time: "12:30 pm - 2:00 pm", name: "Lunch Break", type: "break" },
    { id: 5, day: "19th April", time: "3:30 pm - 4:15 pm", name: "Plenary Talk", type: "talk" },
    { id: 6, day: "19th April", time: "4:15 pm - 6:00 pm", name: "Hacking Continues", type: "hacking" },
    { id: 7, day: "19th April", time: "6:00 pm - 7:00 pm", name: "Evaluation Round 1 (Code Review)", type: "evaluation" },
    { id: 8, day: "19th April", time: "7:00 pm - 9:00 pm", name: "Hacking Continues", type: "hacking" },
    { id: 9, day: "19th April", time: "8:30 pm - 10:00 pm", name: "Dinner Break", type: "break" },
    { id: 10, day: "19th April", time: "10:30 PM", name: "Evaluation Round 2 (Spin the Wheel)", type: "evaluation" },
    { id: 11, day: "20th April", time: "12:30 am - 1:30 am", name: "Recreational Activities", type: "recreation" },
    { id: 12, day: "20th April", time: "1:45 am - 4 am", name: "Hacking Continues", type: "hacking" },
    { id: 13, day: "20th April", time: "4:00 am - 6:00 am", name: "Evaluation Round 3 (Duel)", type: "evaluation" },
    { id: 14, day: "20th April", time: "8:30 am - 9:30 am", name: "Breakfast Break", type: "break" },
    { id: 15, day: "20th April", time: "6:00 am - 12:30 pm", name: "Hacking Continues", type: "hacking" },
    { id: 16, day: "20th April", time: "11:30 am - 11:30 am", name: "Hi-Tea", type: "break" },
    { id: 17, day: "20th April", time: "12:30 PM", name: "Final Evaluation (Judging Round)", type: "evaluation" },
    { id: 18, day: "20th April", time: "4:00 pm - 5:30 pm", name: "Closing Ceremony", type: "ceremony" }
  ];

  // Get event color based on type
  const getEventColor = (type, isBackground = true, isActive = false) => {
    const opacity = isBackground ? (isActive ? "1" : "0.8") : "1";
    
    switch(type) {
      case "hacking":
        return isBackground ? `rgba(43, 108, 176, ${opacity})` : "rgba(92, 205, 255, 1)";
        case "evaluation":
            return isBackground ? `rgba(206, 24, 53, 0.38)` : "rgba(36, 59, 85, ${opacity})"; 
      case "break":
        return isBackground ? `rgba(12, 28, 59, ${opacity})` : "rgba(173, 216, 230, 1)";
      case "ceremony":
      case "talk":
        return isBackground ? `rgba(11, 42, 82, ${opacity})` : "rgba(255, 255, 255, 1)";
      case "recreation":
        return isBackground ? `rgba(25, 62, 111, ${opacity})` : "rgba(144, 238, 144, 1)";
      case "logistics":
        return isBackground ? `rgba(19, 51, 91, ${opacity})` : "rgba(216, 216, 216, 1)";
      default:
        return isBackground ? `rgba(8, 33, 63, ${opacity})` : "white";
    }
  };

  const handleEventClick = (event) => {
    setActiveEvent(event.id === activeEvent ? null : event.id);
  };

  // Format time for countdown
  const getTimeUntilNextEvent = () => {
    // Find the next upcoming event
    const now = new Date();
    
    for (const event of events) {
      if (!event.time || event.time.includes('Break')) continue;
      
      const [startTimeStr] = event.time.split(' - ');
      const eventDate = event.day === "19th April" ? "2025-04-19" : "2025-04-20";
      
      let timeStr = startTimeStr;
      if (startTimeStr.includes('PM') && !startTimeStr.includes('12:')) {
        const hour = parseInt(startTimeStr.split(':')[0]) + 12;
        timeStr = `${hour}:${startTimeStr.split(':')[1]}`;
      }
      
      timeStr = timeStr.replace('am', '').replace('pm', '').replace('AM', '').replace('PM', '').trim();
      
      const eventDateTime = new Date(`${eventDate}T${timeStr}`);
      
      if (eventDateTime > now) {
        const diff = eventDateTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return {
          event: event.name,
          time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        };
      }
    }
    
    return { event: "Hackathon End", time: "00:00:00" };
  };

  const nextEventInfo = getTimeUntilNextEvent();
  
  // Get the day label for timeline display
  const getDayLabel = (index) => {
    const day = events[index].day;
    if (index === 0 || events[index - 1].day !== day) {
      return day;
    }
    return null;
  };
  
  // Get the emoji for each event type
  const getEventIcon = (type) => {
    switch(type) {
      case "hacking": return "💻";
      case "evaluation": return "🔍";
      case "break": return "🍽️";
      case "ceremony": return "🎭";
      case "talk": return "🎤";
      case "recreation": return "🎮";
      case "logistics": return "📋";
      default: return "📅";
    }
  };

  return (
    <div className="hackathon-container" id='timeline'>
      {/* Header */}
      <div className="header">
        <div className="header-glow"></div>
        <h1 className="header-title">TIME LINE</h1>
        <div className="header-date-container">
          <div className="header-line"></div>
          <p className="header-date">APRIL 19-20, 2025</p>
          <div className="header-line"></div>
        </div>
      </div>
      
      {/* Progress and countdown section */}
      <div className="progress-section">
        <div className="progress-grid">
          <div className="progress-bar-container">
            <div className="progress-bar-header">
              <span className="progress-label">HACKATHON PROGRESS</span>
              <span className="progress-percentage">{progress.toFixed(1)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              <div className="progress-bar-pattern"></div>
            </div>
          </div>
          
          <div className="status-card current-time">
            <div className="status-label">CURRENT TIME</div>
            <div className="status-value time-value">{currentTime.toLocaleTimeString()}</div>
          </div>
          
          <div className="status-card next-event">
            <div className="status-label">NEXT EVENT</div>
            <div className="status-value event-value">{nextEventInfo.event}</div>
          </div>
          
          <div className="status-card countdown">
            <div className="status-label">COUNTDOWN</div>
            <div className="status-value time-value">{nextEventInfo.time}</div>
          </div>
        </div>
      </div>
      
      {/* Timeline section */}
      <div className="timeline-container">
        {/* Timeline line */}
        <div className="timeline-line"></div>
        
        {events.map((event, index) => {
          const dayLabel = getDayLabel(index);
          return (
            <React.Fragment key={event.id}>
              {dayLabel && (
                <div className="day-label-container">
                  <div className="day-marker">
                    <div className="day-marker-inner"></div>
                  </div>
                  <h2 className="day-label">{dayLabel}</h2>
                  <div className="day-divider"></div>
                </div>
              )}
              
              <div className="event-container">
                {/* Timeline node */}
                <div 
                  className={`event-node ${activeEvent === event.id ? 'event-node-active' : ''}`}
                  style={{ 
                    backgroundColor: getEventColor(event.type, true, activeEvent === event.id), 
                    transform: activeEvent === event.id ? 'scale(1.2)' : hoveredEvent === event.id ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: activeEvent === event.id ? '0 0 15px rgba(59, 130, 246, 0.7)' : ''
                  }}
                >
                  <span className="event-icon">{getEventIcon(event.type)}</span>
                </div>
                
                {/* Event card */}
                <div 
                  className={`event-card ${activeEvent === event.id ? 'event-card-active' : ''}`}
                  style={{ 
                    backgroundColor: getEventColor(event.type, true, activeEvent === event.id),
                    transform: activeEvent === event.id ? 'translateY(-5px)' : hoveredEvent === event.id ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  onClick={() => handleEventClick(event)}
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="event-header">
                    <div>
                      <h3 className="event-name">{event.name}</h3>
                      <div className="event-time">{event.time}</div>
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {activeEvent === event.id && (
                    <div className="event-details">
                      <p className="event-description">
                        {event.type === "hacking" && "Work on your project with your team. Mentors will be available to help."}
                        {event.type === "evaluation" && "Present your progress to judges for feedback and scoring."}
                        {event.type === "break" && "Time to rest, refuel, and network with other participants."}
                        {event.type === "ceremony" && "Join us for important announcements and celebrations."}
                        {event.type === "talk" && "Special guest speaker sharing insights and inspiration."}
                        {event.type === "recreation" && "Fun activities to energize teams during the night."}
                        {event.type === "logistics" && "Complete required check-in procedures and receive your welcome package."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="legend-container">
        <div className="legend-header">
          <h3 className="legend-title">EVENT TYPES</h3>
          <div className="legend-divider"></div>
        </div>
        <div className="legend-grid">
          {[
            { type: "hacking", label: "Coding Sessions" },
            { type: "evaluation", label: "Evaluations" },
            { type: "break", label: "Breaks" },
            { type: "ceremony", label: "Ceremonies" }
          ].map(item => (
            <div key={item.type} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: getEventColor(item.type, true) }}></div>
              <span className="legend-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Futuristic dots effect */}
      <div className="dots-effect">
        <div className="dots-container">
          <div className="dot-1"></div>
          <div className="dot-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;