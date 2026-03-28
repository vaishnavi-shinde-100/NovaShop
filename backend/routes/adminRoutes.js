const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      revenue,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
