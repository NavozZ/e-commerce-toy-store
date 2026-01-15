import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  // Member 3 Logic: LocalStorage Persistence
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('bunny_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("Please login first! (Member 2 Security Check)");

      await axios.post('/api/orders', 
        { items: cartItems, totalPrice: total },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      alert("Order Placed Successfully! 🚀");
      setCartItems([]);
      localStorage.removeItem('bunny_cart');
    } catch (err) {
      alert("Checkout failed. Member 3 logic error.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white rounded-[3rem] shadow-xl my-10">
      <h2 className="text-3xl font-black mb-8">Your Toy Bag 🧸</h2>
      {cartItems.length === 0 ? (
        <p className="italic text-gray-400">Bag is empty. Add some toys from the catalog!</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b pb-4">
              <span className="font-bold">{item.name}</span>
              <span className="text-blue-600">${item.price}</span>
            </div>
          ))}
          <div className="text-right text-2xl font-black">Total: ${total.toFixed(2)}</div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all"
          >
            Confirm & Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;