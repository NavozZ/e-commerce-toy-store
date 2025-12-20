// server/src/infrastructure/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the DB service name from compose.yaml or an environment variable
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://db:27017/toystore');
    console.log(`MongoDB Connected: ${conn.connection.host} 🧸`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;