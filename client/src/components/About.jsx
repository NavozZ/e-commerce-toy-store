import React from 'react';
const About = () => {
  return (
    <section className="bg-yellow-200 py-24 px-6 md:px-12 rounded-[3rem] my-12 mx-4 relative overflow-hidden">
      
      <div className="absolute top-[28%] left-[7.5%] w-45 h-15 border-4 border-[#F9C80E] rounded-[50%] -rotate-3 hidden md:block opacity-70"></div>

      <div className="container mx-auto max-w-6xl">
        
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 mb-8 opacity-60">
          About Us
        </p>

        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.2] text-gray-800 tracking-tight">
          At <span className="relative z-10">Bunny & Bark</span>, We believe play is an essential part of growing up. That’s why we offer a wide selection of toys—from educational building sets and creative art supplies to vehicles, animal toys, and baby play items. Our toys are designed to support learning, creativity, and joyful play for every stage of childhood.
        </h2>
      </div>
    </section>
  );
};

export default About;