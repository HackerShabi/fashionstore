import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";
import categories from "../../data/categories";

const Breadcrumb = ({ product, category, extraItems }) => {
  const location = useLocation();
  
  // Generate breadcrumb items based on location and props
  const breadcrumbItems = useMemo(() => {
    const items = [
      {
        name: "Home",
        path: "/",
        icon: <FaHome className="inline-block mr-1" />,
      },
    ];

    // Handle shop page
    if (location.pathname.includes("/shop")) {
      items.push({
        name: "Shop",
        path: "/shop",
      });
    }

    // Handle category
    if (category) {
      const categoryData = categories.find((cat) => cat.id === category);
      if (categoryData) {
        items.push({
          name: categoryData.name,
          path: `/shop/${categoryData.id}`,
        });
      }
    }

    // Handle subcategory from query params
    const params = new URLSearchParams(location.search);
    const subcategory = params.get("subcategory");
    if (subcategory && category) {
      const categoryData = categories.find((cat) => cat.id === category);
      if (categoryData) {
        const subcategoryData = categoryData.subcategories.find((sub) => sub.id === subcategory);
        if (subcategoryData) {
          items.push({
            name: subcategoryData.name,
            path: `/shop/${category}?subcategory=${subcategory}`,
          });
        }
      }
    }

    // Handle product page
    if (product) {
      items.push({
        name: product.name,
        path: `/product/${product.id}`,
        isLast: true,
      });
    }

    // Add any extra items
    if (extraItems && extraItems.length) {
      extraItems.forEach((item) => {
        items.push({
          ...item,
          isLast: false,
        });
      });
    }

    // Mark the last item
    if (items.length) {
      items[items.length - 1].isLast = true;
    }

    return items;
  }, [location.pathname, location.search, category, product, extraItems]);

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-lightGray py-4 mb-6">
      <div className="container mx-auto px-4">
        <ol className="flex flex-wrap items-center text-sm">
          {breadcrumbItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center ${
                item.isLast ? "text-accent font-medium" : "text-gray-500"
              }`}
            >
              {index > 0 && (
                <FaChevronRight className="mx-2 text-gray-400 text-xs" />
              )}
              
              {item.isLast ? (
                <span className="truncate max-w-[200px]">{item.icon}{item.name}</span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-accent transition-colors truncate max-w-[200px]"
                >
                  {item.icon}{item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb; 