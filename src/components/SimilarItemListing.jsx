import React from "react";
import ProductCard from "./ProductCard";

const SimilarItemListing = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginTop: "10px" }}>
      <h2>Similar Items</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default SimilarItemListing;
