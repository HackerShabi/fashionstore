import React from "react";
import Breadcrumb from "../components/Layout/Breadcrumb";
import { Link } from "react-router-dom";

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Summer Fashion Trends 2023",
      excerpt: "Discover the hottest fashion trends for the upcoming summer season. From vibrant colors to lightweight fabrics, we've got you covered.",
      image: "https://via.placeholder.com/800x400",
      date: "May 15, 2023",
      category: "Fashion Trends",
      author: "Emily Johnson"
    },
    {
      id: 2,
      title: "Sustainable Fashion: Making Ethical Choices",
      excerpt: "Learn how to make more sustainable fashion choices and reduce your environmental footprint while still looking stylish.",
      image: "https://via.placeholder.com/800x400",
      date: "May 10, 2023",
      category: "Sustainability",
      author: "Michael Chen"
    },
    {
      id: 3,
      title: "How to Build a Capsule Wardrobe",
      excerpt: "Simplify your life with a well-planned capsule wardrobe. This guide will help you create a versatile collection of clothing that works for any occasion.",
      image: "https://via.placeholder.com/800x400",
      date: "May 5, 2023",
      category: "Style Tips",
      author: "Sarah Williams"
    },
    {
      id: 4,
      title: "The History of Denim: From Workwear to High Fashion",
      excerpt: "Explore the fascinating journey of denim from its humble beginnings as workwear to becoming a staple in high fashion.",
      image: "https://via.placeholder.com/800x400",
      date: "April 28, 2023",
      category: "Fashion History",
      author: "David Miller"
    },
    {
      id: 5,
      title: "Celebrity Style Inspiration: Iconic Looks to Try",
      excerpt: "Get inspired by these iconic celebrity looks and learn how to incorporate elements of their style into your everyday wardrobe.",
      image: "https://via.placeholder.com/800x400",
      date: "April 20, 2023",
      category: "Celebrity Style",
      author: "Jessica Brown"
    },
    {
      id: 6,
      title: "Men's Fashion Guide: Essential Items Every Man Should Own",
      excerpt: "A comprehensive guide to men's fashion essentials that form the foundation of a versatile and stylish wardrobe.",
      image: "https://via.placeholder.com/800x400",
      date: "April 15, 2023",
      category: "Men's Fashion",
      author: "Robert Thompson"
    }
  ];

  // Categories for sidebar
  const categories = [
    { name: "Fashion Trends", count: 12 },
    { name: "Style Tips", count: 8 },
    { name: "Sustainability", count: 5 },
    { name: "Celebrity Style", count: 7 },
    { name: "Fashion History", count: 4 },
    { name: "Men's Fashion", count: 6 },
    { name: "Women's Fashion", count: 9 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Blog", path: "/blog" }
      ]} />
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-8">Fashion Blog</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.category}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="text-indigo-600 font-medium hover:text-indigo-700 transition duration-300"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a href="#" className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-l-md text-gray-700 hover:bg-gray-50">
                Previous
              </a>
              <a href="#" className="px-4 py-2 bg-white border-t border-b border-gray-300 text-sm font-medium text-indigo-600">
                1
              </a>
              <a href="#" className="px-4 py-2 bg-white border-t border-b border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </a>
              <a href="#" className="px-4 py-2 bg-white border-t border-b border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </a>
              <a href="#" className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 hover:bg-gray-50">
                Next
              </a>
            </nav>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full p-2 pr-10 border border-gray-300 rounded-md"
              />
              <button className="absolute right-2 top-2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <a href="#" className="flex justify-between text-gray-600 hover:text-indigo-600 transition duration-300">
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-500 rounded-full px-2 text-xs">
                      {category.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
            <div className="space-y-4">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex items-center gap-3">
                  <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h4 className="font-medium text-sm">{post.title}</h4>
                    <p className="text-gray-500 text-xs">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">Get the latest fashion tips and trends delivered to your inbox.</p>
            <form>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full p-2 border border-gray-300 rounded-md mb-3"
              />
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 