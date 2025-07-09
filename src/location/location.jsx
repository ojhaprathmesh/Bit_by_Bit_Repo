  import React from 'react';
  import { MapPin, Phone, Mail, Send } from 'lucide-react';
  import './location.css';

  const Location = () => {
    // Generate random particles for the lead organizers section
    const particles = Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 5 + 1;
      return {
        id: i,
        size,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 20 + 10
      };
    });

    const leads = [
      { name: "Gaurav Ghosh", title: "Lead Organizer\nHackNMU Command Center", initial: "G" },
      { name: "Sejal", title: "Lead Organizer\nQuantum Operations", initial: "S" },
      { name: "Tanmay", title: "Lead Organizer\nSystems Architect", initial: "T" }
    ];

    return (
      <div className="location-container">
        {/* Starry Background */}
        <div className="starry-background">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        <div className="content-wrapper">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">Reach out to the cosmic organizers</p>
          
          {/* Contact Cards Section */}
          <div className="organizer-cards">
            {/* Sejal Lead Organizer Card */}
            <div className="organizer-card">
              <div className="organizer-photo-container">
                <div className="organizer-photo-placeholder"></div>
                <div className="organizer-glow"></div>
              </div>
              <div className="organizer-info">
                <h3 className="organizer-name">Sejal</h3>
                <p className="organizer-title">Lead Organizer of HackNMU</p>
                <div className="organizer-contact">
                  <div className="info-box">
                    <Phone className="icon" />
                    <p className="info-text">+1 (COSMIC) 123-NEXUS</p>
                  </div>
                  <div className="info-box">
                    <Mail className="icon" />
                    <p className="info-text">sejal@hacknmu.universe</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gaurav Lead Organizer Card */}
            <div className="organizer-card">
              <div className="organizer-photo-container">
                <div className="organizer-photo-placeholder"></div>
                <div className="organizer-glow"></div>
              </div>
              <div className="organizer-info">
                <h3 className="organizer-name">Gaurav Ghosh</h3>
                <p className="organizer-title">Lead Organizer BMU</p>
                <div className="organizer-contact">
                  <div className="info-box">
                    <Phone className="icon" />
                    <p className="info-text">+1 (COSMIC) 456-WARP</p>
                  </div>
                  <div className="info-box">
                    <Mail className="icon" />
                    <p className="info-text">gaurav@bmu.universe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Lead Organizers Section */}
          <section className="lead-organizers-section">
            {/* Floating particles */}
            <div className="lead-particles">
              {particles.map(particle => (
                <div 
                  key={particle.id}
                  className="lead-particle"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    left: `${particle.left}%`,
                    bottom: `-${particle.size}px`,
                    animationDelay: `${particle.delay}s`,
                    animationDuration: `${particle.duration}s`
                  }}
                />
              ))}
            </div>
            
            <h2 className="lead-section-title">LEAD ORGANIZERS</h2>
            <p className="lead-section-subtitle">Commanding the cosmic hackathon</p>
            
            <div className="lead-organizers-grid">
              {leads.map((lead, index) => (
                <div key={index} className="lead-card">
                  <div className="lead-photo-container">
                    <div className="lead-photo-placeholder">
                      {lead.initial}
                    </div>
                    <div className="lead-glow"></div>
                  </div>
                  <h3 className="lead-name">{lead.name}</h3>
                  <p className="lead-title">{lead.title}</p>
                  <div className="lead-social">
                    <a href="#" className="social-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#40ff80" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </a>
                    <a href="#" className="social-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#40ff80" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </a>
                    <a href="#" className="social-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#40ff80" strokeWidth="2">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <div className="info-grid">
            {/* Contact Card */}
            <div className="contact-card">
              <div className="text-center">
                <h2 className="heading">Contact Nexus</h2>
                <p className="subtext">Quantum Communication Terminals</p>
              </div>
              <div className="contact-info">
                <div className="info-box">
                  <MapPin className="icon" />
                  <div>
                    <h3 className="info-title">Location</h3>
                    <p className="info-text">Orbital Station X-742, Cosmic Quadrant 9</p>
                  </div>
                </div>
                <div className="info-box">
                  <Phone className="icon" />
                  <div>
                    <h3 className="info-title">Quantum Link</h3>
                    <p className="info-text">+1 (COSMIC) 123-WARP</p>
                  </div>
                </div>
                <div className="info-box">
                  <Mail className="icon" />
                  <div>
                    <h3 className="info-title">Transmission Node</h3>
                    <p className="info-text">quantum.connect@cosmos.universe</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Component */}
            <div className="location-card">
              <div className="text-center">
                <h2 className="heading">Geospatial Coordinates</h2>
                <p className="subtext">Navigational Holographic Interface</p>
              </div>
              {/* Stylized Map Placeholder */}
              <div className="map-container">
                <div className="map-overlay"></div>
                <div className="map-ping">
                  <div className="ping-outer"></div>
                  <div className="ping-inner"></div>
                </div>
                <div className="map-coordinates">
                  <p className="coordinates-text">Latitude: 42° N Longitude: 71.0589° W</p>
                </div>
              </div>
              {/* Action Button */}
              <button className="navigation-button">
                <Send className="button-icon" />
                <span>Initialize Navigation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Location;