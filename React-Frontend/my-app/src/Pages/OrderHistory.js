

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders, getUser, getUserIDByEmail } from '../data/repo';
import './OrderHistory.css'; // Import custom CSS for styling

function OrderHistory() {
  const [orderHistory, setOrders] = useState([]);
  const [userID, setUserID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (user && user.email) {
      fetchUserID(user.email);
    } else {
      console.error('No logged-in user found.');
    }
  }, []);

  const fetchUserID = async (email) => {
    try {
      const data = await getUserIDByEmail(email);
      if (data && data.userID) {
        console.log('Fetched UserID:', data.userID); // Debug log
        setUserID(data.userID);
      } else {
        console.error('No user ID found for the given email.');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchOrders(userID);
    }
  }, [userID]);

  const fetchOrders = async (userID) => {
    try {
      const OrderData = await getOrders(userID);
      console.log('Fetched Orders:', OrderData); // Debug log
      setOrders(OrderData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleReviewClick = (productId) => {
    // Navigate to the review page for the specific product
    navigate(`/reviews/${productId}`);
  };

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orderHistory.length > 0 ? (
        <ul className="order-list">
          {orderHistory.map((order) => (
            <li key={order.orderHistoryID} className="order-item">
              <img src={order.productimage} alt={order.productName} className="product-image" />
              <div className="order-details">
                <h3>{order.productName}</h3>
                <p>Quantity: {order.quantity}</p>
                <p>Price: AU${order.price}</p>
                <button 
                  onClick={() => handleReviewClick(order.productID)} 
                  className="review-button">
                  Review Product
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No order history found.</p>
      )}
    </div>
  );
}

export default OrderHistory;
