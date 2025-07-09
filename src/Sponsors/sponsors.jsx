import React, { useEffect, useRef, useState } from "react";
import "./sponsors.css";
import { assets } from "../assets/assets";

const Sponsors = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([]);
  const titleRef = useRef(null);
  const sponsorsRef = useRef(null);

  // Function to check device width for dynamic thresholds
  const getDeviceSpecificThreshold = () => {
    const width = window.innerWidth;
    if (width <= 576) return 0.1;  // Mobile
    if (width <= 992) return 0.2;  // Tablet
    return 0.3;  // Desktop
  };

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !cardsVisible.includes(index)) {
            setCardsVisible((prev) => [...prev, index]);
          }
        });
      },
      { threshold: getDeviceSpecificThreshold() }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    const cards = sponsorsRef.current?.querySelectorAll(".sponsor-card");
    cards?.forEach((card) => cardObserver.observe(card));

    // Handle resize events to adjust Observer thresholds
    const handleResize = () => {
      cardObserver.disconnect();
      
      const newCardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = parseInt(entry.target.getAttribute("data-index"));
            if (entry.isIntersecting && !cardsVisible.includes(index)) {
              setCardsVisible((prev) => [...prev, index]);
            }
          });
        },
        { threshold: getDeviceSpecificThreshold() }
      );
      
      const cards = sponsorsRef.current?.querySelectorAll(".sponsor-card");
      cards?.forEach((card) => newCardObserver.observe(card));
      
      return newCardObserver;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [cardsVisible]);

  const sponsors = [
    {
      name: "Spheron",
      logo: "https://cdn.brandfetch.io/idc9pQIv4m/w/820/h/984/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "Decentralized cloud hosting for modern web apps.",
    },
    {
      name: "Balsamiq",
      logo: "https://cdn.brandfetch.io/idG_yTIc33/w/820/h/206/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description:
        "Wireframing tool that helps teams plan user interfaces quickly.",
    },
    {
      name: "1Password",
      logo: "https://cdn.brandfetch.io/ids0xxqhX-/w/272/h/52/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "A secure password manager to protect your online accounts.",
    },
    {
      name: "Major League Hacking (MLH)",
      logo: "https://cdn.brandfetch.io/id76pHTjeR/w/820/h/346/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description:
        "Official student hackathon league supporting innovation and learning.",
    },
    {
      name: "Axure",
      logo: "https://cdn.brandfetch.io/id99STEpoQ/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "UX prototyping and wireframing software for teams.",
    },
    {
      name: "Leading Learners",
      logo: assets.learners,
      description:
        "Platform offering educational resources and student support programs.",
    },
    {
      name: "Taskade",
      logo: "https://cdn.brandfetch.io/idmPQXX073/w/820/h/219/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description:
        "Collaborative task management and team productivity platform.",
    },
    {
      name: "echo3D",
      logo: "https://cdn.brandfetch.io/ideSDI1U4x/w/521/h/96/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description:
        "Cloud platform for building and deploying 3D/AR/VR content.",
    },
    {
      name: "Wolfram",
      logo: "https://cdn.brandfetch.io/idcT0xhnHg/w/820/h/854/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "Advanced computation software and knowledge engine.",
    },
    {
      name: "Devfolio",
      logo: assets.devfolio,
      description: "India's largest community of developers & hackathons.",
    },
    {
      name: "Coding Ninjas",
      logo: "https://ninjasfiles.s3.amazonaws.com/logo.png",
      description: "Online coding courses for developers and learners.",
    },
    {
      name: "Coding Blocks",
      logo: "https://cdn.brandfetch.io/idlWUAEYyO/w/204/h/86/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description:
        "Coding Bootcamps and online courses for software development.",
    },
  ];

  // Optimized for different screen sizes to ensure text chunks are appropriate
  const splitDescription = (description) => {
    const screenWidth = window.innerWidth;
    let wordsPerLine = 10;
    
    if (screenWidth <= 576) {
      wordsPerLine = 5;
    } else if (screenWidth <= 768) {
      wordsPerLine = 7;
    }
    
    return description.split(" ").reduce((acc, word) => {
      if (!acc.length || acc[acc.length - 1].split(" ").length >= wordsPerLine) {
        acc.push(word);
      } else {
        acc[acc.length - 1] += " " + word;
      }
      return acc;
    }, []);
  };

  return (
    <div className="floating-hackathon-website">
      <div className="floating-background"></div>
      <div className="website-container">
        <section className="sponsors-section">
          <h2
            ref={titleRef}
            className={`sponsors_section-title ${
              titleVisible ? "visible" : ""
            }`}
          >
            Past Sponsors
          </h2>
          <div className="sponsors-grid" ref={sponsorsRef}>
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                data-index={index}
                className={`sponsor-card ${
                  cardsVisible.includes(index) ? "visible" : ""
                }`}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="sponsor-logo"
                />
                <div className="sponsor-details">
                  <h3>{sponsor.name}</h3>
                  {cardsVisible.includes(index) &&
                    splitDescription(sponsor.description).map(
                      (line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className="sponsor-description visible"
                          style={{
                            animationDelay: `${lineIndex * 0.8}s`,
                          }}
                        >
                          {line}
                        </p>
                      )
                    )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsors;
