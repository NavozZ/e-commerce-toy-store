import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { PlusCircle, Loader2 } from 'lucide-react';

const ManageProducts = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', category: '', image: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/products', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert("New Toy added to catalog! 🌟 (Live alert sent to everyone)");
      setFormData({ name: '', price: '', category: '', image: '', description: '' });
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50">
        <h2 className="text-3xl font-black mb-8">Add New Toy 🧸</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Toy Name" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price" className="p-4 bg-gray-50 rounded-2xl outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            <select className="p-4 bg-gray-50 rounded-2xl outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
              <option value="">Category</option>
              <option value="Lego">Lego</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Animals">Animals</option>
            </select>
          </div>
          <input type="text" placeholder="Image URL" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
          <textarea placeholder="Description" className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          
          <button disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-black transition-all">
            {loading ? <Loader2 className="animate-spin" /> : <><PlusCircle size={20} /> List Product</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageProducts;