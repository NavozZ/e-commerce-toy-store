import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    proxy: {
      // Bridging the frontend (5173) to the backend (5000)
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // Bridging WebSockets for Member 4
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,
      },
    },
  },
});