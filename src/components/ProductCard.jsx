import React from "react";
import { Card, Button, Image, message } from "antd";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/ProductCard.css";
import "../styles/components/Cards.css";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isOwner =
    user &&
    String(product.user?._id || product.userId || product.user) ===
      String(user._id || user.id);

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
        <span
          className={`condition-tag ${
            product.condition
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/\//g, "-") || "unknown"
          }`}
        >
          {product.condition || "Unknown"}
        </span>
        <div className="product-info">
          <p className="product-stock">
            Stock: {product.quantity ?? product.rating?.count ?? product.stock ?? 0}
          </p>
          <p className="product-price">
            {product.price} {product.currency || "MMK"}
          </p>
        </div>

        {isOwner ? (
          <span className="product-owner-badge">Your product</span>
        ) : (
          <Button
            className="cart-btn"
            type="primary"
            icon={<FaShoppingCart />}
            onClick={async (e) => {
              e.stopPropagation();
              try {
                await addToCart(product);
                message.success({
                  content: `${product.title} added to cart!`,
                  duration: 2,
                });
              } catch (err) {
                message.error(
                  err.response?.data?.message || "Failed to add to cart"
                );
              }
            }}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
