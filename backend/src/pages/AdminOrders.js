import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OrderTracking from "../components/OrderTracking";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status: newStatus,
      });
      toast.success("Order status updated!");
      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="admin-orders">
      <h2>Admin Orders Dashboard</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h4>Order ID: {order._id || "Unknown"}</h4>
              <p>User: {order.user?.name || "Unknown User"}</p>
              <p>Total: ₹{order.totalAmount || 0}</p>
            </div>

            {/* Amazon-style Order Tracking */}
            {order.status && <OrderTracking status={order.status} />}

            <div className="status-buttons">
              {["Placed", "Shipped", "Out for Delivery", "Delivered"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(order._id, status)}
                    disabled={status === order.status}
                  >
                    {status}
                  </button>
                ),
              )}
            </div>

            <div className="order-items">
              <h5>Products:</h5>
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map(
                  (item) =>
                    item?.product && (
                      <p key={item.product._id || Math.random()}>
                        {item.product.name || "Unnamed Product"} ×{" "}
                        {item.quantity || 1}
                      </p>
                    ),
                )
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;
