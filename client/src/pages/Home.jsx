import React from 'react';

import { Rocket, ShieldCheck, Truck } from 'lucide-react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import About from '../components/About';
import BestSellers from '../components/BestSellers';
import LiveFeed from '../components/LiveFeed';


const Home = () => {
  return (
    <main className="min-h-screen bg-white">

      <div className="max-w-350 mx-auto px-4 md:px-8 space-y-20 pb-20">
        {/* Welcome & Brand Story [Member 1 & 6] */}
        <Hero />
        
        {/* Navigation by Categories [Member 5] */}
        <Categories />
        
        {/* Brand Mission [Leader] */}
        <About />
        
        {/* Dynamic Database Products [Member 1] */}
        <BestSellers />
      </div>
    </main>
  );
};

export default Home;