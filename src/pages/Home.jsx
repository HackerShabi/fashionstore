import React from "react";
import Hero from "../components/Home/Hero";
import SearchBar from "../components/Home/SearchBar";
import FeaturedCategories from "../components/Home/FeaturedCategories";
import ProductCarousel from "../components/Home/ProductCarousel";
import PromoBanner from "../components/Home/PromoBanner";
import Testimonials from "../components/Home/Testimonials";
import NewsletterForm from "../components/Common/NewsletterForm";

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero />
      
      {/* Search Bar */}
      <SearchBar />
      
      {/* Featured Categories */}
      <FeaturedCategories />
      
      {/* New Arrivals */}
      <ProductCarousel
        title="New Arrivals"
        subtitle="Check out our latest products and stay ahead of the fashion curve"
        filter="featured"
        limit={8}
      />
      
      {/* Promo Banner */}
      <PromoBanner />
      
      {/* Trending Products */}
      <ProductCarousel
        title="Trending Now"
        subtitle="Our most popular products based on sales"
        filter="trending"
        limit={8}
      />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Newsletter */}
      <NewsletterForm />
    </div>
  );
};

export default Home; 