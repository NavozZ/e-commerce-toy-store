import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, ToyBrick, Car, Dog, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Left: Branding */}
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter flex items-center gap-2">
          Bunny & Bark 🐾
        </Link>

        {/* Middle: Navigation Tabs (Category Filters) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
          <Link to="/products" className="hover:text-blue-600 flex items-center gap-2 transition-colors">
            <LayoutGrid size={16} /> Shop All
          </Link>
          <Link to="/search?category=Lego" className="hover:text-blue-600 flex items-center gap-2 transition-colors">
            <ToyBrick size={16} /> Blocks
          </Link>
          <Link to="/search?category=Vehicles" className="hover:text-blue-600 flex items-center gap-2 transition-colors">
            <Car size={16} /> Vehicles
          </Link>
          <Link to="/search?category=Animals" className="hover:text-blue-600 flex items-center gap-2 transition-colors">
            <Dog size={16} /> Animals
          </Link>
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center gap-5">
          <Link to="/search" className="text-gray-400 hover:text-blue-600">
            <Search size={20} />
          </Link>
          
          <Link to="/login" className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all group">
            <User size={18} className="text-gray-500 group-hover:text-blue-600" />
            <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600">Login</span>
          </Link>

          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ShoppingCart size={22} />
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-lg">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;