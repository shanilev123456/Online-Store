const mongoose = require('mongoose');
require('dotenv').config(); 

const Product = require('./models/productModel'); // Import your Product model
const products = [
  { name: 'iPhone 14s', price: 600, quantity: 3 },
  { name: 'Dell M300', price: 20, quantity: 3 },
  { name: 'Lcd Screen', price: 100, quantity: 10 },
  { name: 'Dell Laptop', price: 800, quantity: 10 },
  { name: 'Apple Ipad', price: 600, quantity: 10 },
  { name: 'Iphone Chrage', price: 15, quantity: 5 },
];

const insertProducts = async () => {
  try {
    // Connect to MongoDB using the connection string stored in the environment variable
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const result = await Product.insertMany(products);
    console.log('Products inserted:', result);
  } catch (error) {
    console.error('Error inserting products:', error);
  } finally {
    mongoose.connection.close(); // Ensure your connection is closed after the operation
  }
};

insertProducts();
