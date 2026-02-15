import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [dishes, setDishes] = useState([]);
  const [scanResult, setScanResult] = useState(null);
  const [qrToken, setQrToken] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Register Restaurant
  const registerRestaurant = async () => {
    try {
      const res = await fetch(`${API_BASE}/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: 'Hackathon Resto', 
          email: `demo${Math.floor(Math.random() * 1000)}@test.com` 
        })
      });
      const data = await res.json();
      if (data.api_key) {
        setApiKey(data.api_key);
        alert('Registered! Your API Key is: ' + data.api_key);
      }
    } catch (err) {
      alert('Backend is not reachable. Ensure FastAPI is running on port 8000.');
    }
  };

  // 2. Fetch Dishes
  const fetchDishes = async () => {
    if (!apiKey) return;
    const res = await fetch(`${API_BASE}/dishes`, {
      headers: { 'X-API-Key': apiKey }
    });
    const data = await res.json();
    setDishes(Array.isArray(data) ? data : []);
  };

  // 3. Add Dish
  const addDish = async () => {
    const name = prompt('Dish Name:');
    const ingredients = prompt('Ingredients (comma separated):');
    if (!name || !ingredients) return;

    await fetch(`${API_BASE}/dishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({
        name: name,
        ingredients: ingredients.split(',').map(i => i.trim()),
        price: "150"
      })
    });
    fetchDishes();
  };

  // 4. Scan QR Code
  const handleScan = async () => {
    if (!qrToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/scan/${qrToken}`);
      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      alert('Invalid Token or Backend Error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#102216] text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <h1 className="text-4xl font-black italic text-[#12e258]">ALLERGY GUARD 🛡️</h1>
        {!apiKey ? (
          <button onClick={registerRestaurant} className="bg-[#12e258] text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition">
            Register Restaurant
          </button>
        ) : (
          <div className="flex gap-4">
            <button onClick={addDish} className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20">
              + Add Dish
            </button>
            <button onClick={fetchDishes} className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
              🔄 Refresh
            </button>
          </div>
        )}
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Management Panel */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-icons">restaurant_menu</span> Kitchen Dashboard
          </h2>
          {!apiKey ? (
            <p className="text-gray-400 italic">Please register to manage your menu.</p>
          ) : (
            <div className="space-y-4">
              {dishes.length === 0 && <p className="text-gray-500">No dishes added yet.</p>}
              {dishes.map(dish => (
                <div key={dish.id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{dish.name}</h3>
                    <p className="text-sm text-gray-400">{dish.ingredients?.join(', ')}</p>
                  </div>
                  <div className="text-[#12e258] font-mono text-sm">ID: {dish.id}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scan Panel */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-icons">qr_code_scanner</span> Customer Scan Simulation
          </h2>
          <div className="flex gap-2 mb-8">
            <input 
              value={qrToken}
              onChange={(e) => setQrToken(e.target.value)}
              placeholder="Enter QR Token or Dish ID"
              className="flex-1 bg-black/40 border border-white/20 p-3 rounded-xl focus:border-[#12e258] outline-none"
            />
            <button 
              onClick={handleScan}
              className="bg-[#12e258] text-black px-6 rounded-xl font-bold hover:brightness-110"
            >
              {loading ? '...' : 'SCAN'}
            </button>
          </div>

          {scanResult && (
            <div className={`p-6 rounded-2xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
              scanResult.allergens?.length > 0 ? 'bg-red-900/20 border-red-500' : 'bg-green-900/20 border-[#12e258]'
            }`}>
              <h3 className="text-2xl font-black mb-2 uppercase">{scanResult.dish_name || scanResult.name}</h3>
              
              {scanResult.allergens?.length > 0 ? (
                <div className="mb-4">
                  <p className="text-red-400 font-bold mb-2">🚨 ALLERGENS DETECTED:</p>
                  <div className="flex flex-wrap gap-2">
                    {scanResult.allergens.map(a => (
                      <span key={a} className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{a}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-[#12e258] font-bold mb-4">✅ SAFE: NO MAJOR ALLERGENS DETECTED</p>
              )}

              {scanResult.dietary_flags && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Dietary Profile</p>
                  <div className="flex flex-wrap gap-2">
                    {scanResult.dietary_flags.vegetarian && <span className="bg-green-700/40 text-green-400 px-2 py-1 rounded text-xs border border-green-700">VEGETARIAN</span>}
                    {scanResult.dietary_flags.vegan && <span className="bg-green-700/40 text-green-400 px-2 py-1 rounded text-xs border border-green-700">VEGAN</span>}
                    {scanResult.dietary_flags.gluten_free && <span className="bg-blue-700/40 text-blue-400 px-2 py-1 rounded text-xs border border-blue-700">GLUTEN-FREE</span>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;