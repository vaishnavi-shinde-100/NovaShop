import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="success-container">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully!</h1>

        <p>Your order has been confirmed.</p>

        <p>You will receive updates about shipping soon.</p>

        <Link to="/">
          <button className="home-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
