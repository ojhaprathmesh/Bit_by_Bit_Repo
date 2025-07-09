import { useEffect, useRef } from "react";
import { Calendar, Code, Lightbulb, Users } from "lucide-react";
import "./aboutglitch.css";

export default function AboutSection() {
  const glitchTextRef = useRef(null);

  useEffect(() => {
    const glitchText = glitchTextRef.current;
    if (!glitchText) return;

    const glitchInterval = setInterval(() => {
      glitchText.classList.add("glitch-active");
      setTimeout(() => {
        glitchText.classList.remove("glitch-active");
      }, 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [glitchTextRef]);

  return (
    <section className="about-section">
      <div className="grid-background" />

      <div className="particles-container">
        <ParticleBackground />
      </div>

      <div className="container">
        <div className="event-header">
          <div className="title-container">
            <h1 ref={glitchTextRef} className="event-title glitch-active">
              GLITCH 2025
            </h1>
          </div>

          <div className="title-underline" />

          <p className="event-tagline">
            An annual technical celebration where innovation meets creativity
          </p>
        </div>

        <div className="content-layout-wrapper">
          <div className="event-features">
            <div className="feature-card-centered">
              <div className="feature-card">
                <h3 className="feature-title">
                  <span className="highlight">Glitch 2025</span> is an annual
                  technical extravaganza organized by the BML Munjal University
                  ACM Student Chapter in collaboration with regional ACM student
                  chapters across India.
                </h3>
                <p>
                  Join us for three days of cutting-edge technology, thrilling
                  competitions, hands-on workshops, and immersive entertainment
                  as we bring together tech enthusiasts, coders, innovators, and
                  creators from across the nation.
                </p>
                <div className="event-date">
                  <Calendar className="date-icon" />
                  <span>April 18-20, 2025</span>
                </div>
                <div>
                  <a
                    href="https://unstop.com/college-fests/glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-355060"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="register-button">REGISTER</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, index }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

function ParticleBackground() {
  return (
    <div className="particles">
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={index}
          className="particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}
