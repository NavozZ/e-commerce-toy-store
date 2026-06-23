import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-toy-gradient text-white rounded-[2.5rem] overflow-hidden shadow-2xl mb-12">
      
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-8 py-20 relative z-10 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-bounce">
          <Sparkles size={16} className="text-secondary" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">New Arrivals Just Landed</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter text-white">
          Welcome to <br />
          <span className="text-secondary drop-shadow-lg">Bunny & Bark 🐾</span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 font-medium leading-relaxed">
          The ultimate destination for curious minds. From stacking blocks to high-speed vehicles, 
          we bring the magic of play to every child's doorstep.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            to="/products" 
            className="group bg-white text-primary px-8 py-4 rounded-full font-black flex items-center justify-center gap-2 hover:bg-secondary hover:text-gray-900 hover:scale-105 transition-all shadow-xl"
          >
            Start Shopping <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;