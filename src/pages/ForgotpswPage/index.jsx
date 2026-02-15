import React, { useState } from "react";
import { Typography, message, Button, Input, Form } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../styles/pages/LoginPage.css";
import api from "../../api/client";

const { Title, Text } = Typography;

const ForgotPswPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", {
        email: values.email,
      });
      message.success(res.data.message || "Reset link sent to your email");
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Hero Section */}
      <div className="login-info">
        <img src="/fav.png" alt="logo" />
        <h1 className="login-hero-text">
          Forgot your <span>Password?</span>
        </h1>
        <p className="login-sub-text">
          Enter your registered email to receive a reset link.
        </p>
      </div>

      {/* Form Section */}
      <div className="login-container">
        <Title level={2} className="login-title">
          Forgot Password
        </Title>
        <Text className="login-subtitle">Enter your email below</Text>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#ff6431" }} />}
              placeholder="Registered Email"
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
              loading={loading}
              className="login-button"
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center mt-2">
          Remembered your password?{" "}
          <Link to="/login" className="text-decoration-none " style={{ color: "#ff6431" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPswPage;
