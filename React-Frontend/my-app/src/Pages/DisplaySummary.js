
import axios from "axios";
import React, { useState } from 'react';
import './DisplaySummary.css'; // Import the CSS file for styling
import OrderHistory from './OrderHistory';

function DisplaySummary({ cartItems, userID }) {
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleConfirmation = async (event) => {
        event.preventDefault();

        // Credit card validation
        if (!creditCardNumber || !expiryDate) {
            alert('Please fill in all fields.');
            return;
        }

        // Simple validation that cc number has 16 digits
        const cardNumberRegex = /^[0-9]{16}$/;
        if (!cardNumberRegex.test(creditCardNumber)) {
            alert('Invalid credit card number. Please enter a 16-digit numeric value.');
            return;
        }

        // Expiry date should be in MM/YY format
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryDateRegex.test(expiryDate)) {
            alert('Invalid expiry date format. Please enter in MM/YY format.');
            return;
        }

        await handlePurchase(userID);
    };

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    const handlePurchase = async (userID) => {
        try {
            // API call for transfer
            console.log("USERDJDS: ",userID);
            const response = await axios.post('http://localhost:4000/api/cartItems/transfer', { userID });

            if (response.status === 200) {
                setShowOrderHistory(true);
                setSuccessMessage('Purchase confirmed successfully!');
            }
        } catch (error) {
            console.error('Error during purchase:', error);
            // Handle error
        }
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="cart-summary">
            {showCheckout ? (
                <div>
                    <h2>Checkout</h2>
                    <form onSubmit={handleConfirmation}>
                        <label htmlFor="creditCardNumber">Credit Card Number:</label>
                        <input 
                            type="text" 
                            id="creditCardNumber" 
                            name="creditCardNumber" 
                            value={creditCardNumber} 
                            onChange={(e) => setCreditCardNumber(e.target.value)} 
                            required 
                        />
                        <br />
                        <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
                        <input 
                            type="text" 
                            id="expiryDate" 
                            name="expiryDate" 
                            value={expiryDate} 
                            onChange={(e) => setExpiryDate(e.target.value)} 
                            required 
                        />
                        <br />
                        <button 
                            type="submit" 
                            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Confirm Purchase
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Cart Summary</h2>
                    {cartItems.length > 0 ? (
                        <>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item.cartItemID} className="cart-item">
                                        <span className="item-name">{item.productName}</span>
                                        <span className="item-quantity">Quantity: {item.quantity} &nbsp;</span>
                                        <span className="item-price"> Price: AU${item.price} &nbsp;</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="total-price">
                                Total Price: AU${totalPrice.toFixed(2)}
                            </div>
                            <button 
                                onClick={handleCheckout} 
                                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
                            >
                                Proceed to Checkout
                            </button>
                        </>
                    ) : (
                        <p className="empty-cart">No items in cart.</p>
                    )}
                </div>
            )}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {showOrderHistory && <OrderHistory />}
        </div>
    );
}

export default DisplaySummary;