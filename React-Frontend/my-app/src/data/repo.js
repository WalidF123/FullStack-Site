import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  return user;
}
//Removal of user from database
async function deleteUser(id) {
  const response = await axios.delete(API_HOST + `/api/users/${id}`);
  
  // After successful deletion, remove user from local storage

  return response.data;
}


async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}
async function getUsers() {
  const response = await axios.get(API_HOST + "/api/users");

  return response.data;
}
export async function fetchUserFromBackend(userId) {
  const response = await axios.get(`${API_HOST}/api/users/select/${userId}`);
  return response.data;
}
// --- Product ---------------------------------------------------------------------------------------
async function getProducts() {
  const response = await axios.get(API_HOST + "/api/products");

  return response.data;
}

async function createProduct(product) {
  const response = await axios.post(API_HOST + "/api/products", product);

  return response.data;
}
// async function getOrders() {
//   const response = await axios.get(API_HOST + "/api/orderHistory");

//   return response.data;
// }

async function getOrders(userID){
  try {
    const response = await axios.get(`${API_HOST}/api/orderHistory/user/${userID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// --- Review ---------------------------------------------------------------------------------------
async function getReviews() {
  const response = await axios.get(API_HOST + "/api/reviews");

  return response.data;
}

async function createReviews(review) {
  const response = await axios.post(API_HOST + "/api/reviews", review);

  return response.data;
}

async function deleteReviews(review_id) {
  const response = await axios.delete(API_HOST + `/api/reviews/${review_id}`);
  

  return response.data;
}

async function findReviews(review_id) {
  const response = await axios.get(API_HOST + `/api/reviews/select/${review_id}`);

  return response.data;

}
// New function to get reviews by product ID
async function getReviewsByProductId(productId) {
  const response = await axios.get(`${API_HOST}/api/reviews/products/${productId}/reviews`);
  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}
// Get user ID by email or username
async function getUserIDByEmail(email) {
  const response = await axios.get(API_HOST + "/api/users/findBy", { params: { email } });
  return response.data;
}


function removeUser() {
  localStorage.removeItem(USER_KEY);
}
async function updateUser(id, updatedUserData) {
  try {
    const response = await axios.put(API_HOST + `/api/users/${id}`, updatedUserData);
    
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export { createProduct, createReviews, createUser, deleteReviews, deleteUser, findReviews, findUser, getOrders, getProducts, getReviews, getReviewsByProductId, getUser, getUserIDByEmail, getUsers, removeUser, setUser, updateUser, verifyUser };

