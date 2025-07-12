import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/StackIT_logo.png'; // Or replace with any logo or text

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Temporary auth check — later integrate proper auth
  const isLoggedIn = false;

  return (
    <nav className="bg-black shadow-md px-4 py-2 flex justify-between items-center relative">
      {/* Logo + Brand */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="StackIt" className="h-8 mr-2" />
        <span className="text-xl font-bold text-white">StackIt</span>
      </Link>

      {/* Hamburger for mobile */}
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-2xl text-white">
        ☰
      </button>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link to="/" className="text-white hover:text-blue-400">Home</Link>
        <Link to="/ask" className="text-white hover:text-blue-400">Ask Question</Link>

        {isLoggedIn && (
          <div className="relative">
            <span className="text-xl cursor-pointer text-white">🔔</span>
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
          </div>
        )}

        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/login")}
            className="border border-white text-white px-3 py-1 rounded hover:bg-gray-800"
          >
            Login
          </button>
        ) : (
          <Link to="/profile" className="text-white text-sm hover:text-blue-400">My Profile</Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-black shadow-md lg:hidden p-4 space-y-3 z-50">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-white hover:text-blue-400">Home</Link>
          <Link to="/ask" onClick={() => setIsOpen(false)} className="block text-white hover:text-blue-400">Ask Question</Link>

          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              <span className="text-white">🔔</span>
              <span className="text-sm text-white">3 new</span>
            </div>
          )}

          {!isLoggedIn ? (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="border border-white text-white px-3 py-1 rounded text-sm hover:bg-gray-800 w-full text-left"
            >
              Login
            </button>
          ) : (
            <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-white hover:text-blue-400">My Profile</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

