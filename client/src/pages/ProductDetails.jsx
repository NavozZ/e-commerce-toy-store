import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, Star, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
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
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-10 font-bold transition-colors">
        <ArrowLeft size={20} /> Back to Catalog
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-gray-50">
          <img src={product.image} alt={product.name} className="w-full h-96 object-contain" />
        </div>
        
        <div className="space-y-8">
          <div>
            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">{product.category}</span>
            <h1 className="text-5xl font-black text-gray-900 mt-4">{product.name}</h1>
          </div>
          
          <p className="text-gray-500 leading-relaxed text-lg">{product.description || "A wonderful addition to your toy collection, crafted with love and designed for endless fun!"}</p>
          
          <div className="flex items-center gap-6">
             <span className="text-4xl font-black text-blue-600">${product.price}</span>
             <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-3 py-1 rounded-xl">
                <Star size={16} fill="currentColor" /> <span className="font-bold text-amber-700 text-sm">4.9 (120+ Reviews)</span>
             </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-200"
            >
              <ShoppingBag /> Add to Bag
            </button>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
              <ShieldCheck size={16} /> 30-Day Happiness Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;