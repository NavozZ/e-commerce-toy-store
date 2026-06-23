import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { PlusCircle, Package, Trash2, Loader2, Edit3 } from 'lucide-react';

const ManageProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    category: 'Lego', 
    imageUrl: '', 
    description: '',
    stock: ''
  });

  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        alert("Toy updated successfully! 🧸");
      } else {
        await axios.post('/api/products', formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        alert("Toy added successfully! 🧸");
      }
      setFormData({ name: '', price: '', category: 'Lego', imageUrl: '', description: '', stock: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert((editingId ? "Update" : "Creation") + " Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setFormData({
      name: p.name,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl,
      description: p.description,
      stock: p.stock || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', category: 'Lego', imageUrl: '', description: '', stock: '' });
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
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
          <h2 className="text-2xl font-black mb-6">{editingId ? 'Edit Toy' : 'List New Toy'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
             <input type="text" placeholder="Name" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" 
               onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name} required />
             <input type="number" placeholder="Price" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" 
               onChange={e => setFormData({...formData, price: e.target.value})} value={formData.price} required />
             <select 
               className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
               value={formData.category} 
               onChange={e => setFormData({...formData, category: e.target.value})} 
               required
               >
               <option value="Lego">Lego</option>
               <option value="Vehicles">Vehicles</option>
               <option value="Animals">Animals</option>
               <option value="Gaming">Gaming</option>
               <option value="Baby">Baby</option>
               <option value="Art">Art</option>
             </select>
             
             
             <input type="text" placeholder="Image URL (imageUrl)" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" 
               onChange={e => setFormData({...formData, imageUrl: e.target.value})} value={formData.imageUrl} required />
             
             <input type="number" placeholder="Stock" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" 
               onChange={e => setFormData({...formData, stock: e.target.value})} value={formData.stock} required />

             <textarea placeholder="Description" className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-32" 
               onChange={e => setFormData({...formData, description: e.target.value})} value={formData.description} required />
             
             <div className="flex gap-2">
               <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-black transition-all">
                  {loading ? <Loader2 className="animate-spin" /> : editingId ? <><Edit3 size={20} /> Update Toy</> : <><PlusCircle size={20} /> Add Product</>}
               </button>
               {editingId && (
                 <button type="button" onClick={cancelEdit} className="px-6 bg-gray-200 text-gray-700 py-4 rounded-2xl font-black hover:bg-gray-300 transition-all">
                   Cancel
                 </button>
               )}
             </div>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-2xl font-black flex items-center gap-2"><Package className="text-amber-500" /> Inventory</h2>
           <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-gray-50 border-b border-gray-100">
                 <tr>
                   <th className="p-6 font-bold text-xs uppercase tracking-widest text-gray-400">Toy</th>
                   <th className="p-6 font-bold text-xs uppercase tracking-widest text-gray-400">Price</th>
                   <th className="p-6 font-bold text-xs uppercase tracking-widest text-gray-400 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {products.map((p) => (
                   <tr key={p._id}>
                     <td className="p-6 font-bold text-gray-800">{p.name}</td>
                     <td className="p-6 font-black text-blue-600">${p.price}</td>
                     <td className="p-6 text-right space-x-2">
                        <button onClick={() => handleEdit(p)} className="p-3 text-blue-400 hover:bg-blue-50 rounded-xl"><Edit3 size={18}/></button>
                        <button onClick={() => deleteHandler(p._id)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl"><Trash2 size={18}/></button>
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