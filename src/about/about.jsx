// import React, { useState, useEffect, useRef } from 'react';
// import './about.css';
// import { motion, useAnimate, AnimatePresence } from 'framer-motion';

// const About = () => {
//   // State hooks
//   const [stars, setStars] = useState([]);
//   const [nebulae, setNebulae] = useState([]);
//   const [asteroids, setAsteroids] = useState([]);
//   const [comets, setComets] = useState([]);
//   const [stellarEvents, setStellarEvents] = useState([]);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [isVisible, setIsVisible] = useState(true);

//   // Animation refs
//   const [scope, animate] = useAnimate();
//   const systemRef = useRef(null);

//   // Window resize effect
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Generate space elements
//   useEffect(() => {
//     const generateSpaceElements = () => {
//       const starCount = windowWidth < 768 ? 120 : 200;
//       const nebulaCount = windowWidth < 768 ? 5 : 10;
//       const asteroidCount = windowWidth < 768 ? 15 : 25;
//       const cometCount = windowWidth < 768 ? 3 : 7;
      
//       setStars(Array(starCount).fill().map((_, i) => ({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: Math.random() * 2.5 + 0.5,
//         opacity: Math.random() * 0.7 + 0.3,
//         pulse: Math.random() * 6 + 2,
//         delay: Math.random() * 5,
//         color: Math.random() > 0.8 ? 
//           `hsl(${Math.floor(Math.random() * 60) + 180}, 100%, 80%)` : 
//           'white'
//       })));
      
//       setNebulae(Array(nebulaCount).fill().map((_, i) => {
//         const hueOptions = [
//           Math.floor(Math.random() * 60) + 260,
//           Math.floor(Math.random() * 60) + 180,
//           Math.floor(Math.random() * 60) + 300,
//           Math.floor(Math.random() * 40) + 10,
//         ];
//         return {
//           id: i,
//           x: Math.random() * 100,
//           y: Math.random() * 100,
//           scale: Math.random() * 0.8 + 0.4,
//           rotation: Math.random() * 360,
//           hue: hueOptions[Math.floor(Math.random() * hueOptions.length)],
//           type: Math.random() > 0.5 ? 'radial' : 'cloudy',
//           blur: Math.random() * 20 + 20
//         };
//       }));
      
//       setAsteroids(Array(asteroidCount).fill().map((_, i) => ({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: Math.random() * 12 + 3,
//         rotation: Math.random() * 360,
//         speed: Math.random() * 20 + 10
//       })));
      
//       setComets(Array(cometCount).fill().map((_, i) => ({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 30 + 10,
//         angle: Math.random() * 40 + 20,
//         speed: Math.random() * 15 + 10,
//         tailLength: Math.random() * 40 + 20,
//         hue: Math.floor(Math.random() * 60) + 180
//       })));
//     };

//     generateSpaceElements();
//   }, [windowWidth]);

//   // Continuous space animation - FIXED: replaced Infinity with 19 as max repeat count
//   useEffect(() => {
//     const animation = animate([
//       [".nebula", { x: ["0%", "5%", "0%", "-5%", "0%"], y: ["0%", "3%", "-3%", "3%", "0%"] }, { duration: 60, ease: "easeInOut", repeat: 19 }],
//       [".star", { opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }, { duration: random(3, 8), delay: random(0, 5), repeat: 19 }],
//       [".saturn", { rotate: [0, 360] }, { duration: 180, ease: "linear", repeat: 19 }],
//       [".blue-planet", { rotate: [0, -360] }, { duration: 120, ease: "linear", repeat: 19 }]
//     ]);
    
//     return () => animation.stop();
//   }, []);

//   // Stellar events effect
//   useEffect(() => {
//     const eventInterval = setInterval(() => {
//       const newEvent = {
//         id: Date.now(),
//         type: Math.random() > 0.5 ? 'supernova' : 'meteor',
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         duration: Math.random() * 3 + 2
//       };
      
//       setStellarEvents(prev => [...prev, newEvent]);
      
//       setTimeout(() => {
//         setStellarEvents(prev => prev.filter(event => event.id !== newEvent.id));
//       }, newEvent.duration * 1000);
//     }, 4000);
    
