import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { List, Typography, Button } from "antd";
import CartItemCard from "../../components/CartItemCard";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CartPage = () => {
  const { cart, clearAllCartItem, getTotalAmount } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleSelectChange = (id, checked) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleCheckout = () => {
    const checkoutItems = cart.filter((item) => selectedItems.includes(item.id));
    navigate("/checkout", { state: { checkoutItems } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Your Cart</Title>

      {cart.length === 0 ? (
        <Text type="secondary">Your cart is empty 🛒</Text>
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <CartItemCard
                  item={item}
                  selected={selectedItems.includes(item.id)}
                  onSelectChange={handleSelectChange}
                />
              </List.Item>
            )}
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={4}>Total: ${getTotalAmount()}</Title>

            <div style={{ display: "flex", gap: "10px" }}>
              <Button danger onClick={clearAllCartItem}>
                Clear Cart
              </Button>
              <Button
                type="primary"
                disabled={selectedItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout Selected
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
