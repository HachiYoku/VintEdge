import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (category === "All Products") {
      navigate('/search');
    } else {
      navigate(`/search?query=${encodeURIComponent(category)}`);
    }
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      style={{ width: 200, textAlign: 'center', cursor: 'pointer' }}
    >
      <h3>{category}</h3>
    </Card>
  );
};

export default CategoryCard;
