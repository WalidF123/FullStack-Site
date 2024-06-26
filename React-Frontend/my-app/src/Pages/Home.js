import React from "react";
import logo from "../assets/logo.jpeg";

function Home(props) {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 mb-4">Welcome to <b><span class="jumping-text">S</span><span class="jumping-text">O</span>
      <span class="jumping-text">I</span><span class="jumping-text">L</span></b></h1>
      <div className="row">
        <div className="col-md-6">
          <img src={logo} className="img-fluid" alt="Logo" width="400" length="400" />
        </div>
        <div className="col-md-6" sliding-text>
          <h2 className="slide-in">About SOIL</h2>
          <p className="slide-in">
            We are SOIL a long-term organic food grocer
            with several store locations around Melbourne. We focus on bringing premium, 
            organic fresh food to the community. 
          </p>
          <p className="slide-in">
            In addition to being food grocers, 
            we offer face to face seminars on diet, nutrition, and small-scale organic farming<br></br>
            <br></br>

            <a href="/products" className="btn btn-primary align-left">Explore Organic Products</a>
          </p>
          
        </div>
      </div>

      <hr />
      


      {/* Add more sections or components as needed */}

    </div>
  );
}

export default Home;



