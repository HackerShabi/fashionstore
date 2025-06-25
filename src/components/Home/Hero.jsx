import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel data
  const carouselSlides = [
    {
      id: 1,
      title: "Summer Collection 2024",
      heading: "Discover Your Perfect Style",
      description: "Explore our curated collection of contemporary fashion for men, women, and kids. Quality designs that blend comfort and style for every occasion.",
      image: "/assets/hero-main.jpg",
      link: "/shop",
      color: "bg-accent"
    },
    {
      id: 2,
      title: "New Arrivals",
      heading: "Exclusive Designer Collection",
      description: "Be the first to shop our latest arrivals. Limited editions that define the season's trends and elevate your wardrobe.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1170&auto=format&fit=crop",
      link: "/shop?category=new-arrivals",
      color: "bg-emerald-500"
    },
    {
      id: 3,
      title: "Premium Accessories",
      heading: "Complete Your Look",
      description: "Discover our range of accessories that add the perfect finishing touch to any outfit. From statement pieces to everyday essentials.",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1286&auto=format&fit=crop",
      link: "/shop?category=accessories",
      color: "bg-amber-500"
    },
    {
      id: 4,
      title: "Kids Collection",
      heading: "Style for Little Ones",
      description: "Adorable and comfortable clothing for kids of all ages. Durable designs that keep up with their adventures.",
      image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1169&auto=format&fit=crop",
      link: "/shop?category=kids",
      color: "bg-blue-500"
    },
    {
      id: 5,
      title: "Seasonal Sale",
      heading: "Up to 50% Off",
      description: "Limited time offers on selected items. Refresh your wardrobe with our seasonal sale items at unbeatable prices.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1171&auto=format&fit=crop",
      link: "/shop?category=sale",
      color: "bg-red-500"
    },
    {
      id: 6,
      title: "Sustainable Fashion",
      heading: "Eco-Friendly Choices",
      description: "Environmentally conscious clothing made from sustainable materials. Look good while making responsible choices.",
      image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1170&auto=format&fit=crop",
      link: "/shop?category=sustainable",
      color: "bg-green-600"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  // Navigation handlers
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = carouselSlides[currentSlide];

  return (
    <div className="relative bg-lightGray min-h-[80vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Hero Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="z-10"
          >
            <span className={`${currentSlideData.color} text-white uppercase tracking-wider font-medium mb-2 inline-block px-3 py-1 rounded-md`}>
              {currentSlideData.title}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              {currentSlideData.heading.split(' ').map((word, i, arr) => 
                i === arr.length - 2 ? <span key={i}>{word} <br /></span> : <span key={i}>{word} </span>
              )}
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              {currentSlideData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={currentSlideData.link}
                className="bg-primary hover:bg-accent text-white font-medium px-8 py-3 rounded-md transition-colors inline-flex items-center"
              >
                Shop Now
              </Link>
              <Link
                to="/contact"
                className="border border-primary text-primary hover:text-accent hover:border-accent font-medium px-8 py-3 rounded-md transition-colors inline-flex items-center"
              >
                Contact Us
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <a href="#" className="bg-gray-100 hover:bg-accent hover:text-white p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="bg-gray-100 hover:bg-accent hover:text-white p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="bg-gray-100 hover:bg-accent hover:text-white p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-square">
              <img
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="rounded-2xl shadow-lg object-cover w-full h-full"
              />
            </div>
            
            {/* Shop Now Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                to={currentSlideData.link}
                className="bg-white/80 hover:bg-white text-primary font-bold px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-110"
              >
                Shop Now
              </Link>
            </div>
            
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px]"
            >
              <div className="text-xs text-gray-500 mb-1">Special Offer</div>
              <div className="text-primary font-bold">Up to 40% Off</div>
              <div className="text-xs text-gray-500 mt-1">Limited time offer</div>
            </motion.div>
            
            {/* Second floating element */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`absolute -top-6 -right-6 ${currentSlideData.color} text-white p-3 rounded-full shadow-lg flex items-center justify-center h-16 w-16`}
            >
              <div className="text-center">
                <div className="text-lg font-bold">New</div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-accent w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md z-20"
        aria-label="Previous slide"
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md z-20"
        aria-label="Next slide"
      >
        <FaArrowRight size={20} />
      </button>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -z-10 rounded-bl-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-accent/5 -z-10 rounded-tr-[100px]"></div>
    </div>
  );
};

export default Hero; 