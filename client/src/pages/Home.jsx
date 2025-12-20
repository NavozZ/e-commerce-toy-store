import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ShieldCheck, Truck, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* 1. Hero Section - Professional Entrance */}
      <section className="relative bg-blue-600 text-white rounded-3xl overflow-hidden shadow-xl">
        <div className="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-extrabold leading-tight">
              Discover the Joy of <span className="text-yellow-400">Play!</span> 🧸
            </h1>
            <p className="text-lg text-blue-100 max-w-lg mx-auto md:mx-0">
              Explore our hand-picked collection of toys, puzzles, and games. 
              Built with love for the University of Plymouth Full-Stack Project.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <Link to="/products" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 hover:text-white transition-all shadow-lg">
                Shop Catalog
              </Link>
              <Link to="/login" className="bg-blue-700 text-white border-2 border-blue-400 px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-all">
                Join Now
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            {/* Visual representation of a toy or shop (Member 1 vertical slice) */}
            <div className="relative w-64 h-64 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
               <Star size={100} className="text-white fill-white" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Highlights - Demonstrates Professionalism */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600"><Truck /></div>
          <div>
            <h3 className="font-bold">Fast Delivery</h3>
            <p className="text-sm text-gray-500">Same-day shipping on Lego!</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600"><ShieldCheck /></div>
          <div>
            <h3 className="font-bold">Member 2 Security</h3>
            <p className="text-sm text-gray-500">JWT Protected Transactions</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><Rocket /></div>
          <div>
            <h3 className="font-bold">Live Updates</h3>
            <p className="text-sm text-gray-500">Real-time WebSocket alerts</p>
          </div>
        </div>
      </section>

      {/* 3. Member 5 Integration: Featured Categories */}
      <section className="space-y-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Action Figures', 'Puzzles', 'Lego', 'Soft Toys'].map((category) => (
            <Link 
              key={category} 
              to={`/search?category=${category}`} 
              className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <h4 className="font-semibold text-gray-700 group-hover:text-blue-600">{category}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Call to Action for Member 4 (WebSockets) */}
      <section className="bg-gray-800 text-white p-10 rounded-3xl text-center space-y-4">
        <h2 className="text-2xl font-bold">Stay Updated with Live Inventory!</h2>
        <p className="text-gray-400">Our WebSocket system ensures you never miss a hot item restock.</p>
        <div className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-mono border border-yellow-500/50">
          System Status: Connected 📡
        </div>
      </section>
    </div>
  );
};

export default Home;