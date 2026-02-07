import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/components/OrderButtons.css";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Order Placed Successfully 🎉"
      subTitle="Thank you for your purchase. Your order is being processed."
      extra={[
        <Button
          key="home"
          type="primary"
          style={{
            backgroundColor: "#ed6634",
            borderColor: "#ed6634",
          }}
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>,
        <Button
          key="orders"
          className="secondary-orange-btn"
          onClick={() => navigate("/history")}
        >
          View Order History
        </Button>,
      ]}
    />
  );
};

export default OrderConfirmationPage;
