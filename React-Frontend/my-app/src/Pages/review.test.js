import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Review from './Review';

// Mock getUserIDByEmail function
jest.mock('../data/repo', () => ({
  getUserIDByEmail: jest.fn().mockResolvedValue({ userID: 123 }),
}));

describe('Review Component', () => {
  // Test to check if review submission is successful
  test('Submitting a review', async () => {
    // Mock product data
    const product = {
      id: 1,
      name: 'Product Name',
      image: 'product_image.jpg',
      description: 'Product Description',
      price: 19.99,
    };

    // Mock existing review data
    const existingReview = null;

    // Render the Review component
    const { getByText, getByLabelText } = render(
      <Review productId={product.id} onClose={() => {}} existingReview={existingReview} />
    );

    // Mock user input
    fireEvent.change(getByLabelText('Rating:'), { target: { value: 5 } });
    fireEvent.change(getByLabelText('Review:'), { target: { value: 'Great product!' } });

    // Mock fetch call for product data
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(product),
    });

    // Mock fetch call for submitting review
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    // Submit the review
    fireEvent.submit(getByText('Submit Review'));

    // Wait for the review submission to complete
    await waitFor(() => {
      // Check if the success message is displayed
      expect(getByText('Review submitted successfully!')).toBeInTheDocument();
    });
  });
});
