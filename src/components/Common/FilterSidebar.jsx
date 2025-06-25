import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import categories from "../../data/categories";

const FilterSidebar = ({ 
  filters, 
  setFilters, 
  isMobile = false,
  mobileOpen = false, 
  setMobileOpen = () => {},
  resetFilters = () => {},
  applyFilters = () => {} 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    size: false,
    color: false,
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Handle category filter change
  const handleCategoryChange = (categoryId, subcategoryId = null) => {
    let updatedCategories;

    if (subcategoryId) {
      // If this is a subcategory
      const subcategoryKey = `${categoryId}_${subcategoryId}`;
      if (filters.subcategories.includes(subcategoryKey)) {
        updatedCategories = {
          categories: filters.categories,
          subcategories: filters.subcategories.filter((item) => item !== subcategoryKey),
        };
      } else {
        updatedCategories = {
          categories: 
            filters.categories.includes(categoryId) 
              ? filters.categories 
              : [...filters.categories, categoryId],
          subcategories: [...filters.subcategories, subcategoryKey],
        };
      }
    } else {
      // If this is a main category
      if (filters.categories.includes(categoryId)) {
        updatedCategories = {
          categories: filters.categories.filter((item) => item !== categoryId),
          subcategories: filters.subcategories.filter((item) => !item.startsWith(`${categoryId}_`)),
        };
      } else {
        updatedCategories = {
          categories: [...filters.categories, categoryId],
          subcategories: filters.subcategories,
        };
      }
    }

    setFilters({
      ...filters,
      ...updatedCategories
    });
  };

  // Handle price range changes
  const handlePriceChange = (e, type) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    setFilters({
      ...filters,
      price: {
        ...filters.price,
        [type]: value,
      },
    });
  };

  // Handle size filter change
  const handleSizeChange = (size) => {
    if (filters.sizes.includes(size)) {
      setFilters({
        ...filters,
        sizes: filters.sizes.filter((s) => s !== size),
      });
    } else {
      setFilters({
        ...filters,
        sizes: [...filters.sizes, size],
      });
    }
  };

  // Handle color filter change
  const handleColorChange = (color) => {
    if (filters.colors.includes(color)) {
      setFilters({
        ...filters,
        colors: filters.colors.filter((c) => c !== color),
      });
    } else {
      setFilters({
        ...filters,
        colors: [...filters.colors, color],
      });
    }
  };

  // List of common sizes
  const sizeOptions = [
    { id: 'XS', label: 'XS' },
    { id: 'S', label: 'S' },
    { id: 'M', label: 'M' },
    { id: 'L', label: 'L' },
    { id: 'XL', label: 'XL' },
    { id: 'XXL', label: 'XXL' },
    { id: '30', label: '30' },
    { id: '32', label: '32' },
    { id: '34', label: '34' },
    { id: '36', label: '36' },
    { id: '38', label: '38' },
    { id: '40', label: '40' },
  ];

  // List of common colors
  const colorOptions = [
    { id: 'black', label: 'Black', color: '#000000' },
    { id: 'white', label: 'White', color: '#FFFFFF' },
    { id: 'red', label: 'Red', color: '#FF0000' },
    { id: 'blue', label: 'Blue', color: '#0000FF' },
    { id: 'green', label: 'Green', color: '#008000' },
    { id: 'yellow', label: 'Yellow', color: '#FFFF00' },
    { id: 'purple', label: 'Purple', color: '#800080' },
    { id: 'pink', label: 'Pink', color: '#FFC0CB' },
    { id: 'gray', label: 'Gray', color: '#808080' },
    { id: 'brown', label: 'Brown', color: '#A52A2A' },
    { id: 'navy', label: 'Navy', color: '#000080' },
    { id: 'orange', label: 'Orange', color: '#FFA500' },
  ];

  // Filter section component with toggle
  const FilterSection = ({ title, expanded, onToggle, children }) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-primary"
      >
        {title}
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Sidebar content
  const sidebarContent = (
    <div className="p-4">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary flex items-center">
            <FaFilter className="mr-2" /> Filters
          </h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-500 hover:text-primary"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Categories Filter */}
      <FilterSection
        title="Categories"
        expanded={expandedSections.category}
        onToggle={() => toggleSection("category")}
      >
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="mb-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="ml-2 text-gray-700 capitalize"
                >
                  {category.name}
                </label>
              </div>

              {/* Subcategories */}
              {category.subcategories && filters.categories.includes(category.id) && (
                <ul className="ml-6 mt-2 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`subcategory-${category.id}-${subcategory.id}`}
                          checked={filters.subcategories.includes(`${category.id}_${subcategory.id}`)}
                          onChange={() => handleCategoryChange(category.id, subcategory.id)}
                          className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                        />
                        <label
                          htmlFor={`subcategory-${category.id}-${subcategory.id}`}
                          className="ml-2 text-gray-600"
                        >
                          {subcategory.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        expanded={expandedSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
                Min ($)
              </label>
              <input
                type="number"
                id="min-price"
                min="0"
                value={filters.price.min === "" ? "" : filters.price.min}
                onChange={(e) => handlePriceChange(e, "min")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
                Max ($)
              </label>
              <input
                type="number"
                id="max-price"
                min="0"
                value={filters.price.max === "" ? "" : filters.price.max}
                onChange={(e) => handlePriceChange(e, "max")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              />
            </div>
          </div>

          <div className="mt-2">
            <button
              onClick={() => {
                if (filters.price.min !== "" && filters.price.max !== "") {
                  applyFilters();
                }
              }}
              className="w-full py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Apply Price Filter
            </button>
          </div>
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection
        title="Size"
        expanded={expandedSections.size}
        onToggle={() => toggleSection("size")}
      >
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size.id}
              onClick={() => handleSizeChange(size.id)}
              className={`px-3 py-1 rounded-md text-sm border ${
                filters.sizes.includes(size.id)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary"
              } transition-colors`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Color Filter */}
      <FilterSection
        title="Color"
        expanded={expandedSections.color}
        onToggle={() => toggleSection("color")}
      >
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((colorOption) => (
            <div
              key={colorOption.id}
              onClick={() => handleColorChange(colorOption.id)}
              className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border-2 ${
                filters.colors.includes(colorOption.id)
                  ? "border-accent"
                  : "border-transparent hover:border-gray-300"
              }`}
              title={colorOption.label}
            >
              <span
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: colorOption.color }}
              ></span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Mobile Action Buttons */}
      {isMobile && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={resetFilters}
            className="py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Reset All
          </button>
          <button
            onClick={() => {
              applyFilters();
              setMobileOpen(false);
            }}
            className="py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );

  // Mobile Sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md"
        >
          <FaFilter className="mr-2" /> Filters
        </button>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setMobileOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed right-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto"
              >
                {sidebarContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop Sidebar
  return <aside className="w-full sticky top-24">{sidebarContent}</aside>;
};

export default FilterSidebar; 