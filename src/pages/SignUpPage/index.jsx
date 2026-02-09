import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/pages/SignUpPage.css";

const { Title, Text } = Typography;

const SignUpPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    try {
      const res = await signup(values.name, values.email, values.password);
      message.success(res?.message || "Account created successfully!");
      navigate("/login");
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-info">
        <img src="/fav.png" alt="" />
        <h1 className="hero-text">
          Create Your <span>VintEdge</span> Account
        </h1>
        <p className="sub-text">
          Join a trusted community marketplace for sustainable shopping.
        </p>
      </div>
      <div className="signup-container">
        <Title level={2} className="signup-title">
          Sign Up
        </Title>
        <Text className="signup-subtitle">Join VintEdge Community!</Text>

        <Form layout="vertical" onFinish={handleSignUp}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please enter your name!" },
              { min: 5, message: "Username must be at least 5 characters!" },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#ff6431" }} />}
              placeholder="Username"
              size="large"
              className="signup-input"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#ff6431" }} />}
              placeholder="Your email"
              size="large"
              className="signup-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 5, message: "Password must be at least 5 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#ff6431" }} />}
              placeholder="Your password"
              size="large"
              className="signup-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="signup-button"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="signup-footer">
          <Text>
            Already have an account? <Link to="/login">Login</Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
