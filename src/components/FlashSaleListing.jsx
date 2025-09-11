import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../styles/components/FlashSaleListing.css";
import { Button } from "antd";

const FlashSaleListing = () => {
  const { products } = useOutletContext();
  const [visibleItems, setVisibleItems] = useState(8);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "2rem",
          color: "#333",
        }}
      >
        Flash Sale
      </h1>
      <div className="flash-sale-container">
        {products.slice(0, visibleItems).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visibleItems < products.length && (
        <div style={{ textAlign: "center", marginBottom: "50px " }}>
          <Button
            className="flash-sale-button"
            type="primary"
            onClick={loadMoreItems}
            style={{
              background: "#FF6530",
              border: "none",
              marginTop: "10px",
              padding: "20px 24px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlashSaleListing;