//     return () => clearInterval(eventInterval);
//   }, []);

//   const handleRegisterClick = () => {
//     window.open('https://unstop.com/hackathons/hackbmu-70-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1432718', '_blank');
//   };

//   const planetSizes = {
//     saturn: windowWidth < 768 ? 9 : windowWidth < 1024 ? 12 : 15,
//     blue: windowWidth < 768 ? 7 : windowWidth < 1024 ? 9 : 11
//   };

//   // Helper function for random numbers
//   const random = (min, max) => Math.random() * (max - min) + min;

//   return (
//     <motion.div 
//       ref={scope}
//       className="space-section"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1.5 }}
//     >
//       {/* Starfield Background */}
//       <StarfieldBackground />
      
//       {/* Stellar Wind */}
//       <div className="stellar-wind" />
      
//       {/* Background gradient */}
//       <motion.div 
//         className="background-gradient"
//         style={{
//           background: `linear-gradient(to bottom, #020c17, #0a1e36, #1a2c52, #060421)`
//         }}
//       />
      
//       {/* Wormhole Effect */}
//       <WormholeEffect />
      
//       {/* Galaxy Spiral */}
//       <motion.div 
//         className="galaxy-spiral"
//         style={{ 
//           backgroundImage: `url('/img/galaxy-spiral.png')`,
//           backgroundSize: 'cover', 
//           opacity: 0.2,
//           position: 'absolute',
//           width: '150vw',
//           height: '150vh',
//           top: '-25vh',
//           left: '-25vw',
//         }}
//         animate={{ 
//           rotate: 360,
//           scale: [1, 1.1, 1]
//         }}
//         transition={{ 
//           rotate: { duration: 240, ease: "linear", repeat: 19 }, // FIXED: changed from Infinity to 19
//           scale: { duration: 30, ease: "easeInOut", repeat: 19, repeatType: "reverse" } // FIXED: changed from Infinity to 19
//         }}
//       />
      
//       {/* Nebulae */}
//       <div className="nebulae-container">
//         {nebulae.map(nebula => (
//           <motion.div
//             key={`nebula-${nebula.id}`}
//             className="nebula"
//             style={{
//               left: `${nebula.x}%`,
//               top: `${nebula.y}%`,
//               width: `${windowWidth < 768 ? 250 : 350 * nebula.scale}px`,
//               height: `${windowWidth < 768 ? 250 : 350 * nebula.scale}px`,
//               background: nebula.type === 'radial' ?
//                 `radial-gradient(circle, hsla(${nebula.hue}, 100%, 60%, 0.3), transparent 70%)` :
//                 `conic-gradient(
//                   hsla(${nebula.hue}, 100%, 70%, 0.4),
//                   hsla(${nebula.hue + 20}, 100%, 60%, 0.2),
//                   hsla(${nebula.hue - 20}, 100%, 50%, 0.3),
//                   hsla(${nebula.hue}, 100%, 70%, 0.4)
//                 )`,
//               transform: `rotate(${nebula.rotation}deg)`,
//               filter: `blur(${nebula.blur}px)`,
//               mixBlendMode: 'screen'
//             }}
//           />
//         ))}
//       </div>

//       {/* Stars */}
//       <div className="stars-container">
//         {stars.map(star => (
//           <motion.div
//             key={`star-${star.id}`}
//             className="star"
//             style={{
//               left: `${star.x}%`,
//               top: `${star.y}%`,
//               width: `${star.size}px`,
//               height: `${star.size}px`,
//               backgroundColor: star.color,
//               opacity: star.opacity,
//               boxShadow: `0 0 ${star.size * 3}px rgba(175, 200, 255, ${star.opacity * 0.8})`
//             }}
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ 
//               delay: star.delay * 0.1, 
//               duration: 0.5,
//               type: "spring"
//             }}
//           />
//         ))}
//       </div>
      
