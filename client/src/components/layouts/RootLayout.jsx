import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import LiveFeed from '../LiveFeed';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 font-sans">
      {/* Persistent UI Elements */}
      <LiveFeed />
      <Navbar />
      
      {/* Page Content Renders Here */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;