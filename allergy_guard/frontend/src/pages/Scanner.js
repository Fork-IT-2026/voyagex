import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000';

function Scanner() {
  const [qrToken, setQrToken] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanHistory, setScanHistory] = useState([]);

  const handleScan = async () => {
    if (!qrToken) {
      setError('Please enter a QR token or dish ID');
      return;
    }
    
    setLoading(true);
    setError('');
    setScanResult(null);
    
    try {
      const res = await fetch(`${API_BASE}/scan/${qrToken}`);
      const data = await res.json();
      
      if (res.ok) {
        setScanResult(data);
        setScanHistory(prev => [{ token: qrToken, result: data, time: new Date() }, ...prev.slice(0, 4)]);
      } else {
        setError(data.detail || 'Invalid token or dish not found');
      }
    } catch (err) {
      setError('Backend is not reachable. Ensure FastAPI is running on port 8000.');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  const clearHistory = () => {
    setScanHistory([]);
    setScanResult(null);
    setQrToken('');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <h1 className="text-4xl font-black italic text-[#12e258] mb-4">
            QR Scanner
          </h1>
          <p className="text-gray-400">
            Scan a dish QR code to check for allergens and dietary information
          </p>
        </div>

        {/* Scanner Input */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100">
          <div className="flex gap-4 mb-4">
            <input 
              value={qrToken}
              onChange={(e) => setQrToken(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter QR Token or Dish ID"
              className="flex-1 bg-black/40 border border-white/20 p-4 rounded-xl focus:border-[#12e258] outline-none text-white text-lg"
            />
            <button 
              onClick={handleScan}
              disabled={loading}
              className="bg-[#12e258] text-black px-8 rounded-xl font-bold hover:brightness-110 transition-all disabled:opacity-50 min-w-[120px]"
            >
              {loading ? '...' : 'SCAN'}
            </button>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-xl">
              {error}
            </div>
          )}
        </div>

        {/* Scan Result */}
        {scanResult && (
          <div className={`p-8 rounded-2xl border-2 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
            scanResult.allergens?.length > 0 
              ? 'bg-red-900/20 border-red-500' 
              : 'bg-green-900/20 border-[#12e258]'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">
                {scanResult.allergens?.length > 0 ? '🚨' : '✅'}
              </span>
              <div>
                <h3 className="text-3xl font-black uppercase">{scanResult.dish_name || scanResult.name}</h3>
                <p className="text-gray-400">
                  {scanResult.allergens?.length > 0 
                    ? `${scanResult.allergens.length} allergen(s) detected` 
                    : 'No major allergens detected'}
                </p>
              </div>
            </div>
            
            {scanResult.allergens?.length > 0 && (
              <div className="mb-6">
                <p className="text-red-400 font-bold mb-3">⚠️ ALLERGENS DETECTED:</p>
                <div className="flex flex-wrap gap-3">
                  {scanResult.allergens.map((a, index) => (
                    <span 
                      key={index} 
                      className="bg-red-600 px-4 py-2 rounded-full text-sm font-bold uppercase animate-in fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {scanResult.dietary_flags && (
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">Dietary Profile</p>
                <div className="flex flex-wrap gap-3">
                  {scanResult.dietary_flags.vegetarian && (
                    <span className="bg-green-700/40 text-green-400 px-3 py-2 rounded-lg text-sm border border-green-700">
                      🥬 VEGETARIAN
                    </span>
                  )}
                  {scanResult.dietary_flags.vegan && (
                    <span className="bg-green-700/40 text-green-400 px-3 py-2 rounded-lg text-sm border border-green-700">
                      🌱 VEGAN
                    </span>
                  )}
                  {scanResult.dietary_flags.gluten_free && (
                    <span className="bg-blue-700/40 text-blue-400 px-3 py-2 rounded-lg text-sm border border-blue-700">
                      🌾 GLUTEN-FREE
                    </span>
                  )}
                </div>
              </div>
            )}

            {scanResult.ingredients && (
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Ingredients</p>
                <p className="text-gray-300">{scanResult.ingredients.join(', ')}</p>
              </div>
            )}
          </div>
        )}

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Recent Scans</h3>
              <button 
                onClick={clearHistory}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Clear History
              </button>
            </div>
            <div className="space-y-3">
              {scanHistory.map((item, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-3 bg-black/20 rounded-lg"
                >
                  <div>
                    <span className="text-white font-medium">{item.result.dish_name || item.result.name}</span>
                    <span className="text-gray-500 text-sm ml-2">{item.token}</span>
                  </div>
                  <span className={`text-sm font-bold ${
                    item.result.allergens?.length > 0 ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {item.result.allergens?.length > 0 
                      ? `${item.result.allergens.length} allergen(s)` 
                      : 'Safe'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Scanner;
