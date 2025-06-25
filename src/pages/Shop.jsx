import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaFilter, FaSort } from "react-icons/fa";
import Breadcrumb from "../components/Layout/Breadcrumb";
import ProductCard from "../components/Common/ProductCard";
import FilterSidebar from "../components/Common/FilterSidebar";
import products from "../data/products";
import categories from "../data/categories";

const Shop = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");

  // State
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    price: { min: "", max: "" },
    sizes: [],
    colors: [],
  });
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Set filters when params change
  useEffect(() => {
    const newFilters = {
      categories: category ? [category] : [],
      subcategories: subcategory && category ? [`${category}_${subcategory}`] : [],
      price: { min: "", max: "" },
      sizes: [],
      colors: [],
    };
    setFilters(newFilters);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [category, subcategory, searchQuery]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    } else if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }
    if (filters.subcategories.length > 0) {
      filtered = filtered.filter(product =>
        filters.subcategories.some(sub => {
          const [cat, subcat] = sub.split("_");
          return product.category === cat && product.subCategory === subcat;
        })
      );
    }
    if (filters.price.min !== "") {
      filtered = filtered.filter(product => product.price >= parseFloat(filters.price.min));
    }
    if (filters.price.max !== "") {
      filtered = filtered.filter(product => product.price <= parseFloat(filters.price.max));
    }
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => product.sizes.some(size => filters.sizes.includes(size)));
    }
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => product.colors.some(color => filters.colors.includes(color)));
    }
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price); break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price); break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id); break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating); break;
      case "featured":
      default:
        filtered.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1)); break;
    }
    setDisplayProducts(filtered);
  }, [filters, sortBy, searchQuery]);

  // Breadcrumb
  const currentCategory = category ? categories.find(cat => cat.id === category) : null;
  const currentSubcategory = subcategory && currentCategory ? currentCategory.subcategories.find(sub => sub.id === subcategory) : null;
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
  ];
  if (currentCategory) {
    breadcrumbItems.push({ label: currentCategory.name, path: `/shop/${currentCategory.id}` });
    if (currentSubcategory) {
      breadcrumbItems.push({ label: currentSubcategory.name, path: `/shop/${currentCategory.id}/${currentSubcategory.id}` });
    }
  }
  if (searchQuery) {
    breadcrumbItems.push({ label: `Search: ${searchQuery}`, path: `/shop?search=${searchQuery}` });
  }

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      categories: category ? [category] : [],
      subcategories: subcategory && category ? [`${category}_${subcategory}`] : [],
      price: { min: "", max: "" },
      sizes: [],
      colors: [],
    });
  };
  const handleApplyFilters = () => setMobileFiltersOpen(false);

  return (
    <div className="pt-20">
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {searchQuery ? (
            <h1 className="text-3xl font-bold text-primary">Search Results: "{searchQuery}"</h1>
          ) : currentSubcategory ? (
            <h1 className="text-3xl font-bold text-primary">{currentSubcategory.name}</h1>
          ) : currentCategory ? (
            <h1 className="text-3xl font-bold text-primary">{currentCategory.name}</h1>
          ) : (
            <h1 className="text-3xl font-bold text-primary">All Products</h1>
          )}
          {currentCategory && !currentSubcategory && (
            <p className="text-gray-600 mt-2">{currentCategory.description}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="hidden md:block">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                resetFilters={handleResetFilters}
              />
            </div>
            <div className="md:hidden">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                isMobile={true}
                mobileOpen={mobileFiltersOpen}
                setMobileOpen={setMobileFiltersOpen}
                resetFilters={handleResetFilters}
                applyFilters={handleApplyFilters}
              />
            </div>
          </div>
          <div className="md:w-3/4">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">{displayProducts.length} Products</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="md:hidden">
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md"
                  >
                    <FaFilter className="mr-2" /> Filters
                  </button>
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FaSort className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg aspect-[3/4] animate-pulse"></div>
                ))}
              </div>
            ) : displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600 mb-4">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-accent transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 