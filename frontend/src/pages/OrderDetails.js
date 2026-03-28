import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderTracking from "../components/OrderTracking";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(`http://localhost:5000/api/orders/${id}`);

      setOrder(res.data);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <h2>Loading...</h2>;

  console.log(order);

  return (
    <div className="order-container">
      <h2 className="order-title">Order Details</h2>

      <div className="order-top">
        <p>
          <b>Order ID:</b> {order._id}
        </p>

        <p>
          <b>Status:</b> {order.status}
        </p>
      </div>
      <div className="user-details">
        <p>
          <b>Name : </b> {order.name || "N/A"}
        </p>

        <p>
          <b>Phone : </b> {order.phone || "N/A"}
        </p>

        <p>
          <b>Address : </b> {order.address}
        </p>

        <p>
          <b>City : </b> {order.city || "N/A"}
        </p>
        <p>
          <b>Payment : </b> {order.payment || "COD"}
        </p>
      </div>

      {/* Order Tracking */}
      <OrderTracking status={order.status} className="tracking-box" />

      <div className="items-section">
        <h3>Items</h3>

        {order.items.map((item) => (
          <div key={item.product._id} className="item-card">
            <img src={item.product?.image} alt={item.product.name} />

            <p>{item.product.name}</p>

            <p>₹{item.product.price}</p>

            <p>Qty: {item.quantity}</p>
          </div>
        ))}

        <h3>Total: ₹{order.totalAmount}</h3>
      </div>
    </div>
  );
}

export default OrderDetails;
