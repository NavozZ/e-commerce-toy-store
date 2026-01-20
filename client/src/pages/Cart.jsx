import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Simple cart state (In a real app, this might come from Context/Redux)
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('bunny_cart')) || [];
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to checkout!");
      navigate('/login');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // <--- Sending the Token!
        },
      };

      // Mock Shipping Address
      const orderData = {
        orderItems: cartItems,
        shippingAddress: { address: "123 Toy St", city: "Playtown" },
        totalPrice: totalPrice
      };

      const { data } = await axios.post('/api/orders', orderData, config);

      alert(`Order Placed Successfully! ID: ${data._id}`);
      
      // Clear Cart
      localStorage.removeItem('bunny_cart');
      setCartItems([]);
      
    } catch (error) {
      alert(error.response?.data?.message || "Checkout Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart 🛒</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
            {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                    <span>{item.name}</span>
                    <span className="font-bold">${item.price}</span>
                </div>
            ))}
            
            <div className="text-right text-xl font-bold mt-4">
                Total: ${totalPrice.toFixed(2)}
            </div>

            <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition"
            >
                Proceed to Checkout
            </button>
        </div>
      )}
    </div>
  );
};

export default Cart;