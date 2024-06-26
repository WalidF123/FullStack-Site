
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Header from './Fragments/Header';
import Navbar from './Fragments/Navbar';
import Footer from './Fragments/footer';

import DietPlan from './Pages/DietPlan';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import OrderHistory from './Pages/OrderHistory';
import Products from './Pages/Products';
import ReviewPage from './Pages/ReviewPage'; // Import the ReviewPage component
import MyProfile from "./Pages/myProfile";
import SignUp from './Pages/signUp';

import { getUser, removeUser } from "./data/repository";

function App() {
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header />
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login loginUser={loginUser} />} />
              <Route path="/signup" element={<SignUp loginUser={loginUser} />} />
              <Route path="/profile" element={<MyProfile user={user} />} />
              <Route path="/dietplan" element={<DietPlan />} />
              <Route path="/orderhistory" element={<OrderHistory userID={user?.userID} />} /> {/* Pass userID as prop */}
              {/* <Route path="/review/:productId" element={<Review />} />
              <Route path="/reviews/:productId" element={<ReviewPage />} /> Update route for ReviewPage */}
                <Route path="/reviews/:productId" element={<ReviewPage />} />
          <Route path="/reviews" element={<ReviewPage />} /> {/* Review page without productId */}
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;