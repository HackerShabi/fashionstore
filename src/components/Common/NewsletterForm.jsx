import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { isValidEmail } from "../../utils/formatters";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus({ type: "error", message: "Please enter your email address." });
      return;
    }
    
    if (!isValidEmail(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStatus({
        type: "success",
        message: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-16 bg-lightGray">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Sign up to receive updates on new arrivals, special offers, and more.
            </p>
            
            <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-md font-medium flex items-center justify-center ${
                    loading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-accent text-white hover:bg-accent/90"
                  } transition-colors`}
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <FaPaperPlane className="mr-2" />
                  )}
                  Subscribe
                </motion.button>
              </div>
              
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 text-left text-sm ${
                    status.type === "error" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm; 