const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Port 27017 is standard. 'db' matches your compose.yaml service name.
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://navodyatheshan4_db_user:ZOId7jbikOuGU6PN@toystore.dixr9mo.mongodb.net/?appName=toystore');
    console.log(`MongoDB Connected: ${conn.connection.host} 🧸`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;