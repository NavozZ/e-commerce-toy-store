import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Store } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Store /> ToyStore 🧸
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium">Catalog</Link>
          <Link to="/search" className="text-gray-600 hover:text-blue-600"><Search size={20} /></Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-600"><User size={20} /></Link>
          <Link to="/cart" className="text-gray-600 hover:text-blue-600 relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;