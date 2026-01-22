import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Plus, Tag, Edit3, Check, X } from 'lucide-react';

const ManageCategories = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchCategories = async () => {
    const { data } = await axios.get('/api/categories');
    setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/categories', 
        { name, icon: 'Tag', color: 'bg-purple-50 text-purple-600' },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setName('');
      fetchCategories();
    } catch (err) { alert(err.message); }
  };


  const updateHandler = async (id) => {
    try {
      await axios.put(`/api/categories/${id}`, 
        { name: editName },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setEditingId(null);
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
      <h1 className="text-3xl font-black mb-8 text-gray-900">Category Management 🏷️</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-10 flex gap-4">
        <input 
          type="text" 
          placeholder="Create new category..." 
          className="flex-1 p-4 bg-gray-50 rounded-xl outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="bg-black text-white px-8 rounded-xl font-bold flex items-center gap-2">
          <Plus size={20} /> Create
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat) => (
          <div key={cat._id} className="flex justify-between items-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600"><Tag size={20}/></div>
              
              {editingId === cat._id ? (
                <input 
                  className="font-bold text-lg p-2 bg-gray-50 rounded-lg w-full outline-purple-500"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                />
              ) : (
                <span className="font-bold text-lg text-gray-800">{cat.name}</span>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              {editingId === cat._id ? (
                <>
                  <button onClick={() => updateHandler(cat._id)} className="text-green-500 p-2 hover:bg-green-50 rounded-lg"><Check size={20}/></button>
                  <button onClick={() => setEditingId(null)} className="text-gray-400 p-2 hover:bg-gray-50 rounded-lg"><X size={20}/></button>
                </>
              ) : (
                <>
                  <button onClick={() => {setEditingId(cat._id); setEditName(cat.name);}} className="text-blue-400 p-2 hover:bg-blue-50 rounded-lg"><Edit3 size={18} /></button>
                  <button onClick={() => deleteHandler(cat._id)} className="text-red-400 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;