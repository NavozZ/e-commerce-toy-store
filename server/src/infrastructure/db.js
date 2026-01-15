const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Priority: .env URI -> Local Docker Container -> Localhost
    const dbURI = process.env.MONGODB_URI || 'mongodb+srv://navodyatheshan4_db_user:ZOId7jbikOuGU6PN@toystore.dixr9mo.mongodb.net/?appName=toystore';
    const conn = await mongoose.connect(dbURI);
    console.log(`MongoDB Connected: ${conn.connection.host} 🧸`);
  } catch (error) {
    console.error(`DB Connection Error: ${error.message}`);
    // Don't exit process in production, but helpful for debugging startup
  }
};

module.exports = connectDB;


