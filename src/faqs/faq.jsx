import React, { useState, useEffect } from 'react';
import './faq.css';

const FAQ = () => {
  const [openSection, setOpenSection] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems(sections.map((_, index) => index));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { 
      title: "Participant Eligibility", 
      content: "Open to tech professionals and all students. Multidisciplinary teams are encouraged." 
    },
    
    { 
      title: "Registration Process", 
      content: "Online registration through Unstop. Individual and team submissions accepted. " 
    },
    { 
      title: "Awards & Recognition", 
      content: "Comprehensive prize structure including cash awards and other opportunities. Top three teams receive 30,000, 20,000, and 10,000 (in rupees)respectively." 
    },
    { 
      title: "Evaluation Methodology", 
      content: "The above section represents evaluation criteria. All evaluation modes will be offline." 
    }
  ]

  return (
    <div className="hackathon-retro-faq-container" id='faqs'>
      <div className="hackathon-retro-faq">
        <div className="hackathon-retro-faq__header">
          <h2 className="hackathon-retro-faq__title">FAQs</h2>
          <div className="hackathon-retro-faq__edition-container">
            <div className="hackathon-retro-faq__edition">7TH EDITION</div>
          </div>
          {/* <p className="hackathon-retro-faq__description">
            A comprehensive platform for innovators to showcase groundbreaking technological solutions across diverse domains.
          </p> */}
        </div>

        <div className="hackathon-retro-faq__list">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`hackathon-retro-faq__item ${openSection === index ? 'is-active' : ''} ${visibleItems.includes(index) ? 'is-visible' : ''}`}
              style={{ '--item-index': index }}
            >
              <div 
                className="hackathon-retro-faq__item-header" 
                onClick={() => toggleSection(index)}
              >
                <h3 className="hackathon-retro-faq__item-title">{section.title}</h3>
                <span className="hackathon-retro-faq__toggle-icon">
                  {openSection === index ? '−' : '+'}
                </span>
              </div>
              
              <div className={`hackathon-retro-faq__item-content ${openSection === index ? 'is-visible' : ''}`}>
                <p className="hackathon-retro-faq__item-text">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;