import React, { useState, useContext } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import { ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) {
  console.error("VITE_STRIPE_PUBLISHABLE_KEY is missing in environment variables.");
}
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const Cart = () => {
  const { cartItems, clearCart, removeFromCart, updateQty } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleQtyChange = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) {
      if (window.confirm("Remove this item from your cart?")) {
        removeFromCart(id);
      }
    } else {
      updateQty(id, newQty);
    }
  };

  const initiatePayment = async () => {
    if (!user) {
      alert("Please login to checkout!");
      return;
    }

    try {
      const { data } = await axios.post("/api/payment/create-payment-intent", 
        { amount: subtotal }, 
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (err) {
      alert("Error initializing payment: " + err.message);
    }
  };

  const handleOrderSuccess = async (paymentId) => {
    try {
      const orderData = {
        orderItems: cartItems.map(x => ({ ...x, product: x._id })),
        shippingAddress: { address: '123 Stripe St', city: 'Internet' },
        totalPrice: subtotal,
        paymentResult: { id: paymentId, status: 'completed', update_time: String(Date.now()) }
      };

      await axios.post('/api/orders', orderData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      setShowConfetti(true);
      setTimeout(() => {
        clearCart();
        navigate('/account'); 
      }, 3500);
    } catch (err) {
      alert("Payment worked, but order saving failed: " + err.message);
    }
  };

  if (cartItems.length === 0) return (
    <div className="max-w-md mx-auto text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center gap-4 mt-20">
      <span className="text-6xl animate-bounce">🛍️</span>
      <h3 className="text-2xl font-black text-gray-800">Your bag is empty!</h3>
      <p className="text-gray-500 font-medium max-w-sm">Looks like you haven't added any toys yet. Explore our magical collection and find the perfect playmate!</p>
      <button onClick={() => navigate('/products')} className="mt-4 bg-primary text-white px-6 py-3 rounded-full font-black hover:bg-primary-hover shadow-lg hover:shadow-primary/20 transition-all cursor-pointer">
        Go Shopping 🎠
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 lg:flex gap-10">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl font-black mb-10">Your Bag 🛒</h1>
        {cartItems.map((item) => (
           <div key={item._id} className="bg-white p-6 rounded-[2.5rem] flex items-center gap-6 shadow-sm border border-gray-100">
             <img src={item.imageUrl || item.image} alt={item.name} className="w-20 h-20 object-contain" />
             <div className="flex-1">
               <h3 className="font-bold text-gray-800">{item.name}</h3>
               <p className="text-primary font-black text-lg">${item.price}</p>
             </div>
             <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2">
               <button onClick={() => handleQtyChange(item._id, item.qty, -1)} className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-bold hover:bg-gray-100 transition-colors">-</button>
               <span className="font-bold w-4 text-center">{item.qty}</span>
               <button onClick={() => handleQtyChange(item._id, item.qty, 1)} className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-bold hover:bg-gray-100 transition-colors">+</button>
             </div>
             <button onClick={() => { if(window.confirm("Remove item?")) removeFromCart(item._id); }} className="p-3 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors cursor-pointer">
               <Trash2 size={20} />
             </button>
           </div>
        ))}
      </div>

      <div className="w-full lg:w-96 mt-10 lg:mt-0">
        <div className="bg-secondary text-gray-900 p-10 rounded-[3rem] sticky top-24 shadow-md">
          <h2 className="text-2xl font-black mb-8">Summary</h2>
          <div className="flex justify-between text-xl font-black mb-8 border-b border-gray-900/10 pb-4">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {!showPayment ? (
            <button 
              onClick={initiatePayment}
              className="w-full bg-primary text-white py-5 rounded-full font-black text-lg hover:bg-primary-hover hover:scale-105 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-primary/20"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          ) : (
            !stripePromise ? (
              <div className="bg-rose-100 text-rose-600 p-4 rounded-xl font-bold mt-4">
                Configuration Error: Payment system is currently unavailable (Missing Stripe Key).
              </div>
            ) : clientSecret && (
              <Elements options={{ clientSecret, appearance: { theme: 'night' } }} stripe={stripePromise}>
                <CheckoutForm amount={subtotal} onSuccess={handleOrderSuccess} />
              </Elements>
            )
          )}
        </div>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {[...Array(60)].map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const size = Math.random() * 10 + 6;
            const colors = ['#7C3AED', '#FFB800', '#10B981', '#EC4899', '#3B82F6'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <div 
                key={i}
                className="absolute top-0 animate-confetti"
                style={{
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: randomColor,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                }}
              />
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="bg-white p-10 rounded-[3rem] text-center shadow-2xl animate-bounce max-w-sm">
              <span className="text-6xl mb-4 block">🎉</span>
              <h2 className="text-3xl font-black text-primary">Success!</h2>
              <p className="text-gray-500 font-bold mt-2">Your toy order has been successfully placed! 🧸</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;