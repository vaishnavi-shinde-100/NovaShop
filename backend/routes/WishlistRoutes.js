const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

router.post("/", async (req, res) => {
  const { userId, productId } = req.body;

  //  const newWishlist = newWishlist({
  //   userId,
  //   productId
  //  });

  const item = new Wishlist({ userId, productId });
  await item.save();

  res.json(item);
});

router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  const item = new Wishlist({ userId, productId });
  await item.save();

  res.json({ message: "Added to wishlist" });
});

router.get("/:userId", async (req, res) => {
  const items = await Wishlist.find({
    userId: req.params.userId,
  }).populate("productId");

  res.json(items);
});

router.delete("/:id", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
