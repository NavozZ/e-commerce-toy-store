import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('bunny_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    if (user) {
      const fetchServerWishlist = async () => {
        try {
          const { data } = await axios.get('/api/wishlist', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          if (data) {
            setWishlistItems(data);
          }
        } catch (err) {
          console.error("Failed to load wishlist", err);
        }
      };
      fetchServerWishlist();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bunny_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = async (product) => {
    const exists = wishlistItems.some(item => item._id === product._id);
    if (!exists) {
      setWishlistItems([...wishlistItems, product]);
      if (user) {
        try {
          await axios.post(`/api/wishlist/${product._id}`, {}, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
        } catch (err) {
          console.error("Failed to add to server wishlist", err);
        }
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlistItems(wishlistItems.filter(item => item._id !== productId));
    if (user) {
      try {
        await axios.delete(`/api/wishlist/${productId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      } catch (err) {
        console.error("Failed to remove from server wishlist", err);
      }
    }
  };

  const isWishlisted = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  const toggleWishlist = (product) => {
    if (isWishlisted(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
