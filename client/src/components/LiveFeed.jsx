import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to backend container

const LiveFeed = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for broadcast-alert from server
    socket.on('broadcast-alert', (data) => {
      setNotifications((prev) => [data, ...prev].slice(0, 5)); // Keep last 5
    });

    return () => socket.off('broadcast-alert');
  }, []);

  return (
    <div className="bg-yellow-50 p-4 border-b-2 border-yellow-200">
      <h2 className="text-sm font-bold text-yellow-700 uppercase mb-2">Live Store Activity 📢</h2>
      {notifications.length === 0 ? (
        <p className="text-xs text-gray-500">Waiting for activity...</p>
      ) : (
        <ul className="space-y-1">
          {notifications.map((note, index) => (
            <li key={index} className="text-sm animate-bounce">
              <span className="font-mono text-gray-400">[{note.time}]</span> {note.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveFeed;