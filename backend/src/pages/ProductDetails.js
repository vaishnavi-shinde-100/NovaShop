import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { toast } from "react-toastify";

function ProductDetails({ addToCart, addToWishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [reletedProducts, setReletedProducts] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/products/${id}`)
  //     .then((res) => {
  //       setProduct(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((res) => {
      setProduct(res.data);
    });
    axios.get("http://localhost:5000/api/products").then((res) => {
      setReletedProducts(res.data.slice(0, 4));
    });
  }, [id]);

  const handleWishlist = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    addToWishlist(product);
    navigate("/wishlist");
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

  return (
    // <div style={{ padding: "40px" }}>
    <>
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <div className="product-title">
            <h2>{product.name}</h2>
          </div>

          <p className="product-price">₹{product.price}</p>

          <p className="Product-description">{product.description}</p>

          <button
            className="add-cart-btn"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className="add-cart-btn"
            onClick={() => handleWishlist(product)}
          >
            add to wishlist
          </button>
        </div>
      </div>

      <h2 className="releted-products-heading">You May Also Like</h2>

      <div className="releted-products">
        {reletedProducts.map((item) => (
          <div
            key={item._id}
            className="releted-card"
            onClick={() => navigate(`/product/${item._id}`)}
          >
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductDetails;
