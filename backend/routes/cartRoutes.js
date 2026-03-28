// // const express = require("express");
// // const Cart = require("../models/Cart");
// // const router = express.Router();

// // router.post("/add", async (req, res) => {
// //   const { userId, productId } = req.body;

// //   useEffect(() => {
// //     const fetchCart = async () => {
// //       const user = JSON.parse(localStorage.getItem("user"));

// //       const res = await axios.get(`http://localhost:5000/api/cart/${user._id}`);

// //       setCart(res.data.products);
// //     };

// //     fetchCart();
// //   }, []);

// //   try {
// //     let cart = await Cart.findOne({ userId });

// //     if (!cart) {
// //       cart = new Cart({
// //         userId,
// //         products: [{ productId, quantity: 1 }],
// //       });
// //     } else {
// //       const productIndex = cart.products.findIndex(
// //         (p) => p.productId.toString() === productId,
// //       );

// //       if (productIndex > -1) {
// //         cart.products[productIndex].quantity += 1;
// //       } else {
// //         cart.products.push({ productId, quantity: 1 });
// //       }
// //     }

// //     await cart.save();
// //     res.json(cart);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // import express from "express";
// // import Cart from "../models/Cart.js";

// // const router = express.Router();

// // // ADD TO CART
// // router.post("/", async (req, res) => {
// //   try {
// //     const { userId, productId } = req.body;

// //     const newItem = new Cart({
// //       userId,
// //       productId,
// //     });

// //     await newItem.save();

// //     res.json(newItem);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // GET CART
// // router.get("/:userId", async (req, res) => {
// //   const items = await Cart.find({ userId: req.params.userId }).populate(
// //     "productId",
// //   );

// //   res.json(items);
// // });

// // export default router;

// // const express = require("express");
// // const Cart = require("../models/Cart");

// // const router = express.Router();

// // // Add to cart
// // router.post("/", async (req, res) => {
// //   try {
// //     const { userId, productId } = req.body;

// //     const newCart = new Cart({
// //       userId,
// //       productId,
// //     });

// //     await newCart.save();

// //     res.json(newCart);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // Get cart items
// // router.get("/:userId", async (req, res) => {
// //   const items = await Cart.find({ userId: req.params.userId }).populate(
// //     "productId",
// //   );

// //   res.json(items);
// // });

// // module.exports = router;

// const express = require("express");
// const Cart = require("../models/Cart");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { userId, productId } = req.body;

//     let cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       cart = new Cart({
//         user: userId,
//         items: [{ product: productId, quantity: 1 }],
//       });
//     } else {
//       cart.items.push({
//         product: productId,
//         quantity: 1,
//       });
//     }

//     await cart.save();

//     res.json(cart);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

// // router.post("/", async (req, res) => {
// //   try {
// //     const { userId, productId } = req.body;

// //     let cart = await Cart.findOne({ user: userId });

// //     // If cart does not exist
// //     if (!cart) {
// //       cart = new Cart({
// //         user: userId,
// //         items: [{ product: productId, quantity: 1 }],
// //       });
// //     } else {
// //       // check if product already in cart
// //       const itemIndex = cart.items.findIndex(
// //         (item) => item.product.toString() === productId
// //       );

// //       if (itemIndex > -1) {
// //         cart.items[itemIndex].quantity += 1;
// //       } else {
// //         cart.items.push({ product: productId, quantity: 1 });
// //       }
// //     }

// //     await cart.save();

// //     res.json(cart);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// module.exports = router;

const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// ADD TO CART
router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/clear/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.json({ message: "Cart already empty" });
    }

    cart.items = []; // 🔥 clear items
    await cart.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.log("CLEAR CART ERROR:", error); // 👈 CHECK TERMINAL
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

// GET USER CART
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "items.product",
    );

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product && item.product.toString() !== productId,
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
