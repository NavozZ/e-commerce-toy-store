import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Heart } from 'lucide-react';
import StockIndicator from '../components/StockIndicator';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-20 text-center font-bold">Loading Toy... 🧸</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-primary mb-10 font-bold transition-colors cursor-pointer">
        <ArrowLeft size={20} /> Back to Catalog
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-gray-50 relative">
          <img src={product.image} alt={product.name} className="w-full h-96 object-contain" />
        </div>
        
        <div className="space-y-8">
          <div>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">{product.category}</span>
            <h1 className="text-5xl font-black text-gray-900 mt-4">{product.name}</h1>
          </div>
          
          <p className="text-gray-500 leading-relaxed text-lg">{product.description || "A wonderful addition to your toy collection, crafted with love and designed for endless fun!"}</p>
          
          <div className="flex items-center gap-6 flex-wrap">
             <span className="text-4xl font-black text-primary">${product.price}</span>
             <div className="flex items-center gap-1 text-secondary bg-secondary/10 px-3 py-1 rounded-xl">
                 <Star size={16} fill="currentColor" /> <span className="font-bold text-secondary-hover text-sm">4.9 (120+ Reviews)</span>
             </div>
             <StockIndicator stock={product.stock} />
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex gap-4">
              <button 
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
                className="flex-1 bg-gray-900 text-white py-5 rounded-full font-black text-xl hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-primary/20 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <ShoppingBag /> {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                className={`p-5 rounded-full border border-gray-200 transition-all flex items-center justify-center cursor-pointer hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 ${isWishlisted(product._id) ? 'text-rose-500 fill-rose-500 border-rose-100 bg-rose-50/50' : 'text-gray-400 bg-white'}`}
              >
                <Heart size={24} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-medium mt-2">
              <ShieldCheck size={16} /> 30-Day Happiness Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;