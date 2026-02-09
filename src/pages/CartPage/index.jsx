import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { List, Typography, Button } from "antd";
import CartItemCard from "../../components/CartItemCard";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/CartPage.css"; // import css file

const { Title, Text } = Typography;

const CartPage = () => {
  const { cart, clearAllCartItem } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleSelectChange = (id, checked) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, String(id)]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== String(id)));
    }
  };

  useEffect(() => {
    setSelectedItems((prev) =>
      prev.filter((id) =>
        cart.some((item) => String(item.id) === String(id))
      )
    );
  }, [cart]);

  const handleCheckout = () => {
    const checkoutItems = cart.filter((item) =>
      selectedItems.includes(String(item.id))
    );
    if (checkoutItems.length === 0) return;
    navigate("/checkout", { state: { checkoutItems } });
  };

  return (
    <div className="cart-page">
      <Title className="cart-title" level={2}>
        Shopping Cart( {cart.length} )
      </Title>

      {cart.length === 0 ? (
        <Text className="empty-cart">Your cart is empty 🛒</Text>
      ) : (
        <>
          <List
            grid={{
              gutter: 16,
              column: 1,
            }}
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
            className="cart-list"
          />

          <div className="cart-footer">
            <div className="cart-actions">
              <Button danger onClick={clearAllCartItem} className="clear-btn">
                Clear Cart
              </Button>
              <Button
                type="primary"
                disabled={selectedItems.length === 0}
                onClick={handleCheckout}
                className="checkout-btn"
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
