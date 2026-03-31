import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Invoice() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        No booking data found!
      </div>
    );
  }

  const {
    from,
    to,
    travelDate,
    timeStart,
    timeEnd,
    busName,
    selectedSeats = [],
    passengerName,
    gender,
    email,
    phone,
    bookingId,
    totalPrice,
    paymentMethod,
  } = state;

  const formattedDate = travelDate
    ? travelDate.split("-").reverse().join("-")
    : "";

  // ✅ Save booking to localStorage
  useEffect(() => {
    const existingBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      id: bookingId,
      passengerName,
      gender,
      email,
      phone,
      from,
      to,
      date: formattedDate,
      time: `${timeStart} - ${timeEnd}`,
      busName,
      seats: selectedSeats.map((s) => s.id),
      amount: totalPrice,
      paymentMethod,
    };

    // Prevent duplicate save on refresh
    const alreadySaved = existingBookings.some(
      (b) => b.id === bookingId
    );

    if (!alreadySaved) {
      localStorage.setItem(
        "bookings",
        JSON.stringify([...existingBookings, newBooking])
      );
    }
  }, [bookingId, passengerName, gender, email, phone, from, to, formattedDate, timeStart, timeEnd, busName, selectedSeats, totalPrice, paymentMethod]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="bg-purple-600 text-white text-center py-4 font-bold text-xl rounded-t-2xl">
          Ticket Confirmation
        </div>

        {/* Ticket Body */}
        <div className="p-6 space-y-6">

          {/* Route */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-800 text-xs">From</p>
              <p className="text-lg font-semibold">{from}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 text-xs">To</p>
              <p className="text-lg font-semibold">{to}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-800 text-xs">Date</p>
              <p className="text-lg font-semibold">{formattedDate}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 text-xs">Time</p>
              <p className="text-lg font-semibold">
                {timeStart} - {timeEnd}
              </p>
            </div>
          </div>

          {/* Bus & Seats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-800 text-xs">Bus</p>
              <p className="text-lg font-semibold">{busName}</p>
            </div>

            <div className="text-right">
              <p className="text-gray-800 text-xs">Seat(s)</p>
              <p className="text-lg font-semibold">
                {selectedSeats.length
                  ? selectedSeats.map((s) => s.id).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-1">
            <p className="text-gray-800 text-xs">Passenger</p>
            <p className="text-lg font-semibold">{passengerName}</p>
            <p className="text-gray-800 text-sm">Gender: {gender}</p>
            <p className="text-gray-800 text-sm">Email: {email}</p>
            <p className="text-gray-800 text-sm">Phone: +91 {phone}</p>
          </div>

          {/* Booking & Payment Info */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-gray-800 text-xs">Booking ID</p>
              <p className="text-lg font-semibold">{bookingId}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 text-xs">Payment</p>
              <p className="text-lg font-semibold">{paymentMethod.toUpperCase()}</p>
            </div>
          </div>

          {/* Fare */}
          <div className="pt-4 border-t border-gray-200 text-center">
            <p className="text-gray-800 text-xs">Total Fare</p>
            <p className="text-2xl font-bold text-green-600">₹ {totalPrice}</p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="px-6 py-4 flex justify-center bg-gray-50">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition">
            Download / Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
