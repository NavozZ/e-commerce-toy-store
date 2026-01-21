const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./infrastructure/db'); // Import DB helper
const paymentRoutes = require('./routes/paymentRoutes');

// 1. Config & DB Connection
require('dotenv').config();
connectDB(); 

const app = express();
const server = http.createServer(app);

// 2. Socket.io Setup
const io = new Server(server, {
  cors: { 
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Vite default
    methods: ["GET", "POST"]
  }
});

// Make 'io' accessible in controllers
app.set('socketio', io);

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Routes
app.use('/api/auth', require('./routes/authRoutes'));      // Member 2
app.use('/api/products', require('./routes/productRoutes')); // Member 1
app.use('/api/orders', require('./routes/orderRoutes'));     // Member 3
app.use('/api/search', require('./routes/searchRoutes'));    // Member 5
app.use('/api/payment', paymentRoutes);                      // Member 3

// 5. WebSocket Logic (Member 4)
io.on('connection', (socket) => {
  console.log('User joined the live store feed');
  socket.on('disconnect', () => console.log('User left feed'));
});

// 6. Test-Friendly Start Up (Member 6)
// Only listen to the port if this file is run directly (not imported by tests)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export 'app' so Supertest can use it without starting the server
module.exports = app;

