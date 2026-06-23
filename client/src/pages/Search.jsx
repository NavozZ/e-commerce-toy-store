import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import { ShoppingBag, Search as SearchIcon, Loader2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category') || '';
  const keywordQuery = searchParams.get('keyword') || '';
  const minPriceQuery = searchParams.get('minPrice') || '';
  const maxPriceQuery = searchParams.get('maxPrice') || '';
  
  const [keyword, setKeyword] = useState(keywordQuery);
  const [minPrice, setMinPrice] = useState(minPriceQuery);
  const [maxPrice, setMaxPrice] = useState(maxPriceQuery);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams();
      if (categoryQuery) params.set('category', categoryQuery);
      if (keyword) params.set('keyword', keyword);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      setSearchParams(params);

      const fetchProducts = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get('/api/search/filter', {
            params: {
              keyword,
              category: categoryQuery,
              minPrice,
              maxPrice
            }
          });
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, categoryQuery, minPrice, maxPrice, setSearchParams]); 

  return (
    <div className="max-w-350 mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <h1 className="text-4xl font-black text-gray-800">
          {categoryQuery ? `${categoryQuery} Collection` : 'All Toys'}
        </h1>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search toys..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-white p-4 pl-12 rounded-2xl outline-none border border-gray-100 focus:border-blue-500 shadow-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input 
              type="number" 
              placeholder="Min $" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full sm:w-24 bg-white p-4 rounded-2xl outline-none border border-gray-100 focus:border-blue-500 shadow-sm"
            />
            <input 
              type="number" 
              placeholder="Max $" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full sm:w-24 bg-white p-4 rounded-2xl outline-none border border-gray-100 focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" /></div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-gray-500 font-bold">
            No toys found {keyword ? `for '${keyword}' ` : ''} 
            {categoryQuery ? `in '${categoryQuery}' ` : ''}
            {(minPrice || maxPrice) ? `between $${minPrice || 0} and $${maxPrice || '∞'}` : ''}
          </p>
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