import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon, User } from 'lucide-react';
import { useAuth } from '../conetxt/AuthProvider';
import { useLanguage, languages } from '../conetxt/language-context';
import { getText } from '../../utils/languageutils';
import Login from '../components/Login';

const Navbar = () => {
  const { authUser } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const [sticky, setSticky] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);

    const userData = JSON.parse(localStorage.getItem("Users"));
    if (userData) setIsLoggedIn(true);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (authUser) {
      setIsLoggedIn(true);
      navigate('/Profile');
    }
  }, [authUser, navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${sticky ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Khana Khazana
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6">
              <li><Link className="hover:text-primary transition" to="/">{getText('Home', language)}</Link></li>
              <li><Link className="hover:text-primary transition" to="/AddKitchen">{getText('Add Kitchen', language)}</Link></li>
              <li><Link className="hover:text-primary transition" to="/Membership">{getText('Plans', language)}</Link></li>
              <li><Link className="hover:text-primary transition" to="/kitchen">{getText('Kitchens', language)}</Link></li>
              {!authUser && <li><Link className="hover:text-primary transition" to="/Signup">{getText('Signup', language)}</Link></li>}
            </ul>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <div className="flex items-center gap-1">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">{languages[language].code.toUpperCase()}</span>
                </div>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  {Object.values(languages).map((lang) => (
                    <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`w-full px-4 py-3 text-sm text-left ${lang.code === language ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'} transition first:rounded-t-xl last:rounded-b-xl`}>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* Profile/Login Button */}
            {isLoggedIn ? (
              <button onClick={() => navigate('/Profile')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </button>
            ) : (
              <button onClick={() => document.getElementById('my_modal_3')?.showModal()} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            {/* Mobile Menu Button */}
<button
  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  onClick={() => setMenuOpen(!menuOpen)}
>
  <Menu className="w-6 h-6" />
</button>

          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute inset-x-0 top-16 bg-white dark:bg-gray-900 shadow-lg rounded-b-xl transition-transform duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
          <ul className="px-4 py-3 space-y-2">
            <li><Link className="hover:text-primary transition" to="/">{getText('Home', language)}</Link></li>
            <li><Link className="hover:text-primary transition" to="/AddKitchen">{getText('Add Kitchen', language)}</Link></li>
            <li><Link className="hover:text-primary transition" to="/Membership">{getText('Plans', language)}</Link></li>
            <li><Link className="hover:text-primary transition" to="/kitchen">{getText('Kitchens', language)}</Link></li>
            {!authUser && <li><Link className="hover:text-primary transition" to="/Signup">{getText('Signup', language)}</Link></li>}
          </ul>
          <div className="border-t dark:border-gray-800 p-4">
            {isLoggedIn ? (
              <button onClick={() => navigate('/Profile')} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg">
                <User className="w-5 h-5" />
                Profile
              </button>
            ) : (
              <button onClick={() => { document.getElementById('my_modal_3')?.showModal(); setMenuOpen(false); }} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      <Login />
    </nav>
  );
};

export default Navbar;
