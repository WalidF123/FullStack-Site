import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock axios for HTTP requests
import Products from './Products';

// Mock axios post method
jest.mock('axios');

describe('Shopping Cart Feature', () => {
  // Test to check if the product is added to the cart
  test('Adding product to cart', async () => {
    // Mock product data
    const product = {
      id: 1,
      name: 'Product Name',
      image: 'product_image.jpg',
      discountedprice: 10.99,
      actualprice: 19.99,
    };

    // Mock axios post response
    axios.post.mockResolvedValueOnce({
      data: {
        productID: product.id,
        quantity: 1,
      },
    });

    // Render the Products component
    const { getByText } = render(<Products />);

    // Find the "Add to Cart" button and click it
    fireEvent.click(getByText('Add to Cart'));

    // Wait for the axios post request to resolve
    await waitFor(() => {
      // Check if the axios post method is called with the correct arguments
      expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/cartItems', {
        userID: expect.any(Number), // Check if the userID is a number
        productID: product.id,
        productName: product.name,
        quantity: 1,
        price: product.discountedprice,
      });
    });
  });

  // Test to check if the cart modal opens when the cart button is clicked
  test('Opening cart modal', () => {
    // Render the Products component
    const { getByTestId } = render(<Products />);

    // Find the cart button and click it
    fireEvent.click(getByTestId('cart-button'));

    // Check if the cart modal is opened
    expect(getByTestId('cart-modal')).toBeInTheDocument();
  });

  // Test to check if the cart count updates when a product is added to the cart
  test('Updating cart count', async () => {
    // Mock product data
    const product = {
      id: 1,
      name: 'Product Name',
      image: 'product_image.jpg',
      discountedprice: 10.99,
      actualprice: 19.99,
    };

    // Mock axios post response
    axios.post.mockResolvedValueOnce({
      data: {
        productID: product.id,
        quantity: 1,
      },
    });

    // Render the Products component
    const { getByText } = render(<Products />);

    // Find the "Add to Cart" button and click it
    fireEvent.click(getByText('Add to Cart'));

    // Wait for the cart count to update
    await waitFor(() => {
      // Check if the cart count is updated to 1
      expect(getByText('1')).toBeInTheDocument();
    });
  });
});
