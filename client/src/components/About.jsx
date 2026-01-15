import React from 'react';
const About = () => {
  return (
    <section className="bg-[#FDE2EC] py-24 px-6 md:px-12 rounded-[3rem] my-12 mx-4 relative overflow-hidden">
      {/* Decorative Brand Accent (The yellow circle from your image) */}
      <div className="absolute top-[28%] left-[7.5%] w-45 h-15 border-4 border-[#F9C80E] rounded-[50%] -rotate-3 hidden md:block opacity-70"></div>

      <div className="container mx-auto max-w-6xl">
        {/* Small Label */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 mb-8 opacity-60">
          About Us
        </p>

        {/* Main Brand Statement */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.2] text-gray-800 tracking-tight">
          At <span className="relative z-10">Poppy & Lily</span>, we create timeless, handcrafted wooden toys 
          that inspire creativity and joy in children. Made from 
          sustainably sourced wood, our toys are designed to be safe, 
          durable, and beautiful—encouraging imaginative play while 
          being gentle on the planet.
        </h2>
      </div>
    </section>
  );
};

export default About;