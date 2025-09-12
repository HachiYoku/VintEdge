import React from "react";
import { useOutletContext } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import "../styles/components/CategoryListing.css";

const CategoryListing = () => {
  const { categories } = useOutletContext();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center",
        gap: "10px",
        padding: "20px",
        backgroundColor: "#F8F3F0",
        borderRadius: "12px",
        overflowX: "auto",
        margin: "20px",
        width: "calc(100% - 40px)",
        marginTop: "70px",
        marginBottom: "40px",
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
