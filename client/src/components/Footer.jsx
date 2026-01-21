import React from 'react';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-yellow-200 text-black py-16 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-blue-400 tracking-tighter">Bunny & Bark 🐾</h3>
          <p className="text-black-400 text-sm leading-relaxed">
            Inspiring creativity and joy through toys for every child.
          </p>
        </div>
        <div className="flex gap-10">
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest">Shop</h4>
            <ul className="text-gray-500 text-sm space-y-2">
              <li>Lego</li>
              <li>Vehicles</li>
              <li>Animals</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest">Support</h4>
            <ul className="text-gray-500 text-sm space-y-2">
              <li>Shipping</li>
              <li>Returns</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-6">
           <h4 className="font-bold text-xs uppercase tracking-widest">Follow Us</h4>
           <div className="flex gap-4">
             <Instagram size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
             <Twitter size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
             <Github size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
           </div>
        </div>
      </div>
      <p className="text-center text-gray-600 text-[10px] mt-8 uppercase font-bold tracking-[0.2em]">
        © 2024 Group 16 - All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;