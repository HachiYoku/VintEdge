import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (category === "All Products") {
      navigate("/search");
    } else {
      navigate(`/search?query=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "150px",
        height: "100px",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0, // keeps same size in row
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {image ? (
        <img
          src={image}
          alt={category}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F8F3F0",
            fontSize: "16px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {category}
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
