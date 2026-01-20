import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';

const Products = () => {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    // Falls back to empty array if backend is down
    axios.get('/api/products').then(res => setToys(res.data)).catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      {toys.map(toy => (
        <div key={toy._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group">
          <img src={toy.imageUrl} className="h-40 w-full object-cover rounded-xl mb-4 group-hover:scale-105 transition" />
          <h3 className="font-bold text-lg">{toy.name}</h3>
          <p className="text-blue-600 font-bold">${toy.price}</p>
          <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg flex items-center justify-center gap-2">
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;