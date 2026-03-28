// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./Checkout.css";

// function Checkout({ cart, setCart }) {
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [phone, setPhone] = useState("");
//   const [payment, setPayment] = useState("COD");

//   const navigate = useNavigate();

//   // Filter out invalid items and calculate total safely
//   const validItems = Array.isArray(cart)
//     ? cart.filter((item) => item && item.product && item.product.price)
//     : [];

//   const total = validItems.reduce((sum, item) => {
//     return sum + item.product.price * (item.quantity || 1);
//   }, 0);

//   const placeOrder = async () => {
//     // Validation
//     if (!address || !city || !phone) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     if (phone.length !== 10) {
//       toast.error("Enter a valid 10-digit phone number");
//       return;
//     }

//     if (validItems.length === 0) {
//       toast.error("Cart is empty");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/orders", {
//         items: validItems,
//         address,
//         city,
//         paymentMethod: payment,
//       });

//       toast.success("Order placed successfully");
//       setCart([]);
//       navigate(`/order/${res.data._id}`);
//     } catch (error) {
//       toast.error("Order failed");
//     }
//   };

//   return (
//     <div className="checkout-container">
//       {/* LEFT SIDE */}
//       <div className="checkout-left">
//         <h2>Shipping Address</h2>

//         <input type="text" placeholder="Full Name" required />

//         <input
//           type="text"
//           placeholder="Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Phone Number"
//           value={phone}
//           maxLength="10"
//           onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
//         />

//         <input
//           type="text"
//           placeholder="City"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           required
//         />

//         <h2 className="payment-title">Payment Method</h2>

//         <label>
//           <input
//             type="radio"
//             value="COD"
//             checked={payment === "COD"}
//             onChange={(e) => setPayment(e.target.value)}
//           />
//           Cash on Delivery
//         </label>

//         <label>
//           <input
//             type="radio"
//             value="CARD"
//             onChange={(e) => setPayment(e.target.value)}
//           />
//           Credit / Debit Card
//         </label>

//         <label>
//           <input
//             type="radio"
//             value="UPI"
//             onChange={(e) => setPayment(e.target.value)}
//           />
//           UPI Payment
//         </label>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="checkout-right">
//         <h2>Order Summary</h2>

//         {validItems.map((item) => (
//           <div key={item.product._id} className="summary-item">
//             <img src={item.product.image} alt={item.product.name} />

//             <div>
//               <p>{item.product.name}</p>
//               <p>Qty: {item.quantity || 1}</p>
//               <p>₹{item.product.price}</p>
//             </div>
//           </div>
//         ))}

//         <hr />

//         <h3>Total: ₹{total}</h3>

//         <button
//           onClick={placeOrder}
//           disabled={!address || !city || !phone}
//           className="place-order-btn"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Checkout;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Checkout.css";
import Payment from "../components/Payment";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("COD");
  const [cardData, setCartData] = useState({});

  // ✅ Safe cart filter
  const validItems = Array.isArray(cart)
    ? cart.filter((item) => item?.product?.price)
    : [];

  // ✅ Calculate total
  const total = validItems.reduce((sum, item) => {
    return sum + item.product.price * (item.quantity || 1);
  }, 0);

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ Validation
    if (!name || !address || !city || !phone) {
      toast.error("Please fill all fields");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Enter valid phone number");
      return;
    }

    if (payment === "Online") {
      const { cardNumber, cardName, expiry, cvv } = cardData;

      const cleanCardNumber = cardNumber.replace(/\s/g, "");
      if (cleanCardNumber.length !== 16) {
        toast.error("Card number must be 16 digits");
        return;
      }

      if (
        !cardNumber.trim() ||
        !cardName.trim() ||
        !expiry.trim() ||
        !cvv.trim()
      ) {
        toast.error("Please fill card details");
        return;
      }

      if (cvv.length !== 3) {
        toast.error("CVV must be 3 digits");
        return;
      }

      // ✅ FAKE SUCCESS POPUP
      toast.success("Payment Successful ✅");
    }

    if (validItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      // ✅ Create order
      const res = await axios.post("http://localhost:5000/api/orders", {
        userId: user._id,
        items: validItems,
        name,
        phone,
        address,
        city,
        paymentMethod: payment,
      });

      // ✅ CLEAR BACKEND CART (MOST IMPORTANT)
      await axios.delete(`http://localhost:5000/api/cart/clear/${user._id}`);

      // ✅ CLEAR FRONTEND CART
      setCart([]);
      localStorage.removeItem("cart");

      toast.success("Order placed successfully 🎉");

      navigate(`/order/${res.data._id}`);
    } catch (error) {
      console.log(error);
      toast.error("Order failed");
    }

    // console.log("Sending data : ", name, phone, address, city, payment);
  };

  return (
    <div className="checkout-container">
      {/* LEFT SIDE */}
      <div className="checkout-left">
        <h2>Shipping Details</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          maxLength="10"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {/* <h3>Payment Method</h3> */}

        <Payment
          payment={payment}
          setPayment={setPayment}
          cardData={cardData}
          setCardData={setCartData}
        />

        {/* <label>
          <input
            type="radio"
            value="COD"
            checked={payment === "COD"}
            onChange={(e) => setPayment(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            value="Online"
            onChange={(e) => setPayment(e.target.value)}
          />
          Online Payment
        </label> */}
      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">
        <h2>Order Summary</h2>

        {validItems.map((item) => (
          <div key={item.product._id} className="summary-item">
            <img src={item.product.image} alt={item.product.name} />

            <div>
              <p>{item.product.name}</p>
              <p>Qty: {item.quantity || 1}</p>
              <p>₹{item.product.price}</p>
            </div>
          </div>
        ))}

        <hr />

        <h3>Total: ₹{total}</h3>

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
