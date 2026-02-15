import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000';

function Register({ apiKey, setApiKey }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantEmail, setRestaurantEmail] = useState('');

  const registerRestaurant = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: restaurantName, 
          email: restaurantEmail 
        })
      });
      const data = await res.json();
      
      if (data.api_key) {
        setApiKey(data.api_key);
        alert('Registration successful! Your API Key is: ' + data.api_key);
      } else if (data.detail) {
        setError(data.detail);
      }
    } catch (err) {
      setError('Backend is not reachable. Ensure FastAPI is running on port 8000.');
    }
    setLoading(false);
  };

  if (apiKey) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl border border-[#12e258]/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-[#12e258] mb-4">Already Registered!</h2>
            <p className="text-gray-400 mb-6">Your restaurant is already registered.</p>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10 mb-6">
              <p className="text-sm text-gray-400 mb-2">Your API Key:</p>
              <p className="font-mono text-[#12e258] break-all">{apiKey}</p>
            </div>
            <p className="text-sm text-gray-500">Go to Settings to view or manage your API key.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <h1 className="text-4xl font-black italic text-[#12e258] mb-4">
            Register Your Restaurant
          </h1>
          <p className="text-gray-400">
            Get started with Allergy Guard by registering your restaurant
          </p>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100">
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={registerRestaurant} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Enter your restaurant name"
                required
                className="w-full bg-black/40 border border-white/20 p-4 rounded-xl focus:border-[#12e258] outline-none transition-colors text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={restaurantEmail}
                onChange={(e) => setRestaurantEmail(e.target.value)}
                placeholder="restaurant@example.com"
                required
                className="w-full bg-black/40 border border-white/20 p-4 rounded-xl focus:border-[#12e258] outline-none transition-colors text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#12e258] text-black px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register Restaurant'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-500 text-center">
              After registration, you'll receive an API key to manage your menu and dishes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
