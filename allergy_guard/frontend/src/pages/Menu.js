import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:8000';

function Menu({ apiKey }) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDish, setNewDish] = useState({ name: '', ingredients: '', price: '' });

  useEffect(() => {
    if (apiKey) {
      fetchDishes();
    }
  }, [apiKey]);

  const fetchDishes = async () => {
    if (!apiKey) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/dishes`, {
        headers: { 'X-API-Key': apiKey }
      });
      const data = await res.json();
      setDishes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching dishes:', err);
    }
    setLoading(false);
  };

  const addDish = async (e) => {
    e.preventDefault();
    if (!apiKey || !newDish.name || !newDish.ingredients) return;

    try {
      await fetch(`${API_BASE}/dishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify({
          name: newDish.name,
          ingredients: newDish.ingredients.split(',').map(i => i.trim()),
          price: newDish.price || "150"
        })
      });
      setNewDish({ name: '', ingredients: '', price: '' });
      setShowAddModal(false);
      fetchDishes();
    } catch (err) {
      alert('Error adding dish');
    }
  };

  const deleteDish = async (dishId) => {
    if (!confirm('Are you sure you want to delete this dish?')) return;
    
    try {
      await fetch(`${API_BASE}/dishes/${dishId}`, {
        method: 'DELETE',
        headers: { 'X-API-Key': apiKey }
      });
      fetchDishes();
    } catch (err) {
      alert('Error deleting dish');
    }
  };

  if (!apiKey) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-3xl font-bold text-white mb-4">API Key Required</h2>
          <p className="text-gray-400 mb-8">Please register your restaurant first to manage your menu.</p>
          <Link 
            to="/register" 
            className="bg-[#12e258] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-all inline-block"
          >
            Register Restaurant
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-4xl font-black italic text-[#12e258] mb-2">
              Menu Management
            </h1>
            <p className="text-gray-400">Manage your restaurant dishes and ingredients</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={fetchDishes}
              className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
            >
              🔄 Refresh
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#12e258] text-black px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all"
            >
              + Add Dish
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-[#12e258] border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading dishes...</p>
          </div>
        ) : dishes.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-white mb-2">No Dishes Yet</h3>
            <p className="text-gray-400 mb-6">Start by adding your first dish to the menu.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#12e258] text-black px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all"
            >
              Add First Dish
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish, index) => (
              <div 
                key={dish.id} 
                className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#12e258]/50 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{dish.name}</h3>
                  <button 
                    onClick={() => deleteDish(dish.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  {dish.ingredients?.join(', ')}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-[#12e258] font-mono text-sm">ID: {dish.id}</span>
                  <span className="text-white font-bold">${dish.price || '150'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Dish Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e] p-8 rounded-2xl border border-white/10 max-w-md w-full animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Dish</h2>
            <form onSubmit={addDish} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dish Name</label>
                <input
                  type="text"
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  placeholder="e.g., Chicken Curry"
                  required
                  className="w-full bg-black/40 border border-white/20 p-3 rounded-xl focus:border-[#12e258] outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ingredients (comma separated)
                </label>
                <textarea
                  value={newDish.ingredients}
                  onChange={(e) => setNewDish({ ...newDish, ingredients: e.target.value })}
                  placeholder="chicken, curry, spices, coconut milk"
                  required
                  rows={3}
                  className="w-full bg-black/40 border border-white/20 p-3 rounded-xl focus:border-[#12e258] outline-none text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                <input
                  type="text"
                  value={newDish.price}
                  onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                  placeholder="150"
                  className="w-full bg-black/40 border border-white/20 p-3 rounded-xl focus:border-[#12e258] outline-none text-white"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#12e258] text-black px-4 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
                >
                  Add Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
