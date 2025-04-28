const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
  },
];

const products = [
  {
    name: 'Smartphone X',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    description: 'Latest smartphone with advanced features',
    brand: 'TechBrand',
    category: 'Electronics',
    price: 699.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Wireless Headphones',
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
    description: 'Premium wireless headphones with noise cancellation',
    brand: 'AudioTech',
    category: 'Electronics',
    price: 149.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Smart Watch',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    description: 'Fitness tracker and smartwatch with health monitoring',
    brand: 'FitTech',
    category: 'Electronics',
    price: 199.99,
    countInStock: 5,
    rating: 4.8,
    numReviews: 10,
  },
];

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(
      users.map((user) => ({
        ...user,
        password: bcrypt.hashSync(user.password, 10),
      }))
    );

    const adminUser = createdUsers[0]._id;

    // Insert products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}