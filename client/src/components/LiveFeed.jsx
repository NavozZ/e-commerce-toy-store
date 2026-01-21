import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Bell, Sparkles, X } from 'lucide-react';

const socket = io('/'); // Connect to Member 4's backend

const LiveFeed = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Member 4: Listen for store-wide broadcasts
    socket.on('broadcast-alert', (data) => {
      setAlert(data.message);
      // Auto-hide alert after 8 seconds
      setTimeout(() => setAlert(null), 8000);
    });

    return () => socket.off('broadcast-alert');
  }, []);

  if (!alert) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-60 w-full max-w-md px-4 animate-in fade-in slide-in-from-top-4">
      <div className="bg-blue-600 text-white p-4 rounded-3xl shadow-2xl flex items-center gap-4 border-4 border-white">
        <div className="bg-white/20 p-2 rounded-full">
          <Sparkles className="animate-pulse" size={20} />
        </div>
        <p className="flex-1 text-sm font-black italic">{alert}</p>
        <button onClick={() => setAlert(null)} className="hover:rotate-90 transition-transform">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default LiveFeed;