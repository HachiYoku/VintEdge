import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../../styles/pages/CheckoutPage.css";

const { Title, Text } = Typography;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutItems = location.state?.checkoutItems || [];

  // Calculate total price
  const totalPrice = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div className="checkout-container">
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/cart")}
        className="back-to-cart"
      >
        Back to Cart
      </Button>

      <Title level={2} className="checkout-title">
        Checkout
      </Title>

      {checkoutItems.length === 0 ? (
        <Text>No items selected for checkout</Text>
      ) : (
        <>
          {checkoutItems.map((item) => (
            <Card
              key={item.id}
              className="checkout-card"
              styles={{
                body: { padding: 0 },
              }}
            >
              <div className="checkout-row">
                {/* Image */}
                <img
                  alt={item.title}
                  src={item.image}
                  className="checkout-image"
                />

                {/* Details */}
                <div className="checkout-details">
                  <Text strong className="checkout-item-title">
                    {item.title}
                  </Text>
                  <Text type="secondary" className="checkout-item-qty">
                    Quantity: {item.quantity}
                  </Text>
                </div>

                {/* Price */}
                <div className="checkout-price">
                  <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
                </div>
              </div>
            </Card>
          ))}

          {/* ✅ Checkout Summary */}
          <div className="checkout-summary">
            <Title level={4} className="total">
              Total: ${totalPrice.toFixed(2)}
            </Title>
            <Button
              type="primary"
              size="large"
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Checkout Now
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
