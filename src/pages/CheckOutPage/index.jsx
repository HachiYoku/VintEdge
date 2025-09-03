import React from "react";
import { useLocation } from "react-router-dom";
import { List, Card, Typography } from "antd";

const { Title, Text } = Typography;

const CheckoutPage = () => {
  const location = useLocation();
  const checkoutItems = location.state?.checkoutItems || [];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Checkout</Title>

      {checkoutItems.length === 0 ? (
        <Text>No items selected for checkout</Text>
      ) : (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={checkoutItems}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.title}
                extra={<Text strong>${item.price * item.quantity}</Text>}
                cover={
                  <img
                    alt={item.title}
                    src={item.image}
                    style={{ height: 200, objectFit: "contain" }}
                  />
                }
              >
                <p>Quantity: {item.quantity}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
