import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import { ShoppingBag, Search as SearchIcon, Loader2, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import StockIndicator from '../components/StockIndicator';

const ageOptions = ['0-2', '3-5', '6-8', '9-12', '13+', 'All Ages'];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category') || '';
  const keywordQuery = searchParams.get('keyword') || '';
  const minPriceQuery = searchParams.get('minPrice') || '';
  const maxPriceQuery = searchParams.get('maxPrice') || '';
  const ageRangeQuery = searchParams.get('ageRange') || '';
  
  const [keyword, setKeyword] = useState(keywordQuery);
  const [minPrice, setMinPrice] = useState(minPriceQuery);
  const [maxPrice, setMaxPrice] = useState(maxPriceQuery);
  const [selectedAges, setSelectedAges] = useState(
    ageRangeQuery ? ageRangeQuery.split(',') : []
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams();
      if (categoryQuery) params.set('category', categoryQuery);
      if (keyword) params.set('keyword', keyword);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (selectedAges.length > 0) params.set('ageRange', selectedAges.join(','));
      setSearchParams(params);

      const fetchProducts = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get('/api/search/filter', {
            params: {
              keyword,
              category: categoryQuery,
              minPrice,
              maxPrice,
              ageRange: selectedAges.join(',')
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
  }, [keyword, categoryQuery, minPrice, maxPrice, selectedAges, setSearchParams]); 

  const handleAgeChange = (age) => {
    setSelectedAges(prev => 
      prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0 space-y-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 h-fit">
        <div>
          <h3 className="font-black text-lg mb-4 text-gray-800">Age Range</h3>
          <div className="space-y-3">
            {ageOptions.map(age => (
              <label key={age} className="flex items-center gap-3 font-medium text-sm text-gray-600 cursor-pointer hover:text-primary transition-colors">
                <input 
                  type="checkbox"
                  checked={selectedAges.includes(age)}
                  onChange={() => handleAgeChange(age)}
                  className="rounded-lg border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer accent-primary"
                />
                <span>{age === 'All Ages' ? 'All Ages' : `${age} years`}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
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
                className="w-full bg-white p-4 pl-12 rounded-2xl outline-none border border-gray-100 focus:border-primary shadow-sm"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input 
                type="number" 
                placeholder="Min $" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full sm:w-24 bg-white p-4 rounded-2xl outline-none border border-gray-100 focus:border-primary shadow-sm"
              />
              <input 
                type="number" 
                placeholder="Max $" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full sm:w-24 bg-white p-4 rounded-2xl outline-none border border-gray-100 focus:border-primary shadow-sm"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center gap-4">
            <span className="text-6xl animate-bounce">🔍</span>
            <h3 className="text-2xl font-black text-gray-800">Oops, no toys found!</h3>
            <p className="text-gray-500 font-medium max-w-md">
              We couldn't find any toys matching your active filters. Try adjusting your search term, price, or age filters!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="group relative bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 flex flex-col justify-between">
                
                <div className="absolute top-6 right-6 z-10">
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer ${isWishlisted(product._id) ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`}
                  >
                    <Heart size={20} />
                  </button>
                </div>

                <Link to={`/product/${product._id}`}>
                  <div className="cursor-pointer">
                     <img src={product.imageUrl || product.image} alt={product.name} className="w-full h-48 object-contain mb-4 group-hover:scale-110 transition-transform duration-500" />
                     <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                     <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                       <p className="text-primary font-black text-xl">${product.price}</p>
                       <StockIndicator stock={product.stock} />
                     </div>
                  </div>
                </Link>
                
                <button 
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-full font-black hover:bg-primary hover:shadow-primary/20 hover:shadow-lg transition-all cursor-pointer mt-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <ShoppingBag size={18} /> {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;