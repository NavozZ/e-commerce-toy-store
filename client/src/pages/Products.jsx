import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 1. Import Link
import { CartContext } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <h1 className="text-4xl font-black mb-10 text-gray-800">Explore Our Toys 🎠</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group border border-gray-100">
            
            {/* 2. WRAP IMAGE & TITLE IN LINK */}
            <Link to={`/product/${product._id}`}>
              <div className="cursor-pointer">
                <img src={product.imageUrl || product.image} alt={product.name} className="w-full h-48 object-contain mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors">{product.name}</h3>
                <p className="text-blue-600 font-black text-xl mb-4">${product.price}</p>
              </div>
            </Link>

            <button 
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
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