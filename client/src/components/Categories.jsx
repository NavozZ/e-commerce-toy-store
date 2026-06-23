import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Blocks, 
  Shield, 
  Home, 
  Atom, 
  Sun, 
  Puzzle, 
  Palette, 
  Gamepad2, 
  Heart, 
  Baby, 
  Car, 
  PartyPopper 
} from 'lucide-react';

const iconMap = {
  Blocks,
  Shield,
  Home,
  Atom,
  Sun,
  Puzzle,
  Palette,
  Gamepad2,
  Heart,
  Baby,
  Car,
  PartyPopper
};

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-10">
      <h2 className="text-3xl font-black mb-8 text-gray-900 tracking-tight uppercase">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat) => {
          const isImageUrl = cat.icon && cat.icon.startsWith('http');
          const IconComponent = !isImageUrl ? (iconMap[cat.icon] || Package) : null;
          return (
            <Link 
              key={cat._id} 
              to={`/search?category=${cat.name}`} 
              className="flex flex-col items-center gap-4 p-8 rounded-4xl bg-white border border-gray-100 hover:border-primary/30 hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className={`p-4 rounded-2xl ${cat.color || 'bg-primary/10 text-primary'} group-hover:scale-110 transition-transform`}>
                {isImageUrl ? <img src={cat.icon} alt={cat.name} className="w-8 h-8 object-contain" /> : <IconComponent size={32} />}
              </div>
              <span className="font-bold text-gray-900 group-hover:text-primary transition-colors text-center text-sm">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;