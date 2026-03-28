import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const revenue = orders.reduce((total, order) => {
    return total + (order.totalAmount || 0);
  }, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Total Products</h3>
          <p>{products?.length || 0}</p>
        </div>

        <div className="admin-card">
          <h3>Total Users</h3>
          <p>{users?.length || 0}</p>
        </div>

        <div className="admin-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="admin-card">
          <h3>Revenue</h3>
          <p>${revenue}</p>
        </div>
      </div>

      <div className="admin-actions">
        <Link to="/admin/products">
          <button className="admin-btn">Manage Products</button>
        </Link>

        <Link to="/admin/add">
          <button className="admin-btn">Add New Product</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
