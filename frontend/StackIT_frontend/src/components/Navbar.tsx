import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/StackIT_logo.png'; // Replace with your actual logo
import profilePic from '../assets/profile.png'; // Placeholder profile image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = true;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-black shadow-sm px-4 py-3 flex justify-between items-center">
      {/* Left side: Logo + Links */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="StackIt" className="h-8 mr-2" />
          <span className="text-lg font-bold text-white">Code Exchange</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-400">Home</Link>
          <Link to="/Answers" className="text-white hover:text-blue-400">Answers</Link>
          <Link to="/ask" className="text-white hover:text-blue-400">Ask Question</Link>
        </div>
      </div>

      {/* Right side: Search + Notification + Profile */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-1 rounded-lg bg-gray-800 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button className="text-white hover:text-blue-400 text-xl">🔔</button>

        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <img
              src={profilePic}
              alt="Profile"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 rounded-md shadow-lg z-50">
                <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">My Profile</Link>
                <Link to="/settings" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">Settings</Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/login"); // Replace with logout logic
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="border border-white px-3 py-1 rounded text-sm text-white hover:bg-gray-800"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



