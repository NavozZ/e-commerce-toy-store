import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Need Auth to know if we are logged in

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  // 1. Initialize from LocalStorage (Fast loading)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('bunny_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. FETCH DB CART on Login
  useEffect(() => {
    if (user) {
      const fetchServerCart = async () => {
        try {
          const { data } = await axios.get('/api/cart', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          // If DB has items, we use them. If DB is empty but Local is not, we keep Local.
          if (data && data.length > 0) {
            setCartItems(data);
          }
        } catch (err) {
          console.error("Failed to load cart", err);
        }
      };
      fetchServerCart();
    }
  }, [user]);

  // 3. AUTO-SAVE to DB whenever cart changes
  useEffect(() => {
    localStorage.setItem('bunny_cart', JSON.stringify(cartItems));

    if (user) {
      // Debounce saving to API (optional, but good practice)
      const saveToApi = async () => {
        try {
          await axios.post('/api/cart', 
            { cartItems }, 
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
        } catch (err) {
          console.error("Failed to sync cart", err);
        }
      };
      saveToApi();
    }
  }, [cartItems, user]);

  // --- Normal Cart Logic Below (Same as before) ---
  const addToCart = (product, qty = 1) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    if (existItem) {
      setCartItems(cartItems.map((x) =>
        x._id === product._id ? { ...existItem, qty: existItem.qty + qty } : x
      ));
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems(cartItems.map((x) => (x._id === id ? { ...x, qty } : x)));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};