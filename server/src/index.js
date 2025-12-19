const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const server = http.createServer(app);

// WebSocket implementation for real-time updates (Session 8 requirement)
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

io.on('connection', (socket) => {
  console.log('User connected to Toy Store live updates');
});

app.get('/', (req, res) => res.send('Toy Store API Running'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));