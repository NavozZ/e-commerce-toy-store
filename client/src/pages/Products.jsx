import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom'; 
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { ShoppingBag, Heart } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-black mb-10 text-gray-800">Explore Our Toys 🎠</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-primary font-black text-xl mb-4">${product.price}</p>
              </div>
            </Link>

            <button 
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-full font-black hover:bg-primary hover:shadow-primary/20 hover:shadow-lg transition-all cursor-pointer mt-2"
            >
              <ShoppingBag size={18} /> Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;