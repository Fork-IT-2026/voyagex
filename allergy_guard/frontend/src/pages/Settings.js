import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Settings({ apiKey, setApiKey }) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout? This will clear your API key.')) {
      setApiKey(null);
      localStorage.removeItem('allergyGuardApiKey');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <h1 className="text-4xl font-black italic text-[#12e258] mb-4">
            Settings
          </h1>
          <p className="text-gray-400">
            Manage your API key and account settings
          </p>
        </div>

        {!apiKey ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-white mb-4">No API Key Found</h2>
            <p className="text-gray-400 mb-8">Register your restaurant to get an API key.</p>
            <Link 
              to="/register" 
              className="bg-[#12e258] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-all inline-block"
            >
              Register Restaurant
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* API Key Section */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                🔑 Your API Key
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Use this API key to authenticate your requests when managing dishes and accessing the API.
              </p>
              
              <div className="flex gap-4">
                <div className="flex-1 bg-black/40 border border-white/20 p-4 rounded-xl font-mono text-[#12e258] break-all">
                  {showKey ? apiKey : '•'.repeat(Math.min(apiKey.length, 40))}
                </div>
                <button 
                  onClick={() => setShowKey(!showKey)}
                  className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                >
                  {showKey ? '👁️' : '👁️‍🗨️'}
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="bg-[#12e258] text-black px-4 py-2 rounded-xl font-bold hover:brightness-110 transition-all"
                >
                  {copied ? '✓' : '📋'}
                </button>
              </div>
              
              {copied && (
                <p className="text-green-400 text-sm mt-2 animate-in fade-in">
                  ✓ Copied to clipboard!
                </p>
              )}
            </div>

            {/* Account Actions */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                ⚙️ Account Actions
              </h2>
              
              <div className="space-y-4">
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-900/20 text-red-400 px-6 py-3 rounded-xl font-medium border border-red-500/50 hover:bg-red-900/40 transition-colors text-left"
                >
                  🚪 Logout (Clear API Key)
                </button>
              </div>
            </div>

            {/* Documentation Link */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                📚 API Documentation
              </h2>
              <p className="text-gray-400 mb-4">
                Learn how to integrate Allergy Guard into your applications.
              </p>
              
              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                <p className="text-gray-300 font-mono text-sm mb-2"># Example: Fetch Dishes</p>
                <p className="text-gray-500 text-sm">
                  curl -X GET "http://localhost:8000/dishes" \<br/>
                  &nbsp;&nbsp;-H "X-API-Key: {apiKey.substring(0, 8)}..."
                </p>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
              <h2 className="text-xl font-bold text-white mb-4">ℹ️ About Allergy Guard</h2>
              <div className="text-gray-400 space-y-2 text-sm">
                <p>Version: 1.0.0</p>
                <p>Backend: http://localhost:8000</p>
                <p>Purpose: Restaurant allergen detection system</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
