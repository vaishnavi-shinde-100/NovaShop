import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import EditProduct from "./components/EditProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import AdminOrders from "./pages/AdminOrders";
// import OrderTracking from "./pages/OrderTracking";
import AdminProductTable from "./components/AdminProductTable";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import CategoryPage from "./components/CategoryPage";
import CategorySections from "./components/CategorySections";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProducts from "./components/AdminProductTable";
import Checkout from "./pages/Checkout";
import Footer from "./components/footer";

function App({ products, users }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saveWishlist = localStorage.getItem("wishlist");
    return saveWishlist ? JSON.parse(saveWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/wishlist/${user._id}`)
        .then((res) => {
          // console.log("Wishlist from DB:", res.data);
          setWishlist(res.data); // or res.data.wishlist depending on API
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const addToWishlist = async (product) => {
    await axios.post("http://localhost:5000/api/wishlist", {
      userId: user._id,
      productId: product._id,
    });

    toast.success("Added to wishlist");

    fetchUserData(); // 🔥 Sync again
  };

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post("http://localhost:5000/api/cart", {
        userId: user._id,
        productId: product._id,
      });

      toast.success("Added to Cart 🛒");

      fetchUserData(); // sync cart + navbar
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const cartRes = await axios.get(
        `http://localhost:5000/api/cart/${user._id}`,
      );

      const wishRes = await axios.get(
        `http://localhost:5000/api/wishlist/${user._id}`,
      );

      setCart(cartRes.data.items);
      setWishlist(wishRes.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Router>
      <Navbar cart={cart} wishlist={wishlist} />

      <ToastContainer position="top-right" />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage addToCart={addToCart} addToWishlist={addToWishlist} />
          }
        />

        <Route path="/add" element={<ProductForm />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
              addToCart={addToCart}
              fetchUserData={fetchUserData}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
              addToWishlist={addToWishlist}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard products={products} users={users} />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/admin/products" element={<AdminProducts />} />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} />}
        />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/order/:id" element={<OrderDetails />} />

        <Route
          path="/category/:category"
          element={
            <CategoryPage addToCart={addToCart} addToWishlist={addToWishlist} />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} addToWishlist={addToWishlist} />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
