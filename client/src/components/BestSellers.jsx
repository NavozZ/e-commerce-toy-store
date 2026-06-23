import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { ShoppingBag, Star, Loader2, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext'; 
import { WishlistContext } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
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
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  if (error) return <div className="text-rose-500 p-10 text-center font-bold">Failed to load best sellers: {error}</div>;

  return (
    <section className="py-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-4">Best Sellers 🔥</h2>
          <p className="text-gray-500 font-medium text-lg">Our most loved toys, according to you!</p>
        </div>
        <Link to="/products" className="text-primary font-black hover:text-black transition-colors uppercase text-sm tracking-widest border-b-2 border-primary pb-1">
          View All Products
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="group relative bg-white p-6 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-105 transition-all duration-300">
            
            <div className="absolute top-6 right-6 z-10">
              <button 
                onClick={() => toggleWishlist(product)}
                className={`p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer ${isWishlisted(product._id) ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`}
              >
                <Heart size={20} />
              </button>
            </div>
            
            <Link to={`/product/${product._id}`}>
              <div className="aspect-square rounded-[2.5rem] bg-gray-50 overflow-hidden mb-6 relative cursor-pointer">
                <img 
                  src={product.imageUrl || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-10 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </Link>

            <div className="space-y-4">
              <Link to={`/product/${product._id}`}>
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary transition-colors line-clamp-1 cursor-pointer">
                  {product.name}
                </h3>
              </Link>
              
              <div className="flex items-center justify-between">
                <p className="text-primary font-black text-3xl">${product.price}</p>
                <div className="flex text-secondary gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-full font-black hover:bg-primary transition-all active:scale-95 hover:shadow-primary/20 hover:shadow-xl cursor-pointer"
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