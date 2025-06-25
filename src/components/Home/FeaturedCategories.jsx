import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import categories from "../../data/categories";

const CategoryRow = ({ category, index }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-12"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-primary">{category.name}</h3>
          <p className="text-gray-600 mt-1">{category.description.split('.')[0]}.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
            aria-label={`Scroll ${category.name} categories left`}
          >
            <FaArrowLeft />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
            aria-label={`Scroll ${category.name} categories right`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {category.subcategories.map((subcat) => (
          <Link 
            key={subcat.id} 
            to={`/shop/${category.id}?subcategory=${subcat.id}`}
            className="flex-shrink-0 snap-start"
          >
            <div className="w-36 flex flex-col items-center group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-accent transition-all duration-300">
                <img 
                  src={subcat.image || "https://via.placeholder.com/150"} 
                  alt={subcat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <span className="font-medium text-center group-hover:text-accent transition-colors">{subcat.name}</span>
            </div>
          </Link>
        ))}
        
        <Link 
          to={`/shop/${category.id}`}
          className="flex-shrink-0 snap-start"
        >
          <div className="w-36 flex flex-col items-center group">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-3 bg-gray-100 flex items-center justify-center border-2 border-transparent group-hover:border-accent transition-all duration-300">
              <FaArrowRight className="text-2xl text-gray-400 group-hover:text-accent transition-colors" />
            </div>
            <span className="font-medium text-center group-hover:text-accent transition-colors">View All</span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our curated collections for men, women, and kids, featuring the latest trends and timeless essentials.
          </p>
        </motion.div>

        {/* Category Rows */}
        <div className="space-y-8">
          {categories.map((category, index) => (
            <CategoryRow key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories; 