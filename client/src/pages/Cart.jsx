import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('toyCart')) || []
  );

  const calculateTotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Your Shopping Cart 🛒</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b py-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="mt-5 font-bold text-xl text-right">
            Total: ${calculateTotal()}
          </div>
          <button className="w-full bg-green-600 text-white py-3 mt-5 rounded hover:bg-green-700 transition">
            Checkout Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;