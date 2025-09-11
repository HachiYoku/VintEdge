import React from "react";
import { useOutletContext } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CategoryListing = () => {
  const { categories } = useOutletContext();

  return (
    <div
      style={{
        display: "flex",
        margin: "50px",
        justifyContent: "center",
        gap: "10px", // just space between images
        padding: "20px",
        backgroundColor: "#F8F3F0",
        borderRadius: "12px",
        overflowX: "auto", // allows scroll if too many
      }}
    >
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
      <CategoryCard category="All Products" />
    </div>
  );
};

export default CategoryListing;
