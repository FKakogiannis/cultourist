import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Map from './pages/Map';
import Settings from './pages/Settings';

const App = () => {
  const [savedPaintings, setSavedPaintings] = useState([]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home savedPaintings={savedPaintings} setSavedPaintings={setSavedPaintings} />} />
        <Route path="/saved" element={<Saved savedPaintings={savedPaintings} />} />
        <Route path="/map" element={<Map savedPaintings={savedPaintings} />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;