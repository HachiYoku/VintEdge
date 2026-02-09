import React from "react";
import { Card, Button, Typography, Space, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";
import "../styles/components/CartItemCard.css"; // import the external CSS
import "../styles/components/Cards.css";

const { Text } = Typography;

const CartItemCard = ({ item, selected, onSelectChange }) => {
  const { updateCartItemCount, removeFromCart } = useCart();

  const stock =
    item.stock ?? item.product?.quantity ?? item.rating?.count ?? null;
  const maxReached = stock !== null && item.quantity >= stock;

  const handleIncrease = async () => {
    if (maxReached) return;
    try {
      await updateCartItemCount(item.quantity + 1, item.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrease = async () => {
    if (item.quantity > 1) {
      try {
        await updateCartItemCount(item.quantity - 1, item.id);
      } catch (err) {
        console.error(err);
      }
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
            Stock: {stock ?? "N/A"}
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
            <Button className="qty-btn" onClick={handleIncrease} disabled={maxReached}>
              +
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeFromCart(item.id)}
              aria-label="Remove item"
              title="Remove item"
            />
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;
