import React from "react";
import { Card, Button, Image } from "antd";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/components/ProductCard.css";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="product-card"
      cover={
        <div className="product-card-image-wrapper">
          <Image.PreviewGroup>
            <Image
              alt={product.title}
              src={product.image}
              className="product-card-image"
              preview={{ mask: <div>Click to Preview</div> }}
            />
          </Image.PreviewGroup>
        </div>
      }
      actions={[
        <Button
          type="primary"
          className="product-card-btn add-to-cart"
          icon={<FaShoppingCart />}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Buy Now
        </Button>,
        <Button
          type="default"
          className="product-card-btn view-details"
          icon={<FaInfoCircle />}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Details
        </Button>,
      ]}
    >
      <Meta title={product.title} className="product-card-title" />
      <div className="product-card-info">
        <span>Stock: {product.rating?.count || 0}</span>
        <span className="product-card-price">${product.price}</span>
      </div>
    </Card>
  );
};

export default ProductCard;
