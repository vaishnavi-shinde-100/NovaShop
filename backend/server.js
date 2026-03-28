// const express = require("express");
// const mongoose = require("mongoose");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/authRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const wishlistRoutes = require("./routes/WishlistRoutes.js");

// const app = express();

// const cors = require("cors");
// app.use(express.json());

// require("dotenv").config();

// const cookieParser = require("cookie-parser");

// app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   }),
// );

// mongoose
//   .connect("mongodb://127.0.0.1:27017/ecommerce")
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.log(err));

// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-store");
//   next();
// });

// app.use("/api/products", productRoutes);
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/cart", cartRoutes);
// app.use("/api/wishlist", wishlistRoutes);

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/WishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
