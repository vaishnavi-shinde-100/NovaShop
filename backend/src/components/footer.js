import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./footer.css";
import { useNavigate } from "react-router-dom";

function Footer({ category }) {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <h2 className="logo">NovaShop</h2>
          <p>Elegant jewellery crafted with love and perfection.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-head">Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/admin/orders">Orders</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3 className="footer-head">Categories</h3>
          <ul>
            <li>
              <Link to="/category/Rings">Rings</Link>
            </li>
            <li>
              <Link to="/category/Necklaces">Necklaces</Link>
            </li>
            <li>
              <Link to="/category/Bracelets">Bracelets</Link>
            </li>
            <li>
              <Link to="/category/Earrings">Earrings</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3 className="footer-head">Contact</h3>
          <p>Email: support@novashop.com</p>
          <p>Phone: +91 9876543210</p>

          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 NovaShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
