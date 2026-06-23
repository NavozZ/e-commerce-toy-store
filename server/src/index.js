const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./infrastructure/db'); 
const paymentRoutes = require('./routes/paymentRoutes');
const { errorHandler } = require('./middleware/errorHandler');

// 1. Config & DB Connection
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET in .env");
  process.exit(1);
}

connectDB(); 

const app = express();
const server = http.createServer(app);

// 2. Socket.io Setup
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = [clientUrl, "http://127.0.0.1:5173"];

const io = new Server(server, {
  cors: { 
    origin: allowedOrigins, 
    methods: ["GET", "POST"]
  }
});

// Make 'io' accessible in controllers
app.set('socketio', io);

// 3. Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// 4. Routes
app.use('/api/auth', require('./routes/authRoutes'));      
app.use('/api/products', require('./routes/productRoutes')); 
app.use('/api/orders', require('./routes/orderRoutes'));     
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes')); 
app.use('/api/cart', require('./routes/cartRoutes'));  
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/payment', paymentRoutes);                      

app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
});

app.use(errorHandler);

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

