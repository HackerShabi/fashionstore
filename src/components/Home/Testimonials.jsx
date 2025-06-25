import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    image: "/assets/testimonials/testimonial-1.jpg",
    rating: 5,
    text: "I've been shopping here for years and I'm always impressed with the quality and style of their clothing. The customer service is excellent, and I love how they keep up with the latest trends.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Regular Customer",
    image: "/assets/testimonials/testimonial-2.jpg",
    rating: 4,
    text: "Great selection of men's clothes with excellent fit. The delivery is always prompt, and returns are hassle-free. Definitely my go-to store for professional attire.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Stylist",
    image: "/assets/testimonials/testimonial-3.jpg",
    rating: 5,
    text: "As a stylist, I recommend this store to all my clients. The quality of the fabrics is outstanding, and they offer unique pieces that you can't find anywhere else. Worth every penny!",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Parent",
    image: "/assets/testimonials/testimonial-4.jpg",
    rating: 5,
    text: "The kids' collection is fantastic! Durable clothes that withstand active play, and my children actually love wearing them. The reasonable prices make it easy to keep up with their growing needs.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const length = testimonials.length;
  
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  
  // Autoplay functionality
  useEffect(() => {
    let slideInterval;
    
    if (autoplay) {
      slideInterval = setInterval(() => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      }, 5000);
    }
    
    return () => clearInterval(slideInterval);
  }, [current, autoplay, length]);
  
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers about their experiences shopping with us.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="relative h-[400px] md:h-[300px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-lightGray p-6 md:p-10 rounded-xl shadow-sm h-full">
                  <div className="flex flex-col md:flex-row md:items-center h-full">
                    {/* Testimonial Image */}
                    <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto md:mx-0">
                        <img
                          src={testimonials[current].image}
                          alt={testimonials[current].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Testimonial Content */}
                    <div className="flex-grow">
                      <FaQuoteLeft className="text-accent opacity-20 text-4xl mb-4" />
                      <p className="text-gray-600 italic mb-6">
                        "{testimonials[current].text}"
                      </p>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h4 className="font-bold text-primary text-lg">
                            {testimonials[current].name}
                          </h4>
                          <p className="text-gray-500">{testimonials[current].role}</p>
                        </div>
                        
                        <div className="flex mt-3 md:mt-0">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              className={`w-5 h-5 ${
                                index < testimonials[current].rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 bg-white p-3 rounded-full shadow-md hover:bg-accent hover:text-white transition-colors z-10"
            onClick={prevSlide}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-6 bg-white p-3 rounded-full shadow-md hover:bg-accent hover:text-white transition-colors z-10"
            onClick={nextSlide}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
          
          {/* Dots Indicators */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                className={`w-2 h-2 mx-1 rounded-full ${
                  index === current ? "bg-accent w-6" : "bg-gray-300"
                } transition-all duration-300`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 