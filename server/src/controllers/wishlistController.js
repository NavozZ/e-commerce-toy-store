const asyncHandler = require('../utils/asyncHandler');
const Wishlist = require('../models/Wishlist');

exports.getWishlist = asyncHandler(async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }
    res.json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    const updatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
    res.json(updatedWishlist.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
      await wishlist.save();
    }
    const updatedWishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    res.json(updatedWishlist ? updatedWishlist.products : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
