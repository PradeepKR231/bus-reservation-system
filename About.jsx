import React from 'react';
import { FaBus, FaCreditCard, FaClock, FaMobileAlt, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className=" bg-gray-100">

      
      <div className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-16 px-10">

        <h1 className="text-4xl font-bold mb-4">About Us – Bus Booking</h1>

        <p className="text-lg max-w-3xl">
          Bus Booking is a fast, secure, and user-friendly online bus reservation platform.
          Our mission is to make your travel easy, efficient, and comfortable—anytime, anywhere.
        </p>
        
      </div>

  
     

    </div>
  );
}

export default About;
