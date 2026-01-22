import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Megaphone, Trash2, Power } from 'lucide-react';

const ManageAnnouncements = () => {
  const { user } = useContext(AuthContext);
  const [msg, setMsg] = useState('');
  const [list, setList] = useState([]);

  const fetchAll = async () => {
    const { data } = await axios.get('/api/announcements');
    setList(data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    await axios.post('/api/announcements', { message: msg }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setMsg('');
    fetchAll();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/announcements/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    fetchAll();
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-6">Live Announcements Hub 📢</h1>
      <form onSubmit={handlePost} className="mb-10 flex gap-4 bg-white p-4 rounded-2xl shadow-sm">
        <input 
          className="flex-1 p-3 bg-gray-50 rounded-xl outline-none"
          placeholder="What's the news?"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold">Broadcast</button>
      </form>

      <div className="space-y-4">
        {list.map(a => (
          <div key={a._id} className="bg-white p-4 rounded-xl flex justify-between items-center border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <Megaphone className={a.isActive ? "text-amber-500" : "text-gray-300"} />
              <span className={a.isActive ? "font-bold" : "text-gray-400"}>{a.message}</span>
            </div>
            <button onClick={() => handleDelete(a._id)} className="text-red-400 p-2 hover:bg-red-50 rounded-lg">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAnnouncements;