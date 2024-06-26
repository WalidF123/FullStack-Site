


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../data/repo.js';
import Modal from './Modal'; // Import the Modal component
import Review from './Review'; // Import the Review component
import './ReviewPage.css';
import StarRating from './StarRating'; // Import the StarRating component

const API_HOST = 'http://localhost:4000';

function ReviewPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const user = getUser(); // Fetch user details directly
 console.log(user);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get(`${API_HOST}/api/products`);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (productId) {
      const fetchProductAndReviews = async () => {
        try {
          const productResponse = await axios.get(`${API_HOST}/api/products/${productId}`);
          setProduct(productResponse.data);

          const reviewsData = await axios.get(`${API_HOST}/api/reviews/products/${productId}/reviews`);
          if (reviewsData.data && reviewsData.data.reviews) {
            setReviews(reviewsData.data.reviews);
          } else {
            setReviews([]);
          }
        } catch (error) {
          console.error('Error fetching product or reviews:', error);
          if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
          } else if (error.request) {
            console.error('Error request:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
          setReviews([]);
        }
      };

      fetchProductAndReviews();
    }
  }, [productId]);

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    navigate(`/reviews/${selectedProductId}`);
  };

  const handleOpenModal = (review = null) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`${API_HOST}/api/reviews/${reviewId}`);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="review-page-container">
      <div className="product-selector">
        <label htmlFor="product-select">Select Product: </label>
        <select id="product-select" value={productId || ''} onChange={handleProductChange}>
          <option value="">--Select a product--</option>
          {products.filter(product => !product.isDeleted).map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {productId ? (
        <>
          {product ? (
            <div className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h2>{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: AU${product.price}</p>
                <button onClick={() => handleOpenModal()} className="review-button">Review Product</button>
              </div>
            </div>
          ) : (
            <p>Loading product information...</p>
          )}

          <h3>Reviews</h3>
          {reviews.length > 0 ? (
            <ul className="reviews-list">
              {reviews.map(review => (
                <li key={review.review_id} className="review-item">
                  <StarRating rating={review.rating} /> {/* Use the StarRating component */}
                  <p className="review-text">{review.review_text}</p>
                  {user && user.userID === review.user_id && (
                    <>
                      <button onClick={() => handleOpenModal(review)} className="edit-button">Edit</button>
                      <button onClick={() => handleDeleteReview(review.review_id)} className="delete-button">Delete</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </>
      ) : (
        <p>Please select a product to see its reviews.</p>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Review productId={productId} onClose={handleCloseModal} existingReview={selectedReview} />
      </Modal>
    </div>
  );
}

export default ReviewPage;