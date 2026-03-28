import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { toast } from "react-toastify";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  handleDelete,
  navigate,
  onQuikView,
}) {
  // const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const addToWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.post("http://localhost:5000/api/wishlist/add", {
      userId: user._id,
      productId: product._id,
    });

    navigate("/wishlist");
    toast.success("Added to Wishlist ❤️");
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
    <div className="product-card">
      <div className="wishlist-icon">
        <button onClick={() => handleWishlist(product)}>
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>

      <div className="card-details">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>

          <p className="price">₹{product.price}</p>

          {/* <p className="description">{product.description}</p> */}
        </Link>

        <div className="btns">
          <button
            className="cart-btn"
            onClick={() => {
              handleAddToCart(product);
            }}
          >
            Add To Cart
          </button>

          {/* <button onClick={handleAddToCart}>Add to cart</button> */}

          {user && user.role === "admin" && (
            <div className="admin-buttons">
              <button
                className="cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product._id);
                }}
              >
                Delete
              </button>

              <button
                className="cart-btn"
                onClick={() => navigate(`/edit/${product._id}`)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

// function ProductCard({ product, addToCart, handleDelete, navigate }) {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const addToWishlist = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/wishlist/add", {
//         userId: user._id,
//         productId: product._id,
//       });

//       toast.success("Added to wishlist ❤️");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add wishlist");
//     }
//   };

//   return (
//     <div className="card">
//       {/* Wishlist */}
//       <div className="wishlist-icon">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             addToWishlist();
//           }}
//         >
//           <i className="fa-regular fa-heart"></i>
//         </button>
//       </div>

//       {/* Product link */}
//       <Link to={`/product/${product._id}`} className="card-link">
//         <img src={product.image} alt={product.name} />

//         <h3>{product.name}</h3>

//         <p className="price">₹{product.price}</p>

//         <p className="description">{product.description}</p>
//       </Link>

//       {/* Buttons */}
//       <div className="btns">
//         <button
//           className="cart-btn"
//           onClick={(e) => {
//             e.stopPropagation();
//             addToCart(product);
//           }}
//         >
//           Add To Cart
//         </button>

//         {user && user.role === "admin" && (
//           <div className="admin-buttons">
//             <button
//               className="cart-btn"
//               onClick={() => handleDelete(product._id)}
//             >
//               Delete
//             </button>

//             <button
//               className="cart-btn"
//               onClick={() => navigate(`/edit/${product._id}`)}
//             >
//               Edit
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // export default ProductCard;
