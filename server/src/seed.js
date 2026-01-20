const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Ensure your Product model is created

dotenv.config();

const toys = [
  {
    name: "Classic LEGO Set",
    description: "Unleash creativity with 500 colorful pieces.",
    price: 29.99,
    category: "Lego",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1585366119957-e5733f399e7c?w=500",
    isFeatured: true
  },
  {
    name: "Remote Control Race Car",
    description: "High-speed 4WD racing car with rechargeable battery.",
    price: 45.00,
    category: "Action Figures",
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500",
    isFeatured: false
  },
  {
    name: "Giant Teddy Bear",
    description: "Soft and huggable 3-foot teddy bear.",
    price: 35.50,
    category: "Soft Toys",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500",
    isFeatured: true
  },
  {
    name: "1000 Piece Starry Night Puzzle",
    description: "Challenging puzzle featuring Van Gogh artwork.",
    price: 18.00,
    category: "Puzzles",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=500",
    isFeatured: false
  }
];

const seedDB = async () => {
  try {
    // Connect to the DB service name from your compose.yaml
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/toystore');
    
    // Clear existing data to start fresh (Session 4 logic)
    await Product.deleteMany({});
    
    // Insert new toys
    await Product.insertMany(toys);
    
    console.log("Database Seeded Successfully! 🧸✅");
    process.exit();
  } catch (err) {
    console.error("Seed Error:", err);
    process.exit(1);
  }
};

seedDB();