//       {/* Asteroids */}
//       {asteroids.map(asteroid => (
//         <motion.div
//           key={`asteroid-${asteroid.id}`}
//           className="asteroid"
//           style={{
//             position: 'absolute',
//             left: `${asteroid.x}%`,
//             top: `${asteroid.y}%`,
//             width: `${asteroid.size}px`,
//             height: `${asteroid.size * 0.7}px`,
//             backgroundColor: '#888',
//             borderRadius: '50%',
//             boxShadow: 'inset 2px -2px 4px rgba(255,255,255,0.4), inset -2px 2px 4px rgba(0,0,0,0.4)',
//             rotate: asteroid.rotation,
//             y: asteroid.speed * 5,
//             x: asteroid.id % 2 === 0 ? asteroid.speed : -asteroid.speed,
//           }}
//         />
//       ))}
      
//       {/* Comets */}
//       {comets.map(comet => (
//         <motion.div
//           key={`comet-${comet.id}`}
//           className="comet"
//           style={{
//             position: 'absolute',
//             left: `${comet.x}%`,
//             top: `${comet.y}%`,
//             width: '2px',
//             height: '2px',
//             backgroundColor: 'white',
//             borderRadius: '50%',
//             boxShadow: `0 0 8px 2px white`,
//             zIndex: 4,
//             y: comet.speed * 10,
//             x: comet.speed * comet.angle / 10,
//             opacity: 1,
//             filter: `blur(0.5px) drop-shadow(0 0 5px hsla(${comet.hue}, 100%, 70%, 0.8))`
//           }}
//         >
//           <motion.div
//             style={{
//               position: 'absolute',
//               top: 0,
//               right: 0,
//               width: `${comet.tailLength}px`,
//               height: '1px',
//               background: `linear-gradient(to left, hsla(${comet.hue}, 100%, 90%, 0.8), transparent)`,
//               transformOrigin: 'right center',
//               transform: `rotate(${comet.angle}deg)`,
//             }}
//           />
//         </motion.div>
//       ))}
      
//       {/* Stellar Events */}
//       {stellarEvents.map(event => (
//         <motion.div
//           key={event.id}
//           className={`stellar-event ${event.type}`}
//           style={{ 
//             left: `${event.x}%`, 
//             top: `${event.y}%` 
//           }}
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ 
//             opacity: event.type === 'supernova' ? [0, 1, 0] : [0, 0.8, 0],
//             scale: event.type === 'supernova' ? [0, 4, 0] : [0, 1, 0],
//           }}
//           transition={{ duration: event.duration }}
//         />
//       ))}
      
//       {/* Saturn */}
//       <motion.div 
//         className="planet saturn"
//         style={{
//           right: windowWidth < 768 ? '8%' : '12%',
//           top: windowWidth < 768 ? '30%' : '25%',
//           filter: `brightness(1.2) saturate(1.5)`
//         }}
//       >
//         <img 
//           src="/img/saturn.png" 
//           alt="Saturn planet" 
//           className="real-planet-image"
//           style={{
//             width: `${planetSizes.saturn}rem`,
//             height: `${planetSizes.saturn}rem`
//           }}
//         />
//         <motion.div
//           className="planet-glow"
//           style={{
//             position: 'absolute',
//             inset: '-30%',
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(255,220,150,0.2) 30%, transparent 70%)',
//             filter: 'blur(20px)',
//             opacity: 0.7
//           }}
//         />
//       </motion.div>
      
//       {/* Blue Planet */}
//       <motion.div 
//         className="planet blue-planet"
//         style={{
//           left: windowWidth < 768 ? '12%' : '15%',
//           bottom: windowWidth < 768 ? '25%' : '20%',
//           filter: `brightness(1.3) saturate(1.7) hue-rotate(10deg)`
//         }}
//       >
//         <img 
//           src="/img/blue.png" 
//           alt="Blue planet" 
//           className="real-planet-image"
//           style={{
//             width: `${planetSizes.blue}rem`,
//             height: `${planetSizes.blue}rem`
//           }}
//         />
//         <motion.div
//           className="planet-glow"
//           style={{
//             position: 'absolute',
//             inset: '-25%',
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(100,180,255,0.25) 30%, transparent 70%)',
//             filter: 'blur(15px)',
//             opacity: 0.6
//           }}
//         />
//       </motion.div>
      
