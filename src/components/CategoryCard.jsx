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
    <button
      type="button"
      onClick={handleClick}
      className="category-card"
      aria-label={`Browse ${category}`}
    >
      {image ? (
        <img
          src={image}
          alt={category}
          className="category-card-image"
        />
      ) : (
        <span className="category-card-text">{category}</span>
      )}
    </button>
  );
};

export default CategoryCard;
