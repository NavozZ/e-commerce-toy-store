import React from 'react';

import { Rocket, ShieldCheck, Truck } from 'lucide-react';
import Hero from '../components/Hero';


const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section - Hero Component */}
      <Hero />

      {/* Trust Badges - Usability Requirement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="bg-green-100 p-4 rounded-2xl text-green-600"><Truck size={32} /></div>
          <div>
            <h4 className="font-bold">Global Shipping</h4>
            <p className="text-sm text-gray-500 italic">Delivered in 2-3 days</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600"><ShieldCheck size={32} /></div>
          <div>
            <h4 className="font-bold">Secure Checkout</h4>
            <p className="text-sm text-gray-500 italic">JWT encrypted security</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="bg-yellow-100 p-4 rounded-2xl text-yellow-600"><Rocket size={32} /></div>
          <div>
            <h4 className="font-bold">Member Support</h4>
            <p className="text-sm text-gray-500 italic">24/7 dedicated assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;