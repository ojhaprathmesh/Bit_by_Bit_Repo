import React, { useLayoutEffect, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "@studio-freight/lenis";
import Faq from "../faqs/faq.jsx";
import Sponsors from "../Sponsors/sponsors.jsx";
import Roadmap from "../timeline/Roadmap.jsx";
import Navbar from "../navbar/navbar1.jsx"; // This should be your CosmicNav component
import Footer from "../footer/footer.jsx";
import Glimpses from "../glimpses/glimpses.jsx";
import About from "../about/about.jsx";
import AboutGlitch from "../aboutglitch/aboutglitch.jsx";
import "./HomePage.css";
import LeadOrganizers from "../LeadOrganizers/LeadOrganizers.jsx";
import ContactUs from "../ContactUs/ContactUs.jsx";
import VenueSection from "../VenueSection/VenueSection.jsx";
import Loader from "../Loader/Loader.jsx";
import Hero from "../hero/hero.jsx";

function Homepage() {
  const lenis = new Lenis({ duration: 2 });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  useLayoutEffect(() => {
    AOS.init();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000 + Math.random() * 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          
          {/* Main content sections with IDs matching the navbar items */}
          <section id="home">
            <Hero />
          </section>
          

          <section id="aboutglitch">
            <AboutGlitch />
          </section>
          
          <section id="memories">
            <Glimpses />
          </section>
          
          <section id="sponsors">
            <Sponsors />
          </section>
          
          <section id="timeline">
            <Roadmap />
          </section>
          
          <section id="team">
            <LeadOrganizers />
          </section>
          
          {/* Additional sections that might not be in navbar */}
          <VenueSection />
          <ContactUs />
          <Faq />
          
          <Footer />
        </>
      )}
    </>
  );
}

export default Homepage;