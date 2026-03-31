import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
//import Profile from "./Profile";

export default function Nav() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("LoggedIn") === "true");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Listen for login/logout changes
  useEffect(() => {
    const updateAuth = () => {
      const isLoggedIn = localStorage.getItem("LoggedIn") === "true";
      setLoggedIn(isLoggedIn);
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("authChange", updateAuth);

    return () => window.removeEventListener("authChange", updateAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("LoggedIn");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-lg border border-slate-200 flex font-bold p-5 gap-5 items-center">
      <h3 className="ml-5 mt-2 text-xl bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent font-extrabold transition transform duration-200 hover:scale-110">
        Bus Reservation
      </h3>

      <Link to="/" className="ml-190 mt-2 text-gray-700 hover:text-violet-600 transition transform duration-200 hover:scale-110 text-xl font-semibold">
        Home
      </Link>

      <Link to="/ticket" className="mt-2 text-gray-700 hover:text-violet-600 transition transform duration-200 hover:scale-110 text-xl font-semibold">
        Ticket
      </Link>

      <Link to="/about" className="mt-2 text-gray-700 hover:text-violet-600 transition transform duration-200 hover:scale-110 text-xl font-semibold">
        About
      </Link>

      <div className="mr-7 flex items-center gap-4">
        {loggedIn && user ? (
          <>
            <Profile user={user} onLogout={handleLogout} />
          </>
        ) : (
          <Link
            to="/sign"
            className="text-gray-700 mr-10  mt-2 text-xl font-bold rounded-full bg-white flex items-center justify-center transition transform duration-200 hover:scale-110 hover:bg-violet-300"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
