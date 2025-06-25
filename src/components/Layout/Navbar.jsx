import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import categories from "../../data/categories";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(false);
  }, [location]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Toggle dropdown menu
  const toggleDropdown = (category) => {
    if (activeDropdown === category) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(category);
    }
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  // Toggle search bar
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-light shadow-md py-2" : "bg-light/95 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            FASHION<span className="text-accent">STORE</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary hover:text-accent font-medium transition-colors">
              Home
            </Link>
            
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(category.id);
                }}
              >
                <button className="text-primary hover:text-accent font-medium transition-colors flex items-center">
                  {category.name}
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform ${
                      activeDropdown === category.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {activeDropdown === category.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-light rounded-lg shadow-xl overflow-hidden z-20"
                    >
                      <Link
                        to={`/shop/${category.id}`}
                        className="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-white transition-colors"
                      >
                        All {category.name}
                      </Link>
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/shop/${category.id}?subcategory=${subcategory.id}`}
                          className="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-white transition-colors"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link to="/blog" className="text-primary hover:text-accent font-medium transition-colors">
              Blog
            </Link>
            <Link to="/help" className="text-primary hover:text-accent font-medium transition-colors">
              Help
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            
            <Link to="/cart" className="text-primary hover:text-accent transition-colors relative">
              <FaShoppingCart className="w-5 h-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            <button className="text-primary hover:text-accent transition-colors">
              <FaUser className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primary hover:text-accent transition-colors"
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-light border-t mt-2"
          >
            <div className="container mx-auto px-4 py-3">

              
              <Link
                to="/"
                className="block py-2 text-primary hover:text-accent transition-colors"
              >
                Home
              </Link>
              
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => toggleDropdown(category.id)}
                    className="w-full flex justify-between items-center py-2 text-primary hover:text-accent transition-colors"
                  >
                    {category.name}
                    <svg
                      className={`ml-1 w-4 h-4 transition-transform ${
                        activeDropdown === category.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === category.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 border-l-2 border-accent ml-2"
                      >
                        <Link
                          to={`/shop/${category.id}`}
                          className="block py-2 text-primary hover:text-accent transition-colors"
                        >
                          All {category.name}
                        </Link>
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            to={`/shop/${category.id}?subcategory=${subcategory.id}`}
                            className="block py-2 text-primary hover:text-accent transition-colors"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                to="/blog"
                className="block py-2 text-primary hover:text-accent transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/help"
                className="block py-2 text-primary hover:text-accent transition-colors"
              >
                Help
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-primary hover:text-accent transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/become-seller"
                className="block py-2 text-primary hover:text-accent transition-colors"
              >
                Become a Seller
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 