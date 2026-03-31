import { useState, useEffect } from "react";
import busSeatData from "../Data/busSeatData";
import { useLocation, useNavigate } from "react-router-dom";

function BusSeats() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, timeStart, timeEnd, travelDate, price, busName } = location.state || {};

  const seatPrice = price || 0;
  const [seats, setSeats] = useState(busSeatData);

  // Mark already booked seats
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const bookedSeats = bookings.flatMap(b => b.seats);
    setSeats(prev =>
      prev.map(s =>
        bookedSeats.includes(s.id) ? { ...s, status: "booked" } : s
      )
    );
  }, []);

  const selectedSeats = seats.filter((s) => s.status === "selected");
  const totalPrice = selectedSeats.length * seatPrice;

  const ASeats = seats.filter((s) => s.id.startsWith("A"));
  const BSeats = seats.filter((s) => s.id.startsWith("B"));

  const toggleSeat = (id) => {
    setSeats(prev =>
      prev.map(s =>
        s.id === id && s.status !== "booked"
          ? { ...s, status: s.status === "available" ? "selected" : "available" }
          : s
      )
    );
  };

  const Seat = ({ seat }) => {
    const base = "w-12 h-12 rounded-md flex items-center justify-center font-semibold text-sm transition";
    const statusStyle =
      seat.status === "booked"
        ? "bg-red-500 text-white cursor-not-allowed shadow-md"
        : seat.status === "selected"
        ? "bg-green-500 text-white shadow-md"
        : "bg-white border border-gray-400 hover:border-green-500";

    return (
      <button
        disabled={seat.status === "booked"}
        onClick={() => toggleSeat(seat.id)}
        className={`${base} ${statusStyle}`}
      >
        {seat.id}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-8 px-4">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-6">
        {/* Seat Selection */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>
          <div className="mb-6">
            <p className="font-medium mb-2">A Row</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {ASeats.map(seat => <Seat key={seat.id} seat={seat} />)}
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">B Row</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {BSeats.map(seat => <Seat key={seat.id} seat={seat} />)}
            </div>
          </div>
          <div className="flex gap-4 mt-6 text-sm justify-center">
            <div className="flex items-center gap-1"><div className="w-4 h-4 bg-white border border-gray-400"></div>Available</div>
            <div className="flex items-center gap-1"><div className="w-4 h-4 bg-green-500"></div>Selected</div>
            <div className="flex items-center gap-1"><div className="w-4 h-4 bg-red-500"></div>Booked</div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:w-96 ml-10 h-110 bg-white p-6 rounded-xl shadow-md flex flex-col gap-5">
          <h2 className="text-lg font-bold text-center">Booking Summary</h2>
          <div className="flex justify-between text-sm">
            <span>{timeStart}</span>
            <span>{timeEnd}</span>
          </div>
          <p className="font-medium">{from} → {to}</p>
          <p className="text-xs text-gray-500">{travelDate}</p>
          <div>
            <p className="font-medium">Selected Seats:</p>
            <p>{selectedSeats.length ? selectedSeats.map(s => s.id).join(", ") : "None"}</p>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between text-sm">
              <span>Seat Price</span>
              <span>₹{seatPrice}</span>
            </div>
            <div className="flex justify-between font-semibold mt-1 text-green-600">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          <button
            onClick={() => selectedSeats.length && navigate("/payment", { state: { from, to, timeStart, timeEnd, travelDate, selectedSeats, seatPrice, totalPrice, busName } })}
            disabled={!selectedSeats.length}
            className={`mt-4 w-full py-2 rounded font-semibold text-white transition ${!selectedSeats.length ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusSeats;
