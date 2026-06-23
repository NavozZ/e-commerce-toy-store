import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Search,
  LogOut,
  LayoutGrid,
  Settings,
  Heart,
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wiggle, setWiggle] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setWiggle(true);
      const timer = setTimeout(() => setWiggle(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-secondary shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link
          to="/"
          className="text-2xl font-black text-primary tracking-tighter flex items-center gap-2"
        >
          Bunny & Bark 🐾
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
          <Link
            to="/products"
            className="hover:text-primary flex items-center gap-2 transition-colors"
          >
            <LayoutGrid size={16} /> Shop All
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link to="/search" className="text-gray-400 hover:text-primary transition-colors">
            <Search size={20} />
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/account" className="text-sm font-bold text-primary hover:underline">
                Hi, {user.name}
              </Link>

              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 bg-secondary/15 px-3 py-2 rounded-full border border-secondary/20 text-secondary-hover text-xs font-bold uppercase hover:bg-secondary/30 transition"
                >
                  <Settings size={14} /> Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-rose-50 px-3 py-2 rounded-full border border-rose-100 text-rose-500 text-xs font-bold uppercase hover:bg-rose-100 transition cursor-pointer"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 hover:bg-primary/10 hover:text-primary text-xs font-bold text-gray-700 transition"
            >
              <User size={18} /> Login
            </Link>
          )}

          <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-gray-900 text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className={`absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center ${wiggle ? 'animate-wiggle' : ''}`}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
