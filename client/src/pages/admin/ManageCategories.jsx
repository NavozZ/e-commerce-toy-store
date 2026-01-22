import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Plus, Tag } from 'lucide-react';

const ManageCategories = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    const { data } = await axios.get('/api/categories');
    setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Default color/icon for simplicity
      await axios.post('/api/categories', 
        { name, icon: 'Tag', color: 'bg-purple-50 text-purple-600' },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setName('');
      fetchCategories();
    } catch (err) { alert(err.message); }
  };

  const deleteHandler = async (id) => {
    if(window.confirm("Delete this category?")) {
      await axios.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchCategories();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-black mb-8">Manage Categories 🏷️</h1>
      
      {/* CREATE */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-10">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input 
            type="text" 
            placeholder="New Category Name (e.g. Puzzles)" 
            className="flex-1 p-4 bg-gray-50 rounded-xl outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="bg-black text-white px-8 rounded-xl font-bold flex items-center gap-2">
            <Plus size={20} /> Add
          </button>
        </form>
      </div>

      {/* READ & DELETE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat._id} className="flex justify-between items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${cat.color || 'bg-gray-100'}`}><Tag size={20}/></div>
              <span className="font-bold text-lg">{cat.name}</span>
            </div>
            <button onClick={() => deleteHandler(cat._id)} className="text-red-400 hover:bg-red-50 p-2 rounded-lg">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;