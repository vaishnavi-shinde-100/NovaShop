import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategorySections.css";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

function CategorySections({ addToWishlist, addToCart, wishlist }) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  // Group by category
  const grouped = {};

  products.forEach((p) => {
    if (!grouped[p.category]) {
      grouped[p.category] = [];
    }
    grouped[p.category].push(p);
  });

  const goToDetails = (id) => {
    if (!id) return;
    navigate(`/product/${id}`);
  };

  const handleWishlist = (item) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    addToWishlist(item);
    navigate("/wishlist");
  };

  const handleAddToCart = (item) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }
    console.log("addToCart:", addToCart);
    addToCart(item);
    navigate("/cart");
  };

  return (
    <div>
      {Object.keys(grouped).map((category) => (
        <div key={category} className="category-section">
          <div className="category-head-link">
            <h2 className="main-cat-head">{category}</h2>
            <button
              className="main-cat-btn"
              onClick={() => navigate(`/category/${category}`)}
            >
              View All
            </button>
          </div>

          <div className="product-grid">
            {grouped[category].slice(0, 4).map((item) => (
              <div
                key={item._id}
                className="product-card"
                onClick={() => goToDetails(item._id)}
              >
                <div
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(item);
                  }}
                >
                  {/* <i className="fa-regular fa-heart"></i> */}
                  <FaRegHeart />
                </div>
                <img src={item.image} alt={item.name} />
                <h4 className="cat-head">{item.name}</h4>
                <p className="cat-phara">₹{item.price}</p>
                <button
                  className="category-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            ))}
            {/* <div>
              <button onClick={() => navigate(`/category/${category}`)}>
                View All
              </button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategorySections;
