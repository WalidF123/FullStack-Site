
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon from react-icons
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, getUser, getUserIDByEmail } from '../data/repo';
import DisplaySummary from './DisplaySummary';
import Modal from './Modal';

function Products() {
    const [products, setProducts] = useState([]);
    const [userID, setUserID] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getUser();
        if (user && user.email) {
            fetchUserID(user.email);
        } else {
            console.error('No logged-in user found.');
        }

        fetchProducts();
    }, []);

    const fetchUserID = async (email) => {
        try {
            const data = await getUserIDByEmail(email);
            if (data && data.userID) {
                console.error(data.userID);
                setUserID(data.userID);
                fetchCartItems(data.userID); // Fetch cart items after setting userID
            } else {
                console.error('No user ID found for the given email.');
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const productsData = await getProducts(); // Call the getProducts function
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCartItems = async (userID) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/cartItems/user/${userID}`);
            setCartItems(response.data);
            setCartCount(response.data.length);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const addToCart = async (product) => {
        console.log('User ID:', userID);
        console.log('Product:', product);
        console.log('price:',product.discountedprice);

        if (!userID) {
            console.error('User ID not found.');
            alert('Please Login To Add Items To Cart');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/cartItems', {
                userID: userID,
                productID: product.id,
                productName: product.name,
                quantity: 1, // Default quantity is 1, modify as needed
                price: product.discountedprice, // Include the price here
            });

            const addedItem = response.data;
            console.log('Product added to cart:', addedItem);

            // Check if the item already exists in the cart
            const existingItemIndex = cartItems.findIndex(item => item.productID === addedItem.productID);

            if (existingItemIndex >= 0) {
                // Update the quantity of the existing item
                const updatedCartItems = [...cartItems];
                updatedCartItems[existingItemIndex].quantity = addedItem.quantity;
                setCartItems(updatedCartItems);
            } else {
                // Add the new item to the cart
                setCartItems([...cartItems, addedItem]);
                setCartCount(cartCount + 1);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const handleCloseCartModal = () => {
        setIsCartModalOpen(false);
    };

    const handleCartButtonClick = () => {
        setIsCartModalOpen(true);
    };

    const handleReviewButtonClick = (productId) => {
        navigate(`/reviews/${productId}`);
    };
  
    const specialProducts = products.filter(product => product.type === 'special');
    const standardProducts = products.filter(product => product.type === 'standard');

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'fixed', top: 90, right: 20 }}>
                <button onClick={handleCartButtonClick} style={{ background: 'none', border: '1px solid #ccc', cursor: 'pointer' }}>
                    <FaShoppingCart size={30} />
                    <span style={{ marginLeft: 8 }}>{cartCount}</span>
                </button>
            </div>
            <Modal isOpen={isCartModalOpen} onClose={handleCloseCartModal}>
                <DisplaySummary cartItems={cartItems} userID={userID} />
            </Modal>
            <h2>Special Products</h2>
            <div className="special-products">
                {specialProducts.filter(product => !product.isDeleted).map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p><b>Discounted Price: AU${product.discountedprice}</b></p>
                        <p>Actual Price: AU${product.actualprice}</p>
                        <button onClick={() => handleReviewButtonClick(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: 'blue', padding: 0, margin: 0 }}>
                            See Reviews
                        </button>
                        <br />
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            <h2>Standard Products</h2>
            <div className="standard-products">
                {standardProducts.filter(product => !product.isDeleted).map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>Price: AU${product.actualprice}</p>
                        {/* <button onClick={() => handleReviewButtonClick(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: 'blue', padding: 0, margin: 0 }}>
                            See Reviews
                        </button> */}
                        <Link to={`/reviews/${product.id}`} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: 'blue', padding: 0, margin: 0 }}>
            See Reviews
          </Link>
                        <br />
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;