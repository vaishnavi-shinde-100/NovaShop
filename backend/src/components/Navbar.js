import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

import {
  FaHome,
  FaUser,
  FaShoppingCart,
  FaPlus,
  FaSignInAlt,
  FaHeart,
} from "react-icons/fa";

import "./Navbar.css";

function Navbar({ cart, wishlist }) {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleProtectedRoute = (path) =>{
    const user = localStorage.getItem("user");

    if(!user){
      navigate("/login");
    }
    else{
      navigate(path);
    }
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // console.log("Wishlist item : ", wishlist);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar" wishlist={wishlist}>
      <div className="navcontainer">
        {/* Logo */}
        <div className="desktop-menu-logo">
          <div className="logo">
            <NavLink to="/">
              <h2>NovaShop</h2>
            </NavLink>
          </div>
          <div>
            <SearchBar />
          </div>
          {/* {user && (
            <>
              <span className="nav-user username">
                <i className="fa-duotone fa-solid fa-circle-user"></i> {""}
                Welcome, {user.name}
              </span>
            </>
          )} */}

          {/* Desktop Menu */}
          <div className="nav-links">
            <NavLink to="/" className="nav-item">
              <FaHome /> Home
            </NavLink>

            <NavLink to="/cart" className="nav-item">
              <FaShoppingCart /> Cart ({cart.length})
            </NavLink>
            <NavLink to="/wishlist" className="nav-item">
              <FaHeart /> Wishlist ({wishlist.length})
            </NavLink>
            {!user && (
              <>
                <NavLink to="/register" className="nav-item">
                  Register
                </NavLink>

                <NavLink to="/login" className="nav-item">
                  Login
                </NavLink>
              </>
            )}
            {user && (
              <>
                <button onClick={handleLogout} className="nav-item nav-user">
                  Logout
                </button>
              </>
            )}
            {user?.role === "admin" && (
              <>
                <NavLink to="/admin" className="nav-item">
                  Admin
                </NavLink>

                <NavLink to="/add" className="nav-item">
                  <FaPlus /> Add Product
                </NavLink>

                <NavLink to="/admin/orders">Orders</NavLink>
              </>
            )}
          </div>

          {/* Hamburger */}
          <div
            className={`hamburger ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "show" : ""}`}>
        {user && (
          <div className="sidebar-user">
            <FaUser className="user-icon" />
            <p>Welcome, {user.name}</p>
          </div>
        )}

        <NavLink to="/" onClick={() => setOpen(false)}>
          <FaHome /> Home
        </NavLink>

        <NavLink to="/cart" onClick={() => setOpen(false)}>
          <FaShoppingCart /> Cart ({cart?.length || 0})
        </NavLink>

        <NavLink to="/wishlist" onClick={() => setOpen(false)}>
          <FaHeart /> Wishlist ({wishlist?.length || 0})
        </NavLink>

        {!user && (
          <>
            <NavLink to="/login" onClick={() => setOpen(false)}>
              <FaSignInAlt /> Login
            </NavLink>

            <NavLink to="/register" onClick={() => setOpen(false)}>
              <FaUser /> Register
            </NavLink>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <NavLink to="/admin" className="nav-item">
              Admin
            </NavLink>
            <NavLink to="/admin/orders">Orders</NavLink>
            <NavLink to="/add" className="nav-item">
              <FaPlus /> Add Product
            </NavLink>
          </>
        )}

        {user && (
          <>
            <button onClick={handleLogout} className="nav-item nav-user">
              Logout
            </button>
          </>
        )}
      </div>

      {/* Blur Background */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
    </nav>
  );
}

export default Navbar;
