import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/login");
  };

  // Delete a booking by id
  const handleDelete = (id) => {
    const updatedBookings = bookings.filter((b) => b.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <p className="mb-4">
        Total Tickets Booked:
        <span className="font-bold ml-2">{bookings.length}</span>
      </p>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings available yet</p>
      ) : (
        <table className="w-full border border-gray-300 text-center">
          <thead className="bg-gray-200">
            <tr>
              <th>Sl. No</th> {/* Added Serial Number Column */}
              <th>User</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seats</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Action</th> {/* Delete Button */}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b.id} className="border-t">
                <td>{index + 1}</td> {/* Serial Number */}
                <td>{b.passengerName}</td>
                <td>{b.from}</td>
                <td>{b.to}</td>
                <td>{b.formatteddate}</td>
                <td>{b.time}</td>
                <td>{b.seats.join(", ")}</td>
                <td>₹{b.amount}</td>
                <td>{b.paymentMethod.toUpperCase()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
