import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6 mt-12">
      <div className="container mx-auto px-4">
        {/* Newsletter signup */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-gray-300 mb-4">
            Stay updated with the latest trends and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent w-full sm:w-auto flex-grow max-w-md"
              required
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Shop */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/men" className="text-gray-300 hover:text-accent transition-colors">Men</Link>
              </li>
              <li>
                <Link to="/shop/women" className="text-gray-300 hover:text-accent transition-colors">Women</Link>
              </li>
              <li>
                <Link to="/shop/kids" className="text-gray-300 hover:text-accent transition-colors">Kids</Link>
              </li>
              <li>
                <Link to="/shop?category=new-arrivals" className="text-gray-300 hover:text-accent transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/shop?category=sale" className="text-gray-300 hover:text-accent transition-colors">Sale</Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-accent transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/help?section=shipping" className="text-gray-300 hover:text-accent transition-colors">Shipping Info</Link>
              </li>
              <li>
                <Link to="/help?section=returns" className="text-gray-300 hover:text-accent transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/help?section=payment" className="text-gray-300 hover:text-accent transition-colors">Payment Methods</Link>
              </li>
              <li>
                <Link to="/help?section=size" className="text-gray-300 hover:text-accent transition-colors">Size Guide</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/become-seller" className="text-gray-300 hover:text-accent transition-colors">Become a Seller</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-accent transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-accent transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Contact Us</h4>
            <address className="not-italic text-gray-300 space-y-2">
              <p>1234 Fashion Street</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
              <p className="mt-4">
                <a href="tel:+12345678900" className="hover:text-accent transition-colors">+1 (234) 567-8900</a>
              </p>
              <p>
                <a href="mailto:support@fashionstore.com" className="hover:text-accent transition-colors">
                  support@fashionstore.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Social and Payment */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Icons */}
            <div className="flex space-x-4 mb-6 md:mb-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-gray-800 p-3 rounded-full hover:bg-accent transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="bg-gray-800 p-3 rounded-full hover:bg-accent transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-gray-800 p-3 rounded-full hover:bg-accent transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="bg-gray-800 p-3 rounded-full hover:bg-accent transition-colors"
              >
                <FaPinterest className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="bg-gray-800 p-3 rounded-full hover:bg-accent transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>

            {/* Payment Methods */}
            <div className="flex space-x-4">
              <FaCreditCard className="w-8 h-8 text-gray-400" />
              <FaPaypal className="w-8 h-8 text-gray-400" />
              <FaApplePay className="w-8 h-8 text-gray-400" />
              <FaGooglePay className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm mt-8">
            <p>&copy; {new Date().getFullYear()} Fashion Store. All rights reserved.</p>
            <p className="mt-2">
              <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              {" | "}
              <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 