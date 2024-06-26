
import React, { useEffect, useState } from 'react';
import { getUser, getUserIDByEmail } from '../data/repo'; // Adjust the path if necessary
import './Review.css'; // Import custom CSS for styling

const API_HOST = 'http://localhost:4000';

function Review({ productId, onClose, existingReview }) {
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(existingReview ? existingReview.rating : 1);
  const [reviewText, setReviewText] = useState(existingReview ? existingReview.review_text : '');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [userID, setUserID] = useState(null);

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
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${productId}`); // Debug log
        const response = await fetch(`${API_HOST}/api/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Product fetched successfully:', data); // Debug log
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error); // Debug log
        setSubmissionStatus(`Error: ${error.message}`);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting review with the following data:');
    console.log({ productID: productId, userID, rating, reviewText, isDeleted: false });

    try {
      const response = existingReview
        ? await fetch(`${API_HOST}/api/reviews/${existingReview.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating, review_text: reviewText }),
          })
        : await fetch(`${API_HOST}/api/reviews`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productID: productId, userID, rating, reviewText, isDeleted: false }), // Include userID and isDeleted in the request body
          });

      const data = await response.json();
      if (response.ok) {
        setSubmissionStatus('Review submitted successfully!');
        onClose(); // Close the modal after successful submission
      } else {
        setSubmissionStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setSubmissionStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="review-container">
      {product ? (
        <div className="product-info">
          <img src={product.image} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: AU${product.price}</p>
        </div>
      ) : (
        <p>Loading product information...</p>
      )}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="rating">Rating: </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map(rate => (
              <option key={rate} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reviewText">Review: </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
          />
        </div>
        <button type="submit" className="submit-button">{existingReview ? 'Update Review' : 'Submit Review'}</button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
}

export default Review;