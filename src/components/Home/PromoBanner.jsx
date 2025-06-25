import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PromoBanner = () => {
  // Set the end date for the promotion (1 week from now)
  const [endDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  });
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [endDate]);
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/promo-banner-bg.jpg"
          alt="Promo Banner Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-white"
          >
            <span className="bg-accent text-white px-3 py-1 rounded-md text-sm uppercase tracking-wider font-medium mb-4 inline-block">
              Special Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Summer Sale
            </h2>
            <p className="text-white/80 text-lg mb-6 max-w-lg">
              Take advantage of our biggest sale of the season. Get up to 50% off on selected items for a limited time.
            </p>
            
            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-3 mb-8 max-w-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-xs uppercase tracking-wider">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs uppercase tracking-wider">Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs uppercase tracking-wider">Minutes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs uppercase tracking-wider">Seconds</div>
              </div>
            </div>
            
            <Link
              to="/shop?category=sale"
              className="bg-accent hover:bg-white hover:text-accent text-white font-medium px-8 py-3 rounded-md transition-colors inline-flex items-center"
            >
              Shop Now
            </Link>
          </motion.div>
          
          {/* Right Content - Sale Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src="/assets/sale-item.png"
                alt="Sale Item"
                className="w-full max-w-md mx-auto"
              />
              <div className="absolute top-0 right-0 bg-accent text-white text-xl font-bold w-20 h-20 rounded-full flex items-center justify-center">
                -50%
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner; 