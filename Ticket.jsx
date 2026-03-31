import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from "react-router-dom";

function Ticket() {

  
   const [from, setFrom] = useState("");
   const [to, setTo] = useState("");
   const [travelDate, setTravelDate] = useState("");


   const handleSearch = () => {
    setFrom(fromInput);
    setTo(toInput);
  };
  

  
  const [maxPrice, setMaxPrice] = useState(2000);



  const buses = [
    {
      id: 1,
      from: "Bangalore",
      to: "Chennai",
      timeStart: "8:30 PM",
      timeEnd: "10:00 AM",
      duration: "8 Hrs",
      price: 1600,
    },
    {
      id: 2,
      from: "Bangalore",
      to: "Hyderabad",
      timeStart: "9:00 PM",
      timeEnd: "5:00 AM",
      duration: "8 Hrs",
      price: 1000,
    },
    {
      id: 3,
      from: "Bangalore",
      to: "Mysore",
      timeStart: "6:00 PM",
      timeEnd: "10:00 PM",
      duration: "4 Hrs",
      price: 500,
    },
  ];
 

   // FILTER LOGIC
  const filteredBuses = buses.filter(
    (bus) =>
      (from === "" || bus.from.toLowerCase().includes(from.toLowerCase())) &&
      (to === "" || bus.to.toLowerCase().includes(to.toLowerCase())) &&
      bus.price <= maxPrice
  );

  


  return (
    
    

<div className="min-h-screen  p-8 bg-linear-to-r from-violet-300 to-pink-200">


<div className="flex items-startgap-6">


  <div className="bg-white backdrop-blur-lg p-8 w-400 flex gap-6 border border-gray-300 rounded-lg">

    <div className="relative flex items-center">

      <input value={from} onChange={(e) => setFrom(e.target.value)}
        className="border-2 border-violet-600 focus:outline-none focus:border-violet-600  font-bold w-70 h-10 px-3 rounded-md "
        type="text" placeholder="From" />

      <IoLocationOutline className="absolute right-3 text-black" size={20} />
    </div>

    <div className="flex items-center justify-center bg-white text-pink-600 rounded-full w-10 h-10">
      <BsArrowLeftRight size={20} />
    </div>

    <div className="relative flex items-center ">
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className=" border-2 border-violet-600 focus:outline-none focus:border-violet-600 
        font-semibold w-70 h-10 px-3 rounded-md  " 
        type="text" placeholder="To"
      />
      <IoLocationOutline className="absolute right-3 text-black" size={20} />
    </div>

    <div className="relative flex items-center">
      <input
        className="bg-white text-black border-2 border-violet-600 font-bold 
        w-70 h-10 ml-10 rounded-md px-3 focus:outline-none focus:border-violet-600 "
        type="date" value={travelDate}  onChange={(e) => setTravelDate(e.target.value)}
      />
    </div>

    <button onClick={handleSearch} className="text-white border-2  
    rounded-md hover:bg-violet-700 border-none bg-violet-600 focus:outline-none 
    font-bold w-40 h-12 ml-10 flex items-center justify-center gap-2  transition transform duration-200 hover:scale-120">
      <BiSearch size={20} />
      <span>Search</span>
    </button>

  </div>

  

</div>


<div className="flex gap-10 p-8">

  
  <div className="flex flex-col gap-6 w-64">

    
  <div className="bg-white p-4 rounded-lg shadow-md w-60 border border-gray-300">

    <h3 className="font-semibold mb-2 text-gray-800">Filter by Price</h3>
    
    <input type="range" min="100"  max="2000"  step="100"
      value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
      className="w-full"
    />

    <p className="mt-2 text-gray-700 font-semibold">Max Price: ₹{maxPrice}</p>
  </div>

    <div className="w-60 rounded-xl border border-pink-300 shadow-lg bg-blue-50 p-4 text-blue-900">
      <h2 className="font-semibold mb-3">Bus Types</h2>
      <label><input type="checkbox" className="mr-2" /> AC Deluxe</label><br />
      <label><input type="checkbox" className="mr-2" /> Air Suspension</label><br />
      <label><input type="checkbox" className="mr-2" /> Luxury AC</label>
    </div>

    <div className="w-60 rounded-xl border border-pink-300 shadow-lg bg-blue-50 p-4 text-blue-900">
      <h2 className="font-semibold mb-3">Bus Companies</h2>
      <label><input type="checkbox" className="mr-2" /> Red Bus</label><br />
      <label><input type="checkbox" className="mr-2" /> Volvo</label><br />
      <label><input type="checkbox" className="mr-2" /> Intercity</label><br />
      <label><input type="checkbox" className="mr-2" /> Travels</label>
    </div>

  </div>

  {/* BUS RESULTS */}
  <div className="flex flex-col gap-6">
    {filteredBuses.length === 0 && (
      <p className="text-lg font-semibold text-red-600">
        No buses found for this route or price range.
      </p>
    )}

    {filteredBuses.map((bus) => (
      <div key={bus.id} className="text-blue-900 border border-pink-300 p-4
                transition transform duration-200 hover:scale-110 bg-blue-50 shadow-lg rounded-md w-200">
                  
        <span className="font-semibold">{bus.timeStart}</span>
        <span className="float-right mr-8 font-semibold">{bus.timeEnd}</span>

        <p className="font-bold flex justify-between mt-2">
          <span>{bus.from}</span>
          <span className="mr-8">{bus.duration}</span>
          <span className="mr-10">{bus.to}</span>
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg">Rs. {bus.price}</span>

          <Link
            to="/busseats"
            state={{
              from: bus.from,
              to: bus.to,
              timeStart: bus.timeStart,
              timeEnd: bus.timeEnd,
              price: bus.price,
              travelDate: travelDate 
            }}
          >
            <button className="bg-red-600 text-white rounded-full px-4 py-2 
             transition transform duration-200 hover:scale-120 shadow-lg font-semibold">
              Reserve Seat
            </button>
          </Link>
        </div>
      </div>
    ))}
  </div>

</div>

</div>
  )
}

export default Ticket;
