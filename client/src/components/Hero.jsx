import React from 'react';
import { Link } from 'react-router';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-linear-to-br from-yellow-600 to-indigo-700 text-white rounded-4xl overflow-hidden shadow-2xl mb-12">
      
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-8 py-20 relative z-10 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-bounce">
          <Sparkles size={16} className="text-yellow-300" />
          <span className="text-xs font-bold uppercase tracking-widest">New Arrivals Just Landed</span>
        </div>

        
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">
          Welcome to <br />
          <span className="text-yellow-400 drop-shadow-lg">Bunny & Bark 🐾</span>
        </h1>

        
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-10 font-medium leading-relaxed">
          The ultimate destination for curious minds. From stacking blocks to high-speed vehicles, 
          we bring the magic of play to every child's doorstep.
        </p>

        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            to="/products" 
            className="group bg-white text-blue-700 px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-yellow-400 hover:text-white transition-all shadow-xl"
          >
            Start Shopping <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;