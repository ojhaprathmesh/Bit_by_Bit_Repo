import Homepage from "./Pages/HomePage";
import BitByBit from "./Pages/BitbyBit";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader/Loader.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route element={<Homepage />} path="/" />
          <Route element={<Navigate to="/bit-by-bit" replace />} path="/clue-hunt" />
          <Route element={<BitByBit />} path="/bit-by-bit" />
        </Routes>
      )}
    </Router>
  );
}

export default App;
