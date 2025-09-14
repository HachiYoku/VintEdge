import React from "react";
import { Card, Button, Typography, Space, Checkbox } from "antd";
import { useCart } from "../context/CartContext";
import "../styles/components/CartItemCard.css"; // import the external CSS
import "../styles/components/Cards.css";

const { Text } = Typography;

const CartItemCard = ({ item, selected, onSelectChange }) => {
  const { updateCartItemCount } = useCart();

  const handleIncrease = () => {
    updateCartItemCount(item.quantity + 1, item.id);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateCartItemCount(item.quantity - 1, item.id);
    }
  };

  return (
    <Card className="cart-card" styles={{
    body: { padding: 5 },
    }}>
      <div className="cart-card-row">
        {/* Checkbox */}
        <Checkbox
          checked={selected}
          onChange={(e) => onSelectChange(item.id, e.target.checked)}
          className="cart-checkbox"
        />

        {/* Image */}
        <img alt={item.title} src={item.image} className="cart-card-image" />

        {/* Middle Section */}
        <div className="cart-card-details">
          <Text strong className="cart-card-title">
            {item.title}
          </Text>
          <Text type="secondary" className="cart-card-category">
            {item.category ?? "No category"}
          </Text>
          <Text className="cart-card-stock">
            Stock: {item.rating?.count ?? "N/A"}
          </Text>
        </div>

        {/* Right Section */}
        <div className="cart-card-right">
          <Text strong className="cart-card-price">
            ${(item.price * item.quantity).toFixed(2)}
          </Text>

          <Space>
            <Button
              className="qty-btn"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              −
            </Button>
            <Text>{item.quantity}</Text>
            <Button className="qty-btn" onClick={handleIncrease}>
              +
            </Button>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;
