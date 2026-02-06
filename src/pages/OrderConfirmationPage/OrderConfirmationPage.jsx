import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Order Placed Successfully 🎉"
      subTitle="Thank you for your purchase. Your order is being processed."
      extra={[
        <Button type="primary" key="home" onClick={() => navigate("/")}>
          Go Home
        </Button>,
        <Button key="orders" onClick={() => navigate("/history")}>
          View Order History
        </Button>,
      ]}
    />
  );
};

export default OrderConfirmationPage;
