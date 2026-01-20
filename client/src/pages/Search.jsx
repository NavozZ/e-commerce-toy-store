import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search as SearchIcon, Filter, ShoppingBag } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Search = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category'); // Get category from URL
  
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      // Get all products and filter them on the frontend for simplicity, 
      // or you could create a specific backend route for this.
      const { data } = await axios.get('/api/products');
      
      let filtered = data;
      
      // Filter by Category if present in URL
      if (categoryQuery) {
        filtered = filtered.filter(p => p.category.toLowerCase() === categoryQuery.toLowerCase());
      }

      // Filter by Search Term if typing
      if (searchTerm) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      setProducts(filtered);
    };
    fetchProducts();
  }, [categoryQuery, searchTerm]);

  return (
    <div className="max-w-350 mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-4xl font-black text-gray-800">
          {categoryQuery ? `${categoryQuery} Collection 🧸` : 'Find Your Toy 🔍'}
        </h1>

        <div className="relative w-full md:w-96">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search for toys..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-bold">No toys found in this section...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-[2.5rem] border border-gray-50 hover:shadow-xl transition-all group">
              <div className="aspect-square mb-4 overflow-hidden rounded-2xl bg-gray-50">
                 <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-blue-600 font-black mb-4">${product.price}</p>
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;