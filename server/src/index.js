const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./infrastructure/db'); // Import DB helper

dotenv.config();
connectDB(); // Mandatory connection before start

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { origin: "*" } 
});

app.set('socketio', io);

app.use(cors());
app.use(express.json());

// Member 2: Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));
// Member 1: Product Routes
app.use('/api/products', require('./routes/productRoutes'));
// Member 3: Order Routes
app.use('/api/orders', require('./routes/orderRoutes'));
// Member 5: Search Routes
app.use('/api/search', require('./routes/searchRoutes'));

// Member 4: WebSocket Implementation
io.on('connection', (socket) => {
  console.log('User joined the live store feed');
  socket.on('disconnect', () => console.log('User left feed'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));