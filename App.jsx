import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Nav from "./Components/Nav";
import Sign from "./Components/Sign";
import Home from "./Components/Home";
import Ticket from "./Components/Ticket";
import BusSeats from "./Components/BusSeats";
import About from "./Components/About";
import Payment from "./Components/Payment";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Invoice from "./Components/Invoice";
import Dashboard from "./pages/Dashboard";

function App() {
  const [rangevalues, setrangevalue] = useState({ min: 0, max: 100 });

  const handleRangeChange = (value) => {
    setrangevalue(value);
  };

  const AdminRoute = ({ children }) => {
    return localStorage.getItem("adminAuth") ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <>
      <BrowserRouter>
        <div className="sticky top-0 z-50">
          <Nav />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/about" element={<About />} />
          <Route path="/busseats" element={<BusSeats />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/invoice" element={<Invoice />} />

          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
