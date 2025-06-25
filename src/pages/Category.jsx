import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Shop from "./Shop";
import categories from "../data/categories";

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  // Get the category data
  const categoryData = categories.find((c) => c.id === category);
  
  // Redirect to shop page if category doesn't exist
  useEffect(() => {
    if (!categoryData) {
      navigate("/shop", { replace: true });
    }
  }, [categoryData, navigate]);
  
  if (!categoryData) {
    return null;
  }
  
  return <Shop />;
};

export default Category; 