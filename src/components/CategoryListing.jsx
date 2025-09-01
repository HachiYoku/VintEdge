import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CategoryCard from './CategoryCard';

const CategoryListing = () => {
  const { categories } = useOutletContext();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, padding: 20 }}>
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
      <CategoryCard category="All Products" />
    </div>
  );
};

export default CategoryListing;
