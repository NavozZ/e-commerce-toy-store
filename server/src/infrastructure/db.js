const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Priority: Cloud URI -> Local Docker Container -> Local Node
    const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/toystore';
    await mongoose.connect(dbURI);
    console.log(`MongoDB Connected 🧸`);
  } catch (error) {
    console.error(`Infrastucture Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;