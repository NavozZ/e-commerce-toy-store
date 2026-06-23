import React from 'react';

import Hero from '../components/Hero';
import Categories from '../components/Categories';
import About from '../components/About';
import BestSellers from '../components/BestSellers';

const Home = () => {
  return (
    <main className="min-h-screen bg-bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 pb-20">
        <Hero />
        <Categories />       
        <About />
        <BestSellers />
      </div>
    </main>
  );
};

export default Home;