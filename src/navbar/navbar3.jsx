// import React, { useState, useEffect, useRef } from 'react';
// import './navbar3.css';

// const CNavbar = () => {
//   const [activeItem, setActiveItem] = useState(null);
//   const [audioContext, setAudioContext] = useState(null);
//   const audioRef = useRef(null);
//   const canvasRef = useRef(null);
  
//   const navItems = [
//     { 
//       id: 'home', 
//       label: 'Home', 
//       color: '#FF5252', 
//       shape: 'circle',
//       sound: 'C4', 
//       frequency: 261.63,
//       texture: 'smooth'
//     },
//     { 
//       id: 'about', 
//       label: 'About', 
//       color: '#FFD740', 
//       shape: 'triangle',
//       sound: 'E4', 
//       frequency: 329.63,
//       texture: 'rough'
//     },
//     { 
//       id: 'services', 
//       label: 'Services', 
//       color: '#64FFDA', 
//       shape: 'square',
//       sound: 'G4', 
//       frequency: 392.00,
//       texture: 'bubbly'
//     },
//     { 
//       id: 'portfolio', 
//       label: 'Portfolio', 
//       color: '#448AFF', 
//       shape: 'hexagon',
//       sound: 'B4', 
//       frequency: 493.88,
//       texture: 'rippled'
//     },
//     { 
//       id: 'contact', 
//       label: 'Contact', 
//       color: '#E040FB', 
//       shape: 'pentagon',
//       sound: 'D5', 
//       frequency: 587.33,
//       texture: 'dotted'
//     }
//   ];
  
//   // Initialize Audio Context
//   useEffect(() => {
//     if (!audioContext) {
//       const AudioContext = window.AudioContext || window.webkitAudioContext;
//       setAudioContext(new AudioContext());
//     }
    
