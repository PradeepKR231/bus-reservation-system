import React, { useState } from 'react';

import bus from '../assets/herobg.png';
import bus1 from '../assets/bus6.png';
import bus2 from '../assets/bus7.png';
import bus3 from '../assets/bus8.png';
import './animations.css';

import { BiSearch } from 'react-icons/bi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';

function Home() {
  const images = [bus, bus1, bus2, bus3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div>
      <div className="bg-linear-to-r from-violet-300 to-pink-200 rounded">

        {/* Hero Headings */}
        <h5 className="ml-135 text-black p-5 text-3xl fade-up delay-1">Get Your Bus Tickets</h5>
        <h1 className="ml-100 mb-10 text-6xl text-black fade-up delay-2">Find Best Bus For You!</h1>

        {/* Search Bar */}
        <div className="p-8 flex gap-6 border border-white rounded-lg fade-up delay-3">
          <div className="relative flex items-center justify-center text-black">
            <input
              className="ml-25 focus:outline-none focus:border-violet-600 border-2 border-violet-600
                  font-bold w-70 h-13 px-3 rounded-md bg-white text-black"
              type="text"
              placeholder="From"
            />
            <IoLocationOutline className="absolute left-89 text-violet-600" size={20} />
          </div>

          <div className="flex items-center justify-center bg-white text-violet-600 rounded-full w-10 h-10">
            <BsArrowLeftRight size={20} />
          </div>

          <div className="relative flex items-center justify-center text-black">
            <input
              className="bg-white text-black border-2 border-violet-600 font-bold 
                  w-70 h-13 rounded-md px-3 focus:outline-none focus:border-violet-600"
              type="text"
              placeholder="To"
            />
            <IoLocationOutline className="absolute left-65 text-violet-600" size={20} />
          </div>

          <input
            className="bg-white text-black focus:outline-none focus:border-violet-600
                border-2 border-violet-600 font-bold w-70 h-13 rounded-md px-3"
            type="date"
            name="birthday"
          />

          <button
            className="text-white bg-violet-600 focus:outline-none border-2 
                         border-violet-600 rounded-md hover:bg-violet-700 font-bold ml-10 w-40 h-13
                          flex items-center justify-center gap-2 
                           transition transform duration-200 hover:scale-120"
          >
            <BiSearch size={20} />
            <span>Search</span>
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative w-8xl h-130 mt-10 overflow-hidden rounded-xl shadow-lg">
          <img
            src={images[currentIndex]}
            className="w-7xl h-full m-4 transition-all duration-700 zoom-in"
            alt="bus-slide"
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/40 text-white 
            px-3 py-2 rounded-full hover:bg-black/60 transition"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/40 text-white 
            px-3 py-2 rounded-full hover:bg-black/60 transition"
          >
            ❯
          </button>

          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {images.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  currentIndex === idx ? 'bg-white' : 'bg-white/50'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="text-white text-4xl font-extrabold ml-150 mt-20 drop-shadow-xl fade-up delay-1">
          <h1>Our <span className="text-red-600">Services</span></h1>
        </div>

        <div className="flex align-items-center mt-10">
          <div className="text-black bg-white ml-25 text-2xl border-2 p-3 rounded-md border-white w-90 fade-up delay-2 card-hover">
            <p className="text-center font-semibold text-black p-2">Secure Payment</p>
            <p className="text-black ml-8 text-sm">Integrate Secure Payment gateway for User to Pay for their ticket</p>
          </div>

          <div className="text-black bg-white ml-30 text-2xl border-2 p-3 rounded-md border-white w-90 fade-up delay-3 card-hover">
            <p className="text-center font-semibold text-black p-2">Refund Policy</p>
            <p className="text-black ml-8 text-sm">Offer Option for the user to purchase refundable ticket with clear term</p>
          </div>

          <div className="text-black bg-white ml-30 text-2xl border-2 p-3 rounded-md border-white w-90 fade-up delay-4 card-hover">
            <p className="text-center font-semibold text-black p-2">24/7 Support</p>
            <p className="text-black ml-8 text-sm">Get Assistance anytime through Chat, Email, Phone</p>
          </div>
        </div>

        {/* Top Routes */}
        <div className="text-white text-4xl font-extrabold m-7 ml-135 mt-20 drop-shadow-xl fade-up delay-2">
          <h1>Top Search <span className="text-red-600">Routes</span></h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mr-7 sm:ml-10 lg:ml-20 mt-10">
          {[
            { from: "Bangalore", time: "8 Hrs", to: "Hyderabad", price: "Rs. 1800" },
            { from: "Bangalore", time: "3 Hrs", to: "Mysore", price: "Rs. 900" },
            { from: "Chennai", time: "6 Hrs", to: "Coimbatore", price: "Rs. 1600" },
            { from: "Chennai", time: "5 Hrs", to: "Madurai", price: "Rs. 1400" },
            { from: "Coimbatore", time: "2 Hrs", to: "Salem", price: "Rs. 700" },
            { from: "Bangalore", time: "6 Hrs", to: "Chennai", price: "Rs. 1500" },
            { from: "Hyderabad", time: "10 Hrs", to: "Vizag", price: "Rs. 2000" },
          ].map((route, index) => (
            <div key={index} className="text-white bg-white border border-gray-200 p-4 w-full rounded-xl shadow-xl hover:scale-105 transition-transform fade-up delay-1">
              <p className="font-bold text-black text-lg">
                {route.from} — <span className="border-2 border-dotted rounded-md p-1">{route.time}</span> — {route.to}
              </p>
              <span className="block mt-3 font-bold text-black text-xl">{route.price}</span>
              <button className="bg-red-500 rounded-full mt-4 font-semibold w-32 h-10 hover:bg-red-600 transition transform duration-200 hover:scale-120 shadow-md">
                Reserve Seat
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-black px-5 pb-20">
          <div className="font-bold text-black fade-left">
            <h3 className="text-red-500 text-3xl">BUS</h3>
            <p className="mt-2">A bus list organizes routes, stops, times, and service notes. Useful for passengers daily.</p>
          </div>

          <div className="font-bold flex flex-col ml-50 gap-3 text-black fade-up">
            <h4 className="text-red-600">Quick Links</h4>
            <a href="#">About Us</a>
            <a href="#">My Account</a>
            <a href="#">Reserve Ticket</a>
            <a href="#">Create Account</a>
          </div>

          <div className="font-bold flex flex-col gap-3 text-black fade-right">
            <h4 className="text-red-600">Top Routes</h4>
            <a href="#">Chennai-Coimbatore</a>
            <a href="#">Bangalore-Mysore</a>
            <a href="#">Bangalore-Tirupati</a>
            <a href="#">Mumbai-Bangalore</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
