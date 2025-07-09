import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
document.addEventListener('DOMContentLoaded', function() {
  function updateTime() {
    const timeEl = document.getElementById('local-time');
    if (timeEl) {
      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
  }
  
  setInterval(updateTime, 1000);
  updateTime();
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
