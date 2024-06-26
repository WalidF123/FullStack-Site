import React from "react";
import facebook from "../assets/facebook.jpeg";

function Footer() {
  return (
    <footer className="footer mt-auto py-4 text-white" style={{ backgroundColor: '#87A96B' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Our mission is to provide high-quality products that promote health and well-being to every customer.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Walid Feki: <a href="mailto:wfeki85@gmail.com">wfeki85@gmail.com</a></p>
          </div>
          <div className="col-md-4">
          <h5>Follow Us</h5>
          <img src={facebook} alt="Logo" className="footer-logo" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p>&copy; 2024 SOIL. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;