//       {/* Content */}
//       <div className="content-container">
//         <div className={`content-wrapper ${windowWidth < 768 ? 'mobile' : ''}`}>
//           <AnimatePresence>
//             {isVisible && (
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -50 }}
//                 transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
//               >
//                 <motion.h2 
//                   className="discover-text" 
//                   style={{ 
//                     color: `rgba(200, 220, 255, 0.9)`,
//                     fontSize: windowWidth < 768 ? '1.25rem' : '1.5rem',
//                     textShadow: '0 0 10px rgba(100, 150, 255, 0.8)'
//                   }}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1, duration: 0.5 }}
//                 >
//                   ABOUT HACKBMU
//                 </motion.h2>
                
//                 <motion.h1 
//                   className="vision-title" 
//                   style={{ 
//                     backgroundImage: `linear-gradient(to right, 
//                       rgba(120, 150, 255, 1), 
//                       rgba(160, 170, 255, 1), 
//                       rgba(180, 140, 255, 1))`,
//                     fontSize: windowWidth < 768 ? '2.5rem' : windowWidth < 1024 ? '3.5rem' : '5rem',
//                     textShadow: '0 0 15px rgba(120, 150, 255, 0.5)'
//                   }}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
//                 >
//                   HackBMU 7.0
//                 </motion.h1>
                
//                 <motion.div 
//                   className="pulse-divider"
//                   initial={{ width: 0, opacity: 0 }}
//                   animate={{ width: windowWidth < 768 ? '3rem' : '4rem', opacity: 1 }}
//                   transition={{ delay: 0.5, duration: 0.8 }}
//                   style={{ 
//                     height: '0.25rem',
//                     marginBottom: '2rem',
//                     borderRadius: '2px',
//                     background: `linear-gradient(90deg, transparent, rgb(50, 80, 230), transparent)`,
//                     boxShadow: '0 0 15px rgb(50, 80, 230)',
//                     animation: 'pulseGlow 3s infinite alternate'
//                   }}
//                 />
                
//                 <motion.div 
//                   className="content-portal"
//                   initial={{ opacity: 0, borderWidth: "0px" }}
//                   animate={{ 
//                     opacity: 1, 
//                     borderWidth: "2px",
//                     boxShadow: [
//                       "0 0 0px rgba(100, 200, 255, 0)",
//                       "0 0 30px rgba(100, 200, 255, 0.7)",
//                       "0 0 10px rgba(100, 200, 255, 0.3)"
//                     ]
//                   }}
//                   transition={{ 
//                     duration: 3, 
//                     repeat: 19, // FIXED: changed from Infinity to 19
//                     repeatType: "reverse" 
//                   }}
//                 >
//                   <motion.p 
//                     className="content-paragraph first"
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.9, duration: 0.6 }}
//                     style={{ 
//                       color: 'rgb(200, 210, 240)',
//                       fontSize: windowWidth < 768 ? '1rem' : '1.125rem'
//                     }}
//                   >
//                     A hackathon focused on promoting innovation, diversity and networking among all future hackers. 
//                     We will be hosting upcoming engineers and developers from all over the World to create mobile, 
//                     web, and hardware hacks for an intense session.
//                   </motion.p>
                  
//                   <motion.p 
//                     className="content-paragraph second"
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 1.1, duration: 0.6 }}
//                     style={{ 
//                       color: 'rgb(200, 210, 240)',
//                       fontSize: windowWidth < 768 ? '1rem' : '1.125rem'
//                     }}
//                   >
//                     Our hackathon aims to disrupt the norm by challenging conventions, rethinking the ordinary, 
//                     and creating bold, game-changing solutions. If it's "how it's always been done," it's time 
//                     to disrupt it.
//                   </motion.p>

//                   <motion.p 
//                     className="content-paragraph third"
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 1.3, duration: 0.6 }}
//                     style={{ 
//                       color: 'rgb(200, 210, 240)',
//                       fontSize: windowWidth < 768 ? '1rem' : '1.125rem'
//                     }}
//                   >
//                     HackBMU seeks to provide a welcoming and supportive environment to all participants 
//                     to develop their skills, regardless of their background. Last year and the year before, 
//                     HackBMU garnered huge attention with 30+ teams from around the country.
//                   </motion.p>
                  
