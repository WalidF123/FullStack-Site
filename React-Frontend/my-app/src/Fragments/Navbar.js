

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

function Navbar({ user, logoutUser }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light transparent-bg" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="React Logo" width="50" height="50" />
        </Link>
        <span style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Cursive', color: '#333', marginRight: '50px' }}>SOIL</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'black' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" style={{ color: 'black' }}>Products</Link>
            </li>
            {user &&
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile" style={{ color: 'black' }}>My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orderhistory" style={{ color: 'black' }}>Order History</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reviews" style={{ color: 'black' }}>Reviews</Link>
                </li>
              </>
            }
          </ul>
          <ul className="navbar-nav">
            {!user ?
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <span className="nav-link text-dark">Welcome, {user.first_name}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={logoutUser}>Logout</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
