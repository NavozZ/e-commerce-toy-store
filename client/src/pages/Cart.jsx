import React, { useState, useContext, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Replace with your PUBLIC Key from Stripe Dashboard
const stripePromise = loadStripe("pk_test_51R9tRPQPiO4dcg7Wj1RN7awlnSpV4xZQHI1F43JnXWJpKoHEvk5hNaZCscfp7UWC92gdjVPwAkBo9fNK5q8UOabN001GXLXazp");

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Step 1: User clicks "Proceed to Checkout" -> We get a generic token from backend
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

  // Step 2: Payment Succeeded in CheckoutForm -> We save the Order
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

      alert("Order & Payment Successful! 🧸");
      clearCart();
      navigate('/account'); // Or success page
    } catch (err) {
      alert("Payment worked, but order saving failed: " + err.message);
    }
  };

  if (cartItems.length === 0) return <div className="text-center py-20 font-bold">Your bag is empty! 🛍️</div>;

  return (
    <div className="max-w-350 mx-auto px-6 py-10 lg:flex gap-10">
      {/* Left: Cart Items (Same as before) */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl font-black mb-10">Your Bag 🛒</h1>
        {cartItems.map((item) => (
           <div key={item._id} className="bg-white p-6 rounded-[2.5rem] flex items-center gap-6 shadow-sm border border-gray-100">
             <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-contain" />
             <div className="flex-1">
               <h3 className="font-bold">{item.name}</h3>
               <p className="text-blue-600 font-bold">${item.price}</p>
             </div>
             <span className="font-bold bg-gray-100 px-3 py-1 rounded-lg">x{item.qty}</span>
           </div>
        ))}
      </div>

      {/* Right: Payment Section */}
      <div className="w-full lg:w-96 mt-10 lg:mt-0">
        <div className="bg-gray-900 text-white p-10 rounded-[3rem] sticky top-24">
          <h2 className="text-2xl font-black mb-8">Summary</h2>
          <div className="flex justify-between text-xl font-black mb-8">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {!showPayment ? (
            <button 
              onClick={initiatePayment}
              className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-lg hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-3"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          ) : (
            // Render Stripe Elements when clientSecret is ready
            clientSecret && (
              <Elements options={{ clientSecret, appearance: { theme: 'night' } }} stripe={stripePromise}>
                <CheckoutForm amount={subtotal} onSuccess={handleOrderSuccess} />
              </Elements>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;