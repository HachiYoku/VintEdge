import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const VerifyEmailSuccess = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Email Verified Successfully 🎉"
      subTitle="Your email has been verified. You can now log in to your account."
      extra={[
        <Button
          type="primary"
          key="login"
          style={{
            backgroundColor: "#ed6634",
            borderColor: "#ed6634",
          }}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>,
      ]}
    />
  );
};

export default VerifyEmailSuccess;
