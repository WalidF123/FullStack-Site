import React from 'react';
import { FaEnvelope, FaPhone, FaQuestionCircle } from 'react-icons/fa';
import '../App.js';

function Subscription() {
    return (
        <div className="subscription-container">
        <h2 className="subscription-heading">Contact Us</h2>
        <div className="contact-info">
        <div className="contact-item">
            <FaQuestionCircle className="icon" />
            <span>Need Help?</span>
          </div>
          <div className="contact-item">
            <FaPhone className="icon" />
            <span>+1800 767-789</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <span>SOILHelpLine@gmail.com</span>
          </div>
          
        </div>
      </div>
    );
  }
  
  export default Subscription;