//     // Initialize canvas
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const resizeCanvas = () => {
//       canvas.width = canvas.parentElement.offsetWidth;
//       canvas.height = canvas.parentElement.offsetHeight;
//       drawShapes();
//     };
    
//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);
    
//     // Initial draw
//     drawShapes();
    
//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       if (audioContext) {
//         audioContext.close();
//       }
//     };
//   }, [audioContext]);
  
//   // Draw shapes when active item changes
//   useEffect(() => {
//     drawShapes();
//     if (activeItem && audioContext) {
//       playSound();
//     }
//   }, [activeItem]);
  
//   // Play sound based on active item
//   const playSound = () => {
//     if (!audioContext || !activeItem) return;
    
//     const item = navItems.find(item => item.id === activeItem);
    
//     // Create oscillator
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.type = 'sine';
//     oscillator.frequency.setValueAtTime(item.frequency, audioContext.currentTime);
    
//     gainNode.gain.setValueAtTime(0, audioContext.currentTime);
//     gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
//     gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     oscillator.start();
//     oscillator.stop(audioContext.currentTime + 0.5);
//   };
  
//   // Draw shapes on canvas
//   const drawShapes = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
    
//     const ctx = canvas.getContext('2d');
//     const width = canvas.width;
//     const height = canvas.height;
    
//     // Clear canvas
//     ctx.clearRect(0, 0, width, height);
    
//     // Draw background pattern based on active item
//     if (activeItem) {
//       const item = navItems.find(item => item.id === activeItem);
//       drawTexture(ctx, width, height, item);
//     }
    
//     // Draw shapes
//     navItems.forEach((item, index) => {
//       const x = (width / (navItems.length + 1)) * (index + 1);
//       const y = height / 2;
//       const size = item.id === activeItem ? 60 : 40;
      
//       ctx.save();
      
//       // Draw glow for active item
//       if (item.id === activeItem) {
//         ctx.shadowBlur = 20;
//         ctx.shadowColor = item.color;
//       }
      
//       ctx.fillStyle = item.color;
      
//       // Draw shape based on item
//       switch (item.shape) {
//         case 'circle':
//           ctx.beginPath();
//           ctx.arc(x, y, size / 2, 0, Math.PI * 2);
//           ctx.fill();
//           break;
          
//         case 'triangle':
//           ctx.beginPath();
//           ctx.moveTo(x, y - size / 2);
//           ctx.lineTo(x + size / 2, y + size / 2);
//           ctx.lineTo(x - size / 2, y + size / 2);
//           ctx.closePath();
//           ctx.fill();
//           break;
          
//         case 'square':
//           ctx.fillRect(x - size / 2, y - size / 2, size, size);
//           break;
          
//         case 'pentagon':
//           drawRegularPolygon(ctx, x, y, size / 2, 5, item.color);
//           break;
          
//         case 'hexagon':
//           drawRegularPolygon(ctx, x, y, size / 2, 6, item.color);
//           break;
          
//         default:
//           ctx.beginPath();
//           ctx.arc(x, y, size / 2, 0, Math.PI * 2);
//           ctx.fill();
//       }
      
//       // Draw label
//       ctx.fillStyle = '#ffffff';
//       ctx.font = '14px Arial';
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       ctx.fillText(item.label, x, y + size / 2 + 20);
      
//       ctx.restore();
//     });
//   };
  
//   // Helper function to draw regular polygons
//   const drawRegularPolygon = (ctx, x, y, radius, sides, color) => {
//     ctx.beginPath();
//     ctx.moveTo(x + radius, y);
    
//     for (let i = 1; i < sides; i++) {
//       const angle = (i * 2 * Math.PI / sides);
//       ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
//     }
    
//     ctx.closePath();
//     ctx.fillStyle = color;
//     ctx.fill();
//   };
  
//   // Draw texture based on active item
//   const drawTexture = (ctx, width, height, item) => {
//     ctx.globalAlpha = 0.1;
    
//     switch (item.texture) {
//       case 'smooth':
//         // Gradient background
//         const gradient = ctx.createRadialGradient(width/2, height/2, 10, width/2, height/2, width/2);
//         gradient.addColorStop(0, item.color);
//         gradient.addColorStop(1, 'transparent');
//         ctx.fillStyle = gradient;
//         ctx.fillRect(0, 0, width, height);
//         break;
        
//       case 'rough':
//         // Scratchy lines
//         ctx.strokeStyle = item.color;
//         ctx.lineWidth = 1;
//         for (let i = 0; i < 50; i++) {
//           ctx.beginPath();
//           ctx.moveTo(Math.random() * width, 0);
//           ctx.lineTo(Math.random() * width, height);
//           ctx.stroke();
//         }
//         break;
        
//       case 'bubbly':
//         // Bubbles
//         for (let i = 0; i < 30; i++) {
//           ctx.beginPath();
//           const bubbleX = Math.random() * width;
//           const bubbleY = Math.random() * height;
//           const bubbleSize = Math.random() * 30 + 5;
//           ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
//           ctx.fillStyle = item.color;
//           ctx.fill();
//         }
//         break;
        
//       case 'rippled':
//         // Concentric circles
//         for (let i = 0; i < 5; i++) {
//           ctx.beginPath();
//           ctx.arc(width/2, height/2, i * 50, 0, Math.PI * 2);
//           ctx.strokeStyle = item.color;
//           ctx.lineWidth = 2;
//           ctx.stroke();
//         }
//         break;
        
//       case 'dotted':
//         // Random dots
//         for (let i = 0; i < 100; i++) {
//           ctx.beginPath();
//           const dotX = Math.random() * width;
//           const dotY = Math.random() * height;
//           ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
//           ctx.fillStyle = item.color;
//           ctx.fill();
//         }
//         break;
        
//       default:
//         // Default background
//         ctx.fillStyle = `${item.color}20`;
//         ctx.fillRect(0, 0, width, height);
//     }
    
//     ctx.globalAlpha = 1;
//   };
  
//   // Handle canvas click
//   const handleCanvasClick = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
    
//     navItems.forEach((item, index) => {
//       const itemX = (canvas.width / (navItems.length + 1)) * (index + 1);
//       if (Math.abs(x - itemX) < 30) {
//         setActiveItem(item.id);
//         console.log(`Navigating to: ${item.id}`);
//       }
//     });
//   };
  
//   return (
//     <div className="synesthetic-navigator">
//       <div className="synesthetic-info">
//         <h3>Synesthetic Navigator</h3>
//         <p>Experience navigation through multiple senses - colors, shapes, and sounds work together.</p>
//         <p className="instruction-text">Click on shapes to navigate and experience the sensory crossover.</p>
        
//         {activeItem && (
//           <div className="sensory-feedback">
//             <div className="color-swatch" style={{ backgroundColor: navItems.find(item => item.id === activeItem).color }}></div>
//             <div className="sensory-details">
//               <span>Shape: {navItems.find(item => item.id === activeItem).shape}</span>
//               <span>Sound: {navItems.find(item => item.id === activeItem).sound}</span>
//               <span>Texture: {navItems.find(item => item.id === activeItem).texture}</span>
//             </div>
//           </div>
//         )}
//       </div>
      
//       <div className="canvas-container">
//         <canvas 
//           ref={canvasRef} 
//           className="synesthetic-canvas"
//           onClick={handleCanvasClick}
//         ></canvas>
//       </div>
      
//       <audio ref={audioRef}></audio>
//     </div>
//   );
// };

// export default CNavbar;