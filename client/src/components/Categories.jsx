import React from 'react';
import { Link } from 'react-router-dom';
import { ToyBrick, Car, Dog, Gamepad2, Baby, Palette } from 'lucide-react';

const categories = [
  { name: 'Lego', icon: <ToyBrick size={32} />, color: 'bg-red-50 text-red-500' },
  { name: 'Vehicles', icon: <Car size={32} />, color: 'bg-blue-50 text-blue-500' },
  { name: 'Animals', icon: <Dog size={32} />, color: 'bg-orange-50 text-orange-500' },
  { name: 'Gaming', icon: <Gamepad2 size={32} />, color: 'bg-purple-50 text-purple-500' },
  { name: 'Baby', icon: <Baby size={32} />, color: 'bg-green-50 text-green-500' },
  { name: 'Art', icon: <Palette size={32} />, color: 'bg-pink-50 text-pink-500' },
];

const Categories = () => {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-black mb-8 text-gray-800 uppercase tracking-tight">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            to={`/search?category=${cat.name}`} 
            className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group"
          >
            <div className={`p-4 rounded-2xl ${cat.color} group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <span className="font-bold text-gray-600 group-hover:text-blue-600">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;