import { useState, useRef, useEffect } from "react";

export default function Profile({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const fullName = user.name
  .trim()
  .toLowerCase()
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-30 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold"
      >
        {fullName}
      </button>

      {isOpen && (
        <div className="absolute  mt-2  w-66 bg-white rounded-sm shadow-lg border z-50">
          <div className="px-4 py-3 border-b">
            <p className="font-medium">Name: {user.name}</p>
            <p className="text-sm text-gray-500">Email: {user.email}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>

          <ul className="py-1">
            <li>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
