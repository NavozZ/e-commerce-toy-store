import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to complete your order! 🐾");
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        orderItems: cartItems.map(x => ({
          name: x.name,
          qty: x.qty,
          image: x.image,
          price: x.price,
          product: x._id
        })),
        shippingAddress: { address: 'Default St', city: 'ToyCity' }, // Simplified for now
        totalPrice: subtotal
      };

      await axios.post('/api/orders', orderData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      alert("Order Placed! Thank you for shopping with Bunny & Bark 🧸");
      clearCart();
      navigate('/');
    } catch (err) {
      alert("Checkout error: " + (err.response?.data?.message || err.message));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6">
        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-black mb-4">Your Toy Bag is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any toys yet. Explore our collection to find the perfect gift!</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all">
          Go Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 lg:flex gap-10">
      {/* Left: Item List */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl font-black mb-10 text-gray-800 flex items-center gap-4">
          Your Bag <span className="text-sm font-bold bg-blue-100 text-blue-600 px-4 py-1 rounded-full">{cartItems.length} Items</span>
        </h1>
        
        {cartItems.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-xl">{item.name}</h3>
              <p className="text-blue-600 font-black">${item.price}</p>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
              <button onClick={() => removeFromCart(item._id)} className="p-1 hover:text-red-500"><Minus size={16} /></button>
              <span className="font-black w-4 text-center">{item.qty}</span>
              <button onClick={() => addToCart(item)} className="p-1 hover:text-blue-600"><Plus size={16} /></button>
            </div>

            <button 
              onClick={() => removeFromCart(item._id)} 
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}
      </div>

      {/* Right: Summary Card */}
      <div className="w-full lg:w-96 mt-10 lg:mt-0">
        <div className="bg-gray-900 text-white p-10 rounded-[3rem] sticky top-24">
          <h2 className="text-2xl font-black mb-8">Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400 border-b border-gray-800 pb-4">
              <span>Shipping</span>
              <span className="text-green-400 font-bold">FREE 🐾</span>
            </div>
            <div className="flex justify-between text-xl font-black pt-4">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-3"
          >
            Checkout <ArrowRight size={20} />
          </button>
          
          <p className="text-[10px] text-center mt-6 text-gray-500 uppercase tracking-widest font-bold">
            Secure SSL Checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;