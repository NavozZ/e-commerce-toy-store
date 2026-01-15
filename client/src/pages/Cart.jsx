import React, { useState } from 'react';
import { Trash2, CreditCard, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('toyCart')) || []);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('toyCart', JSON.stringify(updated));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    alert("Checkout functionality would connect to Member 3's Order API! 🚀");
    // Clear cart after checkout
    localStorage.removeItem('toyCart');
    setCartItems([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold flex items-center gap-3">
        <ShoppingBag className="text-blue-600" /> Your Shopping Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length > 0 ? cartItems.map(item => (
            <div key={item._id} className="bg-white p-4 rounded-3xl flex gap-4 items-center shadow-sm border border-gray-50">
              <img src={item.imageUrl} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-lg">${item.price * item.quantity}</p>
                <button onClick={() => removeItem(item._id)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-400">
              Your bag is empty.
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-fit space-y-6">
          <h2 className="font-bold text-xl border-b pb-4">Order Summary</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Delivery</span>
            <span className="font-bold font-mono">FREE</span>
          </div>
          <div className="pt-4 border-t flex justify-between items-end">
            <span className="text-gray-500 uppercase text-xs font-black">Total Amount</span>
            <span className="text-3xl font-black text-blue-600">${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <CreditCard size={20} /> Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;