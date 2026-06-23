const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./infrastructure/db');
const Product = require('./models/Product');
const User = require('./models/User');
const Category = require('./models/Category');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. WIPE OLD DATA
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
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

    // 3. SEED CATEGORIES (skip if already exists)
    const categoriesToSeed = [
      { name: 'plants', icon: 'https://img.icons8.com/stickers/100/plant-under-sun.png', color: 'bg-green-50 text-green-500' },
      { name: 'Building Boxes', icon: 'https://img.icons8.com/color/48/building.png', color: 'bg-primary/10 text-primary' },
      { name: 'Building Blocks', icon: 'https://img.icons8.com/external-vectorslab-outline-color-vectorslab/53/external-Building-Blocks-gaming-vectorslab-outline-color-vectorslab.png', color: 'bg-primary/10 text-primary' },
      { name: 'Action Figures', icon: 'https://img.icons8.com/papercut/60/action.png', color: 'bg-secondary/15 text-secondary-hover' },
      { name: 'Dolls & Dollhouses', icon: 'https://img.icons8.com/emoji/48/nesting-dolls.png', color: 'bg-rose-50 text-rose-500' },
      { name: 'Educational & STEM', icon: 'https://img.icons8.com/liquid-glass/48/graduation-cap.png', color: 'bg-primary/10 text-primary' },
      { name: 'Outdoor & Sports', icon: 'https://img.icons8.com/color/48/sports.png', color: 'bg-success/10 text-success' },
      { name: 'Puzzles & Board Games', icon: 'https://img.icons8.com/keek/100/games-folder.png', color: 'bg-secondary/15 text-secondary-hover' },
      { name: 'Arts & Crafts', icon: 'https://img.icons8.com/emoji/48/performing-arts.png', color: 'bg-primary/10 text-primary' },
      { name: 'Remote Control & Tech Toys', icon: 'https://img.icons8.com/clouds/100/remote-control.png', color: 'bg-success/10 text-success' },
      { name: 'Plush & Soft Toys', icon: 'https://img.icons8.com/keek/100/plush.png', color: 'bg-rose-50 text-rose-500' },
      { name: 'Baby & Toddler', icon: 'https://img.icons8.com/bubbles/100/baby.png', color: 'bg-success/10 text-success' },
      { name: 'Vehicles & Die-cast', icon: 'https://img.icons8.com/external-kosonicon-lineal-color-kosonicon/64/external-vehicles-insurance-kosonicon-lineal-color-kosonicon.png', color: 'bg-primary/10 text-primary' },
      { name: 'Party & Pretend Play', icon: 'https://img.icons8.com/emoji/48/party-popper.png', color: 'bg-secondary/15 text-secondary-hover' },
    ];

    for (const cat of categoriesToSeed) {
      const exists = await Category.findOne({ name: cat.name });
      if (!exists) {
        await Category.create(cat);
      }
    }
    console.log('🏷️  Categories Seeded...');

    // 4. NEW SAMPLE PRODUCTS WITH WORKING IMAGES
    const sampleProducts = [
      {
        user: adminUser,
        name: "Classic Rubik's Cube",
        imageUrl: 'https://images.unsplash.com/photo-1591991731833-b262a1215b25?auto=format&fit=crop&w=600&q=80',
        description: 'Challenge your mind with the ultimate 3x3 brain-teasing puzzle. Smooth turning and classic colors.',
        brand: "Rubik's",
        category: 'Puzzles & Board Games',
        price: 14.99,
        countInStock: 25,
        rating: 4.8,
        numReviews: 42,
      },
      {
        user: adminUser,
        name: 'Wooden Alphabet Blocks',
        imageUrl: 'https://images.unsplash.com/photo-1587654780228-659c81b2c578?auto=format&fit=crop&w=600&q=80',
        description: 'Eco-friendly wooden blocks perfect for early learning, stacking, and building fine motor skills.',
        brand: 'EduPlay',
        category: 'Educational & STEM',
        price: 22.50,
        countInStock: 18,
        rating: 4.9,
        numReviews: 15,
      },
      {
        user: adminUser,
        name: 'Vintage Toy Train Set',
        imageUrl: 'https://images.unsplash.com/photo-1581557980049-720f32997193?auto=format&fit=crop&w=600&q=80',
        description: 'A beautifully crafted classic locomotive set with interlocking tracks and vibrant colors.',
        brand: 'ClassicToys',
        category: 'Vehicles & Die-cast',
        price: 45.00,
        countInStock: 12,
        rating: 4.7,
        numReviews: 28,
      },
      {
        user: adminUser,
        name: 'Superhero Action Figure',
        imageUrl: 'https://images.unsplash.com/photo-1608889825103-eb638421f2ec?auto=format&fit=crop&w=600&q=80',
        description: 'Highly articulated 6-inch superhero figure ready to defend the universe from evil.',
        brand: 'HeroMakers',
        category: 'Action Figures',
        price: 19.99,
        countInStock: 30,
        rating: 4.5,
        numReviews: 56,
      },
      {
        user: adminUser,
        name: 'Premium Chess Set',
        imageUrl: 'https://images.unsplash.com/photo-1610890716171-60c74d538665?auto=format&fit=crop&w=600&q=80',
        description: 'Elegant wooden chessboard with handcrafted pieces. Perfect for beginners and grandmasters alike.',
        brand: 'Checkmate',
        category: 'Puzzles & Board Games',
        price: 35.99,
        countInStock: 8,
        rating: 5.0,
        numReviews: 11,
      },
      {
        user: adminUser,
        name: 'Fluffy Bunny Plush Toy',
        imageUrl: 'https://images.unsplash.com/photo-1559416524-74312fcb82a7?auto=format&fit=crop&w=600&q=80',
        description: 'Ultra-soft, huggable plush bunny perfect for comforting kids during nap time.',
        brand: 'CuddleCo',
        category: 'Plush & Soft Toys',
        price: 18.50,
        countInStock: 40,
        rating: 4.9,
        numReviews: 89,
      },
      {
        user: adminUser,
        name: 'Mini Camera Drone',
        imageUrl: 'https://images.unsplash.com/photo-1508614589041-8f5b4b74f00b?auto=format&fit=crop&w=600&q=80',
        description: 'Easy-to-fly RC drone with a built-in 1080p camera, altitude hold, and one-key takeoff.',
        brand: 'SkyTech',
        category: 'Remote Control & Tech Toys',
        price: 89.99,
        countInStock: 15,
        rating: 4.4,
        numReviews: 34,
      },
      {
        user: adminUser,
        name: 'Watercolor Paint Kit',
        imageUrl: 'https://images.unsplash.com/photo-1537884488344-013093f1bc54?auto=format&fit=crop&w=600&q=80',
        description: 'Complete art set featuring 24 vibrant watercolors, brushes, and a mixing palette.',
        brand: 'Artisan',
        category: 'Arts & Crafts',
        price: 28.00,
        countInStock: 22,
        rating: 4.6,
        numReviews: 19,
      },
      {
        user: adminUser,
        name: 'High-Power Water Gun',
        imageUrl: 'https://images.unsplash.com/photo-1590483864700-1122a2da88da?auto=format&fit=crop&w=600&q=80',
        description: 'Dominate your backyard water battles with this pump-action, high-capacity water blaster.',
        brand: 'SplashMaster',
        category: 'Outdoor & Sports',
        price: 24.99,
        countInStock: 50,
        rating: 4.3,
        numReviews: 67,
      },
      {
        user: adminUser,
        name: 'Dollhouse Miniature Set',
        imageUrl: 'https://images.unsplash.com/photo-1533475960012-07be22f2ba32?auto=format&fit=crop&w=600&q=80',
        description: 'Intricately designed miniature furniture and accessories for standard dollhouses.',
        brand: 'MiniWorld',
        category: 'Dolls & Dollhouses',
        price: 32.99,
        countInStock: 10,
        rating: 4.7,
        numReviews: 21,
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