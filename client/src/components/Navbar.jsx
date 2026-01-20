import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut, LayoutGrid, ToyBrick, Car, Dog } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Import Context

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user state
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter flex items-center gap-2">
          Bunny & Bark 🐾
        </Link>

        {/* Categories (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
          <Link to="/products" className="hover:text-blue-600 flex items-center gap-2"><LayoutGrid size={16} /> Shop</Link>
          <Link to="/search?category=Lego" className="hover:text-blue-600 flex items-center gap-2"><ToyBrick size={16} /> Blocks</Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-5">
          <Link to="/search" className="text-gray-400 hover:text-blue-600"><Search size={20} /></Link>
          
          {user ? (
            // LOGGED IN STATE
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-blue-800">Hi, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-full border border-red-100 text-red-600 text-xs font-bold uppercase hover:bg-red-100 transition"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            // GUEST STATE
            <Link to="/login" className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 hover:bg-blue-50 text-xs font-bold text-gray-700">
              <User size={18} /> Login
            </Link>
          )}

          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600">
            <ShoppingCart size={22} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;