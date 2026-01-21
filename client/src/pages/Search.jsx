import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, Search as SearchIcon, Loader2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Search = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        
        let url = '/api/products';
        if (categoryQuery) {
          url += `?category=${categoryQuery}`;
        }
        
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryQuery]); 

  return (
    <div className="max-w-350 mx-auto px-6 py-10">
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-4xl font-black text-gray-800">
          {categoryQuery ? `${categoryQuery} Collection` : 'All Toys'}
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" /></div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-gray-500 font-bold">No toys found in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="aspect-square mb-4 bg-gray-50 rounded-2xl overflow-hidden p-6">
                 <img src={product.imageUrl || product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-blue-600 font-black text-xl mb-4">${product.price}</p>
              <button 
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
              >
                <ShoppingBag size={18} /> Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;