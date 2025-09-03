import React from "react";
import { Card, Button, Typography, Space, Checkbox } from "antd";
import { useCart } from "../context/CartContext";

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
    <Card
      title={
        <Space>
          <Checkbox
            checked={selected}
            onChange={(e) => onSelectChange(item.id, e.target.checked)}
          />
          <span>{item.title}</span>
        </Space>
      }
      extra={<Text strong>${(item.price * item.quantity).toFixed(2)}</Text>}
      cover={
        <img
          alt={item.title}
          src={item.image}
          style={{ height: 200, objectFit: "contain" }}
        />
      }
    >
      <p>Price: ${item.price}</p>
      <p>Stock: {item.rating?.count ?? "N/A"}</p>

      <Space>
        <Button onClick={handleDecrease} disabled={item.quantity <= 1}>
          −
        </Button>
        <Text>{item.quantity}</Text>
        <Button type="primary" onClick={handleIncrease}>
          +
        </Button>
      </Space>
    </Card>
  );
};

export default CartItemCard;