//                   <motion.div 
//                     className="button-container"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1.5, duration: 0.6 }}
//                   >
//                     <motion.button 
//                       className="expertise-button" 
//                       onClick={handleRegisterClick}
//                       style={{
//                         backgroundImage: 'linear-gradient(to right, rgb(30, 70, 200), rgb(60, 60, 180))',
//                         padding: windowWidth < 768 ? '0.6rem 1.5rem' : '0.75rem 2rem',
//                         fontSize: windowWidth < 768 ? '0.9rem' : '1rem',
//                         position: 'relative',
//                         overflow: 'hidden'
//                       }}
//                       whileHover={{ 
//                         scale: 1.05,
//                         boxShadow: "0 0 20px rgba(0, 136, 255, 0.7)"
//                       }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <span style={{ position: 'relative', zIndex: 2 }}>Register Now</span>
//                       <motion.div
//                         style={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           right: 0,
//                           bottom: 0,
//                           background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
//                           transform: 'translateX(-100%)',
//                           zIndex: 1
//                         }}
//                         animate={{ 
//                           x: ['100%', '-100%']
//                         }}
//                         transition={{ 
//                           repeat: 19, // FIXED: changed from Infinity to 19
//                           duration: 2, 
//                           ease: "easeInOut" 
//                         }}
//                       />
//                     </motion.button>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const StarfieldBackground = () => {
//   return (
//     <>
//       <div className="starfield-layer layer-1"></div>
//       <div className="starfield-layer layer-2"></div>
//       <div className="starfield-layer layer-3"></div>
//     </>
//   );
// };

// const WormholeEffect = () => {
//   return (
//     <motion.div 
//       className="wormhole-container"
//       initial={{ opacity: 0, scale: 0 }}
//       animate={{ 
//         opacity: [0, 0.8, 0.5, 0.8, 0], 
//         scale: [0, 1.5, 2, 2.5, 3],
//         rotate: [0, 180, 360, 540, 720]
//       }}
//       transition={{ 
//         duration: 20,
//         repeat: 100, // FIXED: changed from Infinity to 19
//         repeatType: "loop"
//       }}
//     />
//   );
// };

// export default About;



import React from 'react';
import './about.css';

const About = () => {
  const handleRegisterClick = () => {
    window.open('https://unstop.com/hackathons/hackbmu-70-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1432718', '_blank');
  };

  return (
    <div className="space-section">
      {/* Static background elements */}
      <div className="static-space-background">
        <div className="static-stars"></div>
        <div className="static-nebula"></div>
      </div>

      {/* Content */}
      <div className="content-container">
        <div className="content-wrapper">
          <div className="static-content-box">
            <h2 className="discover-text">
              ABOUT HACKBMU
            </h2>
            
            <h1 className="vision-title">
              HackBMU 7.0
            </h1>
            
            <div className="static-divider" />
            
            <div className="content-portal">
              <p className="content-paragraph">
                A hackathon focused on promoting innovation, diversity and networking among all future hackers. 
                We will be hosting upcoming engineers and developers from all over the World to create mobile, 
                web, and hardware hacks for an intense session.
              </p>
              
              <p className="content-paragraph">
                Our hackathon aims to disrupt the norm by challenging conventions, rethinking the ordinary, 
                and creating bold, game-changing solutions. If it's "how it's always been done," it's time 
                to disrupt it.
              </p>

              <p className="content-paragraph">
                HackBMU seeks to provide a welcoming and supportive environment to all participants 
                to develop their skills, regardless of their background. Last year and the year before, 
                HackBMU garnered huge attention with 30+ teams from around the country.
              </p>
              
              <div className="button-container">
                <button 
                  className="expertise-button" 
                  onClick={handleRegisterClick}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static planets */}
      <div className="static-planet saturn">
        <img 
          src="/img/saturn.png" 
          alt="Saturn planet" 
          className="real-planet-image"
        />
      </div>
      
      <div className="static-planet blue-planet">
        <img 
          src="/img/blue.png" 
          alt="Blue planet" 
          className="real-planet-image"
        />
      </div>
    </div>
  );
};

export default About;