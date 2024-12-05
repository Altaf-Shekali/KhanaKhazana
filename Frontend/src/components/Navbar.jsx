import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../conetxt/AuthProvider';

function Navbar() {
  const [authUser] = useAuth();
  const [sticky, setSticky] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/Aboutus">About Us</Link></li>
      <li><Link to="/Membership">Membership</Link></li>
      <li><Link to="/kitchen">Kitchens</Link></li>
      {!authUser && <li><Link to="/Signup">Signup</Link></li>}
    </>
  );

  return (
    <div
      className={`w-full fixed top-0 left-0 right-0 z-50 ${
        sticky ? 'shadow-md bg-base-200 transition-all' : ''
      }`}
    >
      <div className="navbar w-full px-4 md:px-20">
        {/* Navbar Start */}
        <div className="navbar-start">
          <button
            className="lg:hidden p-2 border rounded-md mr-2"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
          <a className="btn btn-ghost text-xl text-orange-500">Khana Khazana</a>
        </div>

        {/* Navbar Center - Desktop View */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-4">
          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              checked={darkMode}
              onChange={toggleTheme}
            />
            {/* Sun Icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            {/* Moon Icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {authUser ? (
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 duration-300"
              onClick={() => navigate('/Profile')}
            >
              Profile
            </button>
          ) : (
            <div>
              <a
                className="bg-black text-white px-3 py-1 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                onClick={() => document.getElementById('my_modal_3')?.showModal()}
              >
                Login
              </a>
              <Login />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="bg-white dark:bg-gray-800 lg:hidden shadow-md absolute top-full left-0 w-full">
          <ul className="menu menu-vertical p-4 space-y-2">{navItems}</ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
