import React from 'react';
import { Link } from 'react-router-dom';

function Home({ apiKey }) {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-black italic text-[#12e258] mb-6">
          ALLERGY GUARD
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Protect Your Customers with Instant Allergen Detection
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Scan QR codes to instantly detect allergens in dishes. 
          Keep your customers safe and your restaurant compliant.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#12e258]/50 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="text-4xl mb-4">🍽️</div>
          <h3 className="text-xl font-bold text-[#12e258] mb-3">Menu Management</h3>
          <p className="text-gray-400">
            Easily add and manage dishes with their ingredients. 
            Keep your menu up-to-date effortlessly.
          </p>
          <Link to="/menu" className="inline-block mt-4 text-[#12e258] hover:underline">
            Go to Menu →
          </Link>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#12e258]/50 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold text-[#12e258] mb-3">QR Scanner</h3>
          <p className="text-gray-400">
            Customers can scan dish QR codes to instantly see 
            allergen information and dietary flags.
          </p>
          <Link to="/scanner" className="inline-block mt-4 text-[#12e258] hover:underline">
            Try Scanner →
          </Link>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#12e258]/50 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="text-4xl mb-4">🔐</div>
          <h3 className="text-xl font-bold text-[#12e258] mb-3">Secure API</h3>
          <p className="text-gray-400">
            Get your unique API key to manage your restaurant 
            and keep your data secure.
          </p>
          <Link to="/settings" className="inline-block mt-4 text-[#12e258] hover:underline">
            View Settings →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
        <h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {!apiKey ? (
            <Link 
              to="/register" 
              className="bg-[#12e258] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-all"
            >
              Register Restaurant
            </Link>
          ) : (
            <>
              <Link 
                to="/menu" 
                className="bg-[#12e258] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-all"
              >
                Manage Menu
              </Link>
              <Link 
                to="/scanner" 
                className="bg-white/10 text-white px-8 py-3 rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all"
              >
                Test Scanner
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      <div className="max-w-xl mx-auto mt-12 text-center animate-in fade-in duration-700 delay-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-gray-400">Backend Connected</span>
        </div>
        <p className="text-xs text-gray-500">
          Running on http://localhost:8000
        </p>
      </div>
    </div>
  );
}

export default Home;
