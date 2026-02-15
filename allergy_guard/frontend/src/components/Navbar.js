import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ apiKey, onLogout }) {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-[#12e258] text-black' : 'text-white hover:bg-white/10';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black italic text-[#12e258]">
              ALLERGY GUARD 🛡️
            </Link>
            <div className="hidden md:flex gap-2">
              <Link to="/" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/')}`}>
                Home
              </Link>
              <Link to="/register" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/register')}`}>
                Register
              </Link>
              <Link to="/menu" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/menu')}`}>
                Menu
              </Link>
              <Link to="/scanner" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/scanner')}`}>
                Scanner
              </Link>
              <Link to="/settings" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/settings')}`}>
                Settings
              </Link>
            </div>
          </div>
          {apiKey && (
            <button 
              onClick={onLogout}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-around py-2 border-t border-white/10 bg-black/60">
        <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive('/')}`}>Home</Link>
        <Link to="/register" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive('/register')}`}>Register</Link>
        <Link to="/menu" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive('/menu')}`}>Menu</Link>
        <Link to="/scanner" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive('/scanner')}`}>Scan</Link>
        <Link to="/settings" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive('/settings')}`}>Settings</Link>
      </div>
    </nav>
  );
}

export default Navbar;
