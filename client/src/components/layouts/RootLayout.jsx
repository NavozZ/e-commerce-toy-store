import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import LiveFeed from '../LiveFeed';
import Footer from '../Footer';

const RootLayout = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0 font-sans">
      <LiveFeed />
      <Navbar />
      
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;