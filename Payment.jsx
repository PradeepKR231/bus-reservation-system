import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    timeStart, timeEnd, from, to, selectedSeats = [], totalPrice = 0, travelDate, busName
  } = state || {};

  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const bookingId = "BK" + Math.floor(100000 + Math.random() * 900000);

  const finalPrice = totalPrice * 1.12;

  const handlePayment = (e) => {
    e.preventDefault();
    if (!passengerName || !email || !phone || !gender) {
      alert("Please fill all passenger details.");
      return;
    }
    if (paymentMethod === "card" && (!cardNumber || !expiry || !cvc)) {
      alert("Please fill all card details.");
      return;
    }

    alert(`Payment Successful via ${paymentMethod.toUpperCase()}!`);
    navigate("/invoice", {
      state: {
        passengerName,
        email,
        phone,
        gender,
        paymentMethod,
        bookingId,
        from,
        to,
        timeStart,
        timeEnd,
        selectedSeats,
        totalPrice: finalPrice.toFixed(0),
        travelDate,
        busName,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full">

        {/* Passenger Details */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <h2 className="text-2xl font-extrabold text-gray-800">Passenger Details</h2>
          <input type="text" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} placeholder="Full Name" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400" />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400" />

          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>

          {/* Payment Method */}
          <div className="flex gap-3 flex-wrap">
            {["card", "upi", "wallet", "cash"].map((method) => (
              <button key={method} type="button" onClick={() => setPaymentMethod(method)}
                className={`px-4 py-2 rounded-lg border ${paymentMethod === method ? "border-blue-600 bg-blue-100 text-blue-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
                {method.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Card Details */}
          {paymentMethod === "card" && (
            <div className="space-y-4 mt-4">
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400" />
              <div className="flex gap-3">
                <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400" />
                <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="CVC" className="w-24 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>
          )}

          <button onClick={handlePayment} className="w-full bg-blue-600 text-white py-3 rounded-full font-bold text-lg hover:scale-[1.03] transition">
            Pay ₹{finalPrice.toFixed(0)}
          </button>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-xl shadow-2xl p-6 space-y-4">
          <h2 className="text-2xl font-extrabold text-gray-800 text-center">Booking Summary</h2>

          <div className="border-b border-gray-300 pb-4">
            <p className="text-gray-700 font-semibold">{busName}</p>
            <p className="text-gray-500 text-sm">{travelDate} | Ticket No: <strong>{bookingId}</strong></p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p className="text-gray-500 text-xs">From</p>
              <p className="text-lg font-semibold">{from}</p>
              <p className="text-gray-500 text-xs mt-1">Time: {timeStart}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-xs">To</p>
              <p className="text-lg font-semibold">{to}</p>
              <p className="text-gray-500 text-xs mt-1">Time: {timeEnd}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <p className="text-gray-500 text-xs">Seats</p>
              <p className="text-lg font-semibold">{selectedSeats.map(s => s.id).join(", ")}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Passenger</p>
              <p className="text-lg font-semibold">{passengerName}</p>
              <p className="text-gray-500 text-xs">Gender: {gender}</p>
              <p className="text-gray-500 text-xs">Phone: {phone}</p>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <p className="text-gray-500 text-xs">Payment Method</p>
            <p className="text-lg font-semibold">{paymentMethod.toUpperCase()}</p>
            <p className="text-gray-500 text-xs mt-2">Total Fare</p>
            <p className="text-2xl font-bold text-green-600">₹{finalPrice.toFixed(0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
