const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./infrastructure/db'); 
const paymentRoutes = require('./routes/paymentRoutes');

// 1. Config & DB Connection
require('dotenv').config();
connectDB(); 

const app = express();
const server = http.createServer(app);

// 2. Socket.io Setup
const io = new Server(server, {
  cors: { 
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], 
    methods: ["GET", "POST"]
  }
});

// Make 'io' accessible in controllers
app.set('socketio', io);

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Routes
app.use('/api/auth', require('./routes/authRoutes'));      
app.use('/api/products', require('./routes/productRoutes')); 
app.use('/api/orders', require('./routes/orderRoutes'));     
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));   
app.use('/api/payment', paymentRoutes);                      

// 5. WebSocket Logic 
io.on('connection', (socket) => {
  console.log('User joined the live store feed');
  socket.on('disconnect', () => console.log('User left feed'));
});

// 6. Test-Friendly Start Up 
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}


module.exports = app;

