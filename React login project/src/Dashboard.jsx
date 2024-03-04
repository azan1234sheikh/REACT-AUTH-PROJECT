import React from "react";
import './Dashboard.css'; // Import CSS file

const Dashboard = () => {
  return (
    <main className="Hero container">
      <div className="Hero-content">
        
        <h1>YOUR FEET <br/> DESERVE <br/> THE BEST <br/></h1>
        <p>
          YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR 
          SHOES. YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR SHOES.
        </p>
        <div className="Brand-Btn">
          <button>Shop Now</button>
          <button className="sec-btn">Category</button>
        </div>
        <div className="shopping">
          <p>Also Available On</p>
          <div className="brand-icons">
            <img src="" alt="flipkart-img"/>
            <img src="" alt="amazon-img"/>
          </div>
        </div>
      </div>
      <div className="Hero-img">
        <img src="public/images/shoe_image.png" alt="hero-img"/>
      </div>
      
    </main>
  );
}

export default Dashboard;
