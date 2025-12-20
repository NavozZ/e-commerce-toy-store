import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Radio } from 'lucide-react';

const socket = io('http://localhost:5000'); // Explicit port for testing

const LiveFeed = () => {
  const [msg, setMsg] = useState("Waiting for store activity...");

  useEffect(() => {
    socket.on('broadcast-alert', (data) => {
      setMsg(data.message);
    });
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