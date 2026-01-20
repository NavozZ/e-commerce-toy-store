import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShoppingBag, Star, Loader2 } from 'lucide-react';
import { CartContext } from '../context/CartContext'; // Member 3's logic integration

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Member 1: Integrate the cart add function
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        // Using the proxy route defined in vite.config.js
        const { data } = await axios.get('/api/products/best-sellers');
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (error) return <div className="text-red-500 p-10 text-center font-bold">Failed to load best sellers: {error}</div>;

  return (
    <section className="py-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-4">Best Sellers 🔥</h2>
          <p className="text-gray-500 font-medium text-lg">Our most loved toys, according to you!</p>
        </div>
        <button className="text-blue-600 font-black hover:text-black transition-colors uppercase text-sm tracking-widest border-b-2 border-blue-600 pb-1">
          View All Products
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="group relative bg-white p-6 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
            {/* Quick Action Overlay */}
            <div className="absolute top-6 right-6 z-10">
              <button className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-all text-gray-400">
                <Star size={20} />
              </button>
            </div>
            
            {/* Product Image Container */}
            <div className="aspect-square rounded-[2.5rem] bg-gray-50 overflow-hidden mb-6 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-10 group-hover:scale-110 transition-transform duration-700"
              />
              {/* Sold Out logic could go here */}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-blue-600 font-black text-3xl">${product.price}</p>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
              </div>
              
              {/* Member 1 & 3 Collaboration: Functional Button */}
              <button 
                onClick={() => {
                  addToCart(product);
                  // Optional: Trigger a notification instead of an alert
                }}
                className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-3xl font-black hover:bg-blue-600 transition-all active:scale-95 hover:shadow-blue-200 hover:shadow-xl"
              >
                <ShoppingBag size={20} />
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;