const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.session.user._id }).populate('products');
    res.render('cart', { cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving cart');
  }
};


exports.addToCart = async (req, res) => {
  let cart;
  try {
    cart = await Cart.findOne({ userId: req.session.user._id });
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'Failed to find cart' });
  }

  // If cart does not exist, create a new one
  if (!cart) {
    cart = new Cart({ userId: req.session.user._id, products: [] });
  }

  // Now we know that cart is not null
  cart.products.push(req.params.productId);
  
  try {
    await cart.save();
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'Failed to save cart' });
  }

  res.status(200).json({ message: 'Product added to cart' });
};

