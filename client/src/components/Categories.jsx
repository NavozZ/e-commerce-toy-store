import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

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
      <h2 className="text-2xl font-black mb-8 text-gray-800 uppercase tracking-tight">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <Link 
            key={cat._id} 
            to={`/search?category=${cat.name}`} 
            className="flex flex-col items-center gap-4 p-8 rounded-4xl bg-secondary/15 border border-gray-100 hover:border-primary/30 hover:scale-105 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <Package size={32} />
            </div>
            <span className="font-bold text-gray-600 group-hover:text-primary transition-colors">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;