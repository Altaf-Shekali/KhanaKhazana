import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon, User } from 'lucide-react';
import { useAuth } from '../conetxt/AuthProvider';
import { useLanguage, languages } from '../conetxt/language-context';
import { getText } from '../../utils/languageutils';
import Login from '../components/Login';

const Navbar = () => {
  const { authUser } = useAuth(); // Destructure authUser from useAuth
  const { language, changeLanguage } = useLanguage(); // Destructure language and changeLanguage from useLanguage
  const [sticky, setSticky] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    // Check localStorage for logged-in user
    const userData = JSON.parse(localStorage.getItem("Users"));
    if (userData) {
      setIsLoggedIn(true); // If user exists in localStorage, show Profile button
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Redirect to profile on successful login
  useEffect(() => {
    if (authUser) {
      setIsLoggedIn(true);
      navigate('/Profile');
    }
  }, [authUser, navigate]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle('dark', newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangMenuOpen(false);
  };

  const navItems = (
    <>
      <li>
        <Link className="hover:text-primary transition-colors duration-300" to="/">
          {getText('Home', language)}
        </Link>
      </li>
      <li>
        <Link className="hover:text-primary transition-colors duration-300" to="/AddKitchen">
          {getText('Add Kitchen', language)}
        </Link>
      </li>
      <li>
        <Link className="hover:text-primary transition-colors duration-300" to="/Membership">
          {getText('Plans', language)}
        </Link>
      </li>
      <li>
        <Link className="hover:text-primary transition-colors duration-300" to="/kitchen">
          {getText('Kitchens', language)}
        </Link>
      </li>
      {!authUser && (
        <li>
          <Link className="hover:text-primary transition-colors duration-300" to="/Signup">
            {getText('Signup', language)}
          </Link>
        </li>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        sticky ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
          >
            Khana Khazana
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6">{navItems}</ul>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">{languages[language].code.toUpperCase()}</span>
                </div>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  {Object.values(languages).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-3 text-sm text-left ${
                        lang.code === language
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      } transition-colors first:rounded-t-xl last:rounded-b-xl`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Profile/Login Button */}
            {isLoggedIn ? (
              <button
                onClick={() => navigate('/Profile')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </button>
            ) : (
              <button
                onClick={() => document.getElementById('my_modal_3')?.showModal()}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute inset-x-0 top-16 bg-white dark:bg-gray-900 shadow-lg rounded-b-xl">
            <ul className="px-4 py-3 space-y-2">{navItems}</ul>
            <div className="border-t dark:border-gray-800 p-4">
              {isLoggedIn ? (
                <button
                  onClick={() => navigate('/Profile')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg"
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
              ) : (
                <button
                  onClick={() => {
                    document.getElementById('my_modal_3')?.showModal();
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Login />
    </nav>
  );
};

export default Navbar;
