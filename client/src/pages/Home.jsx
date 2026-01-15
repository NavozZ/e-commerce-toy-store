import React from 'react';

import { Rocket, ShieldCheck, Truck } from 'lucide-react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import About from '../components/About';
import BestSellers from '../components/BestSellers';


const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section - Hero Component */}
      <Hero />
      <Categories />
      <About />
      <BestSellers />

      
    </div>
  );
};

export default Home;