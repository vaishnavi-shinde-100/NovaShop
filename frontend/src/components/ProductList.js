import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";

function ProductList({ addToCart, cart }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [reletedProducts, setReletedProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        console.log(res.data);
        setReletedProducts(res.data.slice(0, 4));
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product deleted");

      navigate("/");

      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error.response.data);
      toast.error("Deleted failted");
    }
  };

  const addToWishlist = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    await axios.post("http://localhost:5000/api/wishlist/add", {
      userId: user._id,
      productId: products._id,
    });
    toast.success("Added to wishlist");
    navigate("/wishlist");
  };

  return (
    <div className="container">
      {reletedProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          addToWishlist={addToWishlist}
          addToCart={addToCart}
          handleDelete={handleDelete}
          user={user}
          navigate={navigate}
        />
      ))}
    </div>
  );
}

export default ProductList;
