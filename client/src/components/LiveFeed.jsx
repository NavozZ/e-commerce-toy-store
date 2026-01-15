import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Radio } from 'lucide-react';

// REMOVE: Hardcoded http://localhost:5000
// Instead, initialize without a URL so it uses the Vite Proxy
const socket = io(); 

const LiveFeed = () => {
  const [msg, setMsg] = useState("Waiting for store activity...");

  useEffect(() => {
    // Listen for the 'broadcast-alert' event defined in server/src/index.js
    socket.on('broadcast-alert', (data) => {
      setMsg(data.message);
    });

    // Cleanup on unmount to prevent memory leaks
    return () => socket.off('broadcast-alert');
  }, []);

  return (
    <div className="bg-yellow-400 py-2 px-4 flex justify-center items-center gap-3">
      <Radio size={16} className="animate-pulse text-yellow-900" />
      <span className="text-xs font-bold uppercase tracking-widest text-yellow-900 truncate">
        {msg}
      </span>
    </div>
  );
};

export default LiveFeed;