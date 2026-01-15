import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Star } from 'lucide-react';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Calling the proxy route defined in vite.config.js
    axios.get('/api/products/best-sellers')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Could not load best sellers. Ensure Docker DB is running.");
      });
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Best Sellers</h2>
          <p className="text-gray-500 mt-2">Our most loved handcrafted pieces.</p>
        </div>
        <button className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">View All</button>
      </div>

      {error && <p className="text-red-500 bg-red-50 p-4 rounded-xl">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product._id} className="group cursor-pointer">
            <div className="bg-[#F7F7F2] rounded-4xl p-8 mb-4 overflow-hidden relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ShoppingCart size={20} className="text-blue-600" />
              </button>
            </div>
            <div className="space-y-1 px-2">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={12} fill="currentColor" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Top Rated</span>
              </div>
              <h3 className="font-bold text-gray-800">{product.name}</h3>
              <p className="text-blue-600 font-black">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;