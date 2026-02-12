import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const VerifyEmailFailed = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="error"
      title="Email Verification Failed"
      subTitle="The verification link is invalid or has expired."
      extra={[
        <Button
          type="primary"
          key="resend"
          style={{
            backgroundColor: "#ed6634",
            borderColor: "#ed6634",
          }}
          onClick={() => navigate("/resend-verification")}
        >
          Resend Verification Email
        </Button>,
        <Button key="login" onClick={() => navigate("/login")}>
          Back to Login
        </Button>,
      ]}
    />
  );
};

export default VerifyEmailFailed;
