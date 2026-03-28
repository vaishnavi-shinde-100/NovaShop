// const express = require("express");
// const Product = require("../models/Product");
// const protect = require("../middleware/auth");
// const admin = require("../middleware/admin");

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post("/add", protect, admin, async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.put("/:id", protect, admin, async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true },
//     );
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/:id", protect, admin, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/cart/:userId", async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId }).populate(
//       "products.productId",
//     );

//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const { protect, admin } = require("../middleware/auth");

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get single product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Add product
router.post("/", protect, admin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Update product
router.put("/:id", protect, admin, async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updatedProduct);
});

// Delete product
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get cart
router.get("/cart/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate(
    "products.productId",
  );

  res.json(cart);
});

router.get("/:userId", async (req, res) => {
  try {
    const items = await Wishlist.find({
      userId: req.params.userId,
    }).populate("productId");

    res.json(items);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.params.userId,
    }).populate("items.product");

    res.json(cart);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/search/:key", async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.key, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({ category: category });

    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
