import React from "react";
import { Card, Button, Typography } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/components/Cards.css";
import "../styles/components/PopularItemCard.css";

const { Title, Paragraph } = Typography;

const PopularItemCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="popular-item-card-container">
      <Card hoverable className="popular-item-card">
        <div className="popular-item-card-inner">
          <div className="popular-item-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="popular-item-content">
            <Title level={3} className="popular-item-title">
              {product.title}
            </Title>
            <Paragraph
              className="popular-item-description"
              ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
            >
              {product.description}
            </Paragraph>
            <Button
              type="primary"
              className="popular-item-button"
              onClick={handleViewDetails}
            >
              <FaInfoCircle /> View Details
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PopularItemCard;
