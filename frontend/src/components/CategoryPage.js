import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CategoryPage.css";

function CategoryPage({ addToCart, addToWishlist }) {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [category]);

  const goToDetails = (id) => {
    if (!id) return;
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(product);
    navigate("/cart");
  };

  const handleWishlist = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    addToWishlist(product);
    navigate("/wishlist");
  };

  return (
    <div className="category-page">
      <h1>{category} Jewellery</h1>

      <div className="category-grid">
        {products.map((product) => (
          <div key={product._id} className="category-card">
            {/* Wishlist Icon */}
            <div
              className="wishlist-icon"
              onClick={() => handleWishlist(product)}
            >
              <i className="fa-regular fa-heart"></i>
            </div>

            {/* Product Image + Details */}
            <div
              className="category-info"
              onClick={() => goToDetails(product._id)}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>

            {/* Cart Button */}
            <button
              className="category-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
