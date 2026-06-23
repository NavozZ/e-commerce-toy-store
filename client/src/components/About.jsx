import React from 'react';

const About = () => {
  return (
    <section className="bg-warm-gradient py-24 px-6 md:px-12 rounded-[3.5rem] my-12 mx-4 relative overflow-hidden text-white shadow-lg">
      <div className="absolute top-[28%] left-[7.5%] w-45 h-15 border-4 border-white/20 rounded-[50%] -rotate-3 hidden md:block opacity-70"></div>

      <div className="container mx-auto max-w-6xl">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 mb-8">
          About Us
        </p>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.2] text-white tracking-tight">
          At <span className="relative z-10 font-black">Bunny & Bark</span>, We believe play is an essential part of growing up. That’s why we offer a wide selection of toys—from educational building sets and creative art supplies to vehicles, animal toys, and baby play items. Our toys are designed to support learning, creativity, and joyful play for every stage of childhood.
        </h2>
      </div>
    </section>
  );
};

export default About;