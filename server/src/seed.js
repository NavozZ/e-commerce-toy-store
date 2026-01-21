const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./infrastructure/db'); 
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. WIPE OLD DATA
    await Product.deleteMany();
    await User.deleteMany();
    console.log('🗑️  Old Data Destroyed...');

    // 2. CREATE USERS
    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: '123', 
        isAdmin: true,
      },
      {
        name: 'John Doe',
        email: 'user@example.com',
        password: '123',
        isAdmin: false,
      },
    ]);

    const adminUser = createdUsers[0]._id; 

   
    const sampleProducts = [
      {
        user: adminUser,
        name: 'Lego Star Wars X-Wing',
        imageUrl: 'https://m.media-amazon.com/images/I/81IpGj3VfSL._AC_SX679_.jpg',
        description: 'Recreate scenes from the classic Star Wars trilogy with this awesome building toy.',
        brand: 'Lego',
        category: 'Lego',
        price: 49.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      },
      {
        user: adminUser,
        name: 'Lego City Fire Station',
        imageUrl: 'https://m.media-amazon.com/images/I/812+-L-u42L._AC_SX679_.jpg',
        description: 'Protect the citizens of LEGO City with the action-packed Fire Station set.',
        brand: 'Lego',
        category: 'Lego',
        price: 59.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
      },
      {
        user: adminUser,
        name: 'Hot Wheels 10-Car Pack',
        imageUrl: 'https://m.media-amazon.com/images/I/71uZ1vX1xKL._AC_SX679_.jpg',
        description: 'Speed into an instant Hot Wheels collection with a race-ready pack that features 10 vehicles.',
        brand: 'Hot Wheels',
        category: 'Vehicles',
        price: 12.99,
        countInStock: 20,
        rating: 5.0,
        numReviews: 15,
      },
      {
        user: adminUser,
        name: 'Remote Control Stunt Car',
        imageUrl: 'https://m.media-amazon.com/images/I/71+p6+cQcAL._AC_SX679_.jpg',
        description: 'Double sided running, moving forward, backward, turning left, right, 360 degree tumbling flip.',
        brand: 'Generic',
        category: 'Vehicles',
        price: 25.99,
        countInStock: 5,
        rating: 3.5,
        numReviews: 4,
      },
      {
        user: adminUser,
        name: 'Giant Teddy Bear',
        imageUrl: 'https://m.media-amazon.com/images/I/81P5d6Y+sWL._AC_SX679_.jpg',
        description: 'A soft, life-size teddy bear perfect for hugging and cuddling.',
        brand: 'CuddleCo',
        category: 'Animals',
        price: 39.99,
        countInStock: 8,
        rating: 4.8,
        numReviews: 22,
      },
      {
        user: adminUser,
        name: 'Nintendo Switch Console',
        imageUrl: 'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SX679_.jpg',
        description: 'Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen.',
        brand: 'Nintendo',
        category: 'Gaming',
        price: 349.99,
        countInStock: 3,
        rating: 5.0,
        numReviews: 100,
      },
      {
        user: adminUser,
        name: 'Fisher-Price Baby Stackers',
        imageUrl: 'https://m.media-amazon.com/images/I/71J15XgKxmL._AC_SX679_.jpg',
        description: 'Classic stacking fun for your little one with colorful rings and a rocking base.',
        brand: 'Fisher-Price',
        category: 'Baby',
        price: 9.99,
        countInStock: 15,
        rating: 4.7,
        numReviews: 30,
      },
      {
        user: adminUser,
        name: 'Crayola Inspiration Art Case',
        imageUrl: 'https://m.media-amazon.com/images/I/81w3-e-l+JL._AC_SX679_.jpg',
        description: 'All-in-one portable art studio with dozens of crayons, pencils, markers, and sheets of drawing paper.',
        brand: 'Crayola',
        category: 'Art',
        price: 24.99,
        countInStock: 12,
        rating: 4.6,
        numReviews: 18,
      },
    ];

    await Product.insertMany(sampleProducts);
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();