// import React from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";

// function Cart({ cart, setCart, addToWishlist }) {
//   const navigate = useNavigate();
//   const items = cart || [];

//   const removeItem = async (id) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));

//       await axios.delete(`http://localhost:5000/api/cart/${user._id}/${id}`);

//       const updatedCart = cart.filter((item) => item.product._id !== id);

//       setCart(updatedCart);

//       toast.success("Product Removed");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const goToDetails = (id) => {
//     navigate(`/product/${id}`);
//   };

//   // const placeOrder = async () => {
//   //   const user = JSON.parse(localStorage.getItem("user"));

//   //   try {
//   //     await axios.post("http://localhost:5000/api/orders", {
//   //       userId: user._id,
//   //       items: cart,
//   //       totalAmount: totalPrice,
//   //       address: "Nagpur",
//   //     });

//   //     toast.success("Order Placed Successfully 🎉");

//   //     setCart([]);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   const totalPrice = items.reduce((total, item) => {
//     return total + (item.product?.price || 0) * item.quantity;
//   }, 0);

//   return (
//     <div>
//       <h2>Your Cart</h2>

//       {items.length === 0 ? (
//         <h3>Cart is Empty</h3>
//       ) : (
//         items.map((item) => (
//           <div key={item.product._id} className="cart-item">
//             <div onClick={() => goToDetails(item.product._id)}>
//               <img
//                 src={item.product?.image}
//                 alt={item.product?.name}
//                 width="120"
//                 // onClick={() => goToDetails(item.product._id)}
//               />

//               <h4>{item.product?.name}</h4>

//               <p>₹{item.product?.price}</p>
//             </div>

//             <p>Qty: {item.quantity}</p>

//             <button onClick={() => removeItem(item.product._id)}>Remove</button>

//             <button onClick={() => addToWishlist(item.product)}>
//               Move To Wishlist
//             </button>
//           </div>
//         ))
//       )}

//       <h3>Total: ₹{totalPrice}</h3>
//       {/* <button onClick={() => navigate("/checkout")}>Checkout</button> */}
//       <button
//         className="checkout-btn"
//         onClick={() => {
//           if (cart.length === 0) {
//             toast.error("Cart is empty");
//             return;
//           }
//           navigate("/checkout");
//         }}
//       >
//         Checkout
//       </button>
//     </div>
//   );
// }

// export default Cart;

import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, setCart, addToWishlist }) {
  const navigate = useNavigate();
  // const items = Array.isArray(cart) ? cart : [];

  // const removeItem = async (id) => {
  //   if (!id) return;
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     if (!user?._id) return;

  //     await axios.delete(`http://localhost:5000/api/cart/${user._id}/${id}`);

  //     const updatedCart = items.filter((item) => item.product._id !== id);
  //     setCart(updatedCart);

  //     toast.success("Product Removed");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to remove product");
  //   }
  // };

  const items = cart || [];

  const removeItem = async (id) => {
    if (!id) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) return;

      await axios.delete(`http://localhost:5000/api/cart/${user._id}/${id}`);

      const updatedCart = items.filter(
        (item) => item.product && item.product._id !== id,
      );

      setCart(updatedCart);

      toast.success("Product Removed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product");
    }
  };

  const goToDetails = (id) => {
    if (!id) return;
    navigate(`/product/${id}`);
  };

  const totalPrice = items.reduce((total, item) => {
    const price = item?.product?.price || 0;
    const qty = item?.quantity || 0;
    return total + price * qty;
  }, 0);

  const handleWishlist = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    addToWishlist(product);
    navigate("/wishlist");
  };

  const increaseQty = (id, size) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id && item.selectedSize === size) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCart(updatedCart);
  };

  const decreaseQty = (id, size) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id && item.selectedSize === size) {
        return {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-wishlist">Your Cart</h2>

      <div className="cart-grid cart-item">
        {items.length === 0 ? (
          <h3>Cart is Empty</h3>
        ) : (
          items.map((item) => {
            if (!item?.product?._id) return null; // Skip invalid items

            const product = item.product;

            return (
              <div key={product._id} className="cart-card">
                <div
                  onClick={() => goToDetails(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={product.image} alt={product.name} width="120" />
                  <h4>{product.name}</h4>
                  <p className="cart-price">₹{product.price}</p>
                </div>

                <p>Qty: {item.quantity}</p>

                <div className="cart-buttons">
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(product._id)}
                  >
                    Remove
                  </button>

                  <button
                    className="wishlist-btn"
                    onClick={() => handleWishlist(product)}
                  >
                    Move To Wishlist
                  </button>
                </div>
                <div className="qty-control">
                  <button
                    onClick={() => decreaseQty(item._id, item.selectedSize)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item._id, item.selectedSize)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="checkout-price">
        <button
          className="checkout-btn"
          onClick={() => {
            if (items.length === 0) {
              toast.error("Cart is empty");
              return;
            }
            navigate("/checkout");
          }}
        >
          Checkout
        </button>
        <div>
          <h3>Total: ₹{totalPrice}</h3>
        </div>
      </div>
    </div>
  );
}

export default Cart;
