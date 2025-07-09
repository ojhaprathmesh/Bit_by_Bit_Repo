
// import React, { useState, useEffect } from 'react';
// import './navbar2.css';

// const BNavbar = ({ navItems }) => {
//   const [items, setItems] = useState([]);
  
//   useEffect(() => {
//     // Initialize items with timestamps and usage counts
//     if (navItems) {
//       const initializedItems = navItems.map(item => ({
//         ...item,
//         lastUsed: Date.now(),
//         usageCount: item.usageCount || 0,
//         age: 0, // Age in days (simulated)
//         evolution: 0 // Evolution stage (0-100)
//       }));
//       setItems(initializedItems);
//     }
//   }, [navItems]);
  
//   // Simulate the aging process
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = Date.now();
      
//       setItems(prevItems => 
//         prevItems.map(item => {
//           // Calculate how long since the item was used (in simulated days)
//           const daysSinceUsed = (now - item.lastUsed) / (1000 * 60); // Accelerated: 1 minute = 1 day
          
//           // Calculate evolution based on usage count and recency
//           const usageFactor = Math.min(item.usageCount / 10, 1); // Max at 10 uses
//           const recencyFactor = Math.max(1 - daysSinceUsed / 30, 0); // Decreases over 30 "days"
          
//           // Calculate combined evolution factor (0-100)
//           const newEvolution = Math.min(Math.round((usageFactor * 0.7 + recencyFactor * 0.3) * 100), 100);
          
//           return {
//             ...item,
//             age: daysSinceUsed,
//             evolution: newEvolution
//           };
//         })
//       );
//     }, 5000); // Update every 5 seconds
    
//     return () => clearInterval(interval);
//   }, []);
  
//   const handleItemClick = (index) => {
//     setItems(prevItems => 
//       prevItems.map((item, i) => {
//         if (i === index) {
//           return {
//             ...item,
//             lastUsed: Date.now(),
//             usageCount: item.usageCount + 1
//           };
//         }
//         return item;
//       })
//     );
//   };
  
//   // Get CSS class based on item evolution
//   const getEvolutionClass = (evolution) => {
//     if (evolution >= 80) return 'evolution-high';
//     if (evolution >= 50) return 'evolution-medium';
//     if (evolution >= 20) return 'evolution-low';
//     return 'evolution-dormant';
//   };
  
//   // Get size based on item evolution
//   const getSize = (evolution) => {
//     const baseSize = 1;
//     const growthFactor = evolution / 100 * 0.4; // Max 40% larger than base
//     return baseSize + growthFactor;
//   };

//   return (
//     <nav className="time-lapse-navbar">
//       <div className="timeline">
//         {items.map((item, index) => (
//           <div 
//             key={index}
//             className={`timeline-item ${getEvolutionClass(item.evolution)}`}
//             style={{
//               transform: `scale(${getSize(item.evolution)})`,
//               opacity: Math.max(0.5, Math.min(1, 1 - item.age / 60)) // Fade based on age
//             }}
//             onClick={() => handleItemClick(index)}
//           >
//             <span className="item-label">{item.label}</span>
//             <div className="evolution-indicator" style={{ width: `${item.evolution}%` }}></div>
//           </div>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default BNavbar;