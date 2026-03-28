import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist({ addToCart, addToWishlist }) {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch wishlist from backend
  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/api/wishlist/${user._id}`)
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Remove item from wishlist
  const removeItem = async (id) => {
    if (!id) return;

    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${id}`);

      setWishlist((prev) => prev.filter((item) => item._id !== id));

      toast.success("Removed from wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  const moveToCart = async (item) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post("http://localhost:5000/api/cart", {
        userId: user._id,
        productId: item.productId._id,
      });

      navigate("/cart");
      toast.success("Moved to Cart");
    } catch (error) {
      console.log(error);
    }
  };

  // Filter invalid items (prevents crashes)
  const validWishlist = wishlist.filter(
    (item) => item && item._id && item.productId,
  );

  if (validWishlist.length === 0) {
    return (
      <div>
        <h2>Your Wishlist is Empty ❤️</h2>
      </div>
    );
  }

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="wishlist-container">
      <h2 className="heading-wishlist">My Wishlist</h2>

      <div className="wishlist-grid">
        {validWishlist.map((item) => (
          <div key={item.productId._id} className=" wishlist-card">
            <div
              onClick={() => goToDetails(item.productId._id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.productId?.image}
                alt={item.productId?.name}
                width="150"
              />

              <h3 className="title">{item.productId?.name}</h3>

              <p className="wishlist-price">₹{item.productId?.price}</p>
            </div>
            <div className="buttons">
              <button
                onClick={() => removeItem(item._id)}
                className="wishlist-cart-btn"
              >
                Remove
              </button>

              <button
                onClick={() => moveToCart(item)}
                className="wishlist-cart-btn"
              >
                Move To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
