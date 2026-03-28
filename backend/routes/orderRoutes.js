const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, items, name, phone, address, city, paymentMethod } =
      req.body;

    const totalAmount = items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity + 100;
    }, 0);

    const order = new Order({
      user: userId,
      items,
      name,
      phone,
      address,
      city,
      paymentMethod,
      totalAmount,
    });

    console.log("Item : ", items);

    await order.save();
    res.json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
});

router.put("/:orderId", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true },
    );

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    }).populate("items.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path: "items.product",
        select: "name price image",
      });

    res.json(orders);
  } catch (error) {
    console.log("FETCH ERROR:", error);
    res.status(500).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
