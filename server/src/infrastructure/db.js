const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 1. Use ENV variable if active (Docker sets this)
    // 2. Use 127.0.0.1 for local development (npm run dev)
    const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/toystore';
    
    const conn = await mongoose.connect(dbURI);
    console.log(`MongoDB Connected: ${conn.connection.host} 🧸`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
