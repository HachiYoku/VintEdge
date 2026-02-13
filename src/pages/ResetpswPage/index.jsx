import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/LoginPage.css";
import api from "../../api/client";

const { Title, Text } = Typography;

const ResetPswPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(`/auth/reset-password/${token}`, {
        password,
      });

      message.success(res.data.message || "Password reset successfully!");
      navigate("/login");
    } catch (err) {
      message.error(err.response?.data?.message || "Reset failed");
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
          Reset Your <span>Password</span>
        </h1>
        <p className="login-sub-text">Enter a new password for your account.</p>
      </div>

      {/* Form Section */}
      <div className="login-container">
        <Title level={2} className="login-title">
          Reset Password
        </Title>
        <Text className="login-subtitle">Choose a strong new password</Text>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your new password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#ff6431" }} />}
              placeholder="New Password"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your new password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#ff6431" }} />}
              placeholder="Confirm New Password"
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
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center mt-2">
          Remembered your password?{" "}
          <a href="/login" className="text-decoration-none">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPswPage;
