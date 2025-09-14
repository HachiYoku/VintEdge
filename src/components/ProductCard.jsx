import React from "react";
import { Card, Button, Image, message } from "antd";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/components/ProductCard.css";
import "../styles/components/Cards.css";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      className="product-card"
      cover={
        <Image.PreviewGroup>
          <Image
            alt={product.title}
            src={product.image}
            className="product-image"
          />
        </Image.PreviewGroup>
      }
    >
      <div onClick={handleCardClick} className="product-body">
        <Meta title={<span className="product-title">{product.title}</span>} />
        <div className="product-info">
          <p className="product-stock">Stock: {product.rating?.count || 0}</p>
          <p className="product-price">${product.price}</p>
        </div>

        <Button
          className="cart-btn"
          type="primary"
          icon={<FaShoppingCart />}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
            message.success({
              content: `${product.title} added to cart!`,
              duration: 2, // seconds
            });
          }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
