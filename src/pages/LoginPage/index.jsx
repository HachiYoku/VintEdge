import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/pages/LoginPage.css";

const { Title, Text } = Typography;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const success = login(values.email, values.password);
    if (success) {
      message.success("Logged in successfully!");
      navigate("/");
    } else {
      message.error("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-info">
        <img src="/fav.png" alt="" />
        <h1 className="login-hero-text">
          Welcome Back to <span>VintEdge</span>
        </h1>
        <p className="login-sub-text">
          Log in to continue your sustainable shopping journey.
        </p>
      </div>
      <div className="login-container">
        <Title level={2} className="login-title">
          Login
        </Title>
        <Text className="login-subtitle">Explore VintEdge </Text>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#ff6431" }} />}
              placeholder="your email"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#ff6431" }} />}
              placeholder="your password"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="login-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <p className="text-end mt-2">
          <Link to="/forgot_password" className="text-decoration-none ">
            Forgot Password?
          </Link>
        </p>

        <div className="login-footer">
          <Text>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
