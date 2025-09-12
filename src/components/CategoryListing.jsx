import React from "react";
import { useOutletContext } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import "../styles/components/CategoryListing.css";

const CategoryListing = () => {
  const { categories } = useOutletContext();

  return (
    <div className="category-listing">
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
      <CategoryCard category="All Products" />
    </div>
  );
};

export default CategoryListing;
