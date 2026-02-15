import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Scanner from './pages/Scanner';
import Settings from './pages/Settings';

function App() {
  const [apiKey, setApiKey] = useState('');

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('allergyGuardApiKey');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('allergyGuardApiKey', apiKey);
    } else {
      localStorage.removeItem('allergyGuardApiKey');
    }
  }, [apiKey]);

  const handleLogout = () => {
    setApiKey(null);
    localStorage.removeItem('allergyGuardApiKey');
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#102216] text-white font-sans">
        <Navbar apiKey={apiKey} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home apiKey={apiKey} />} />
          <Route path="/register" element={<Register apiKey={apiKey} setApiKey={setApiKey} />} />
          <Route path="/menu" element={<Menu apiKey={apiKey} />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/settings" element={<Settings apiKey={apiKey} setApiKey={setApiKey} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
