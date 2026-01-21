import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Edit, PlusCircle, Package } from 'lucide-react';

const ManageProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Lego', image: '', description: '' });

  // Fetch all for the list
  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert("Toy listed! 🧸");
      setFormData({ name: '', price: '', category: 'Lego', image: '', description: '' });
      fetchProducts();
    } catch (err) { alert(err.message); }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this toy?")) {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchProducts();
    }
  };

  return (
    <div className="max-w-350 mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Add Form */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
          <h2 className="text-2xl font-black mb-6">List New Toy</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
             <input type="text" placeholder="Name" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name} required />
             <input type="number" placeholder="Price" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" onChange={e => setFormData({...formData, price: e.target.value})} value={formData.price} required />
             <input type="text" placeholder="Image URL" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" onChange={e => setFormData({...formData, image: e.target.value})} value={formData.image} required />
             <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2">
                <PlusCircle size={20} /> Add Product
             </button>
          </form>
        </div>

        {/* Right: Product Table */}
        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-2xl font-black flex items-center gap-2"><Package className="text-amber-500" /> Current Inventory</h2>
           <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-gray-50 border-b border-gray-100">
                 <tr>
                   <th className="p-6 font-bold text-xs uppercase tracking-widest text-gray-400">Toy</th>
                   <th className="p-6 font-bold text-xs uppercase tracking-widest text-gray-400">Category</th>
                   <th className="p-6 font-bold text-xs uppercase tracking-widest text-gray-400">Price</th>
                   <th className="p-6 font-bold text-xs uppercase tracking-widest text-gray-400 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {products.map((p) => (
                   <tr key={p._id} className="hover:bg-blue-50/30 transition-colors">
                     <td className="p-6 font-bold text-gray-800">{p.name}</td>
                     <td className="p-6"><span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">{p.category}</span></td>
                     <td className="p-6 font-black text-blue-600">${p.price}</td>
                     <td className="p-6 text-right space-x-2">
                        <button onClick={() => deleteHandler(p._id)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={18}/></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;