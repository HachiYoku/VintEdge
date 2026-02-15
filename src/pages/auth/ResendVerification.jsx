import React, { useState } from "react";
import { Typography, message, Button, Input, Form } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../styles/pages/LoginPage.css";
import api from "../../api/client";

const { Title, Text } = Typography;

const ResendVerification = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await api.post("/user/resend-verification", {
        email: values.email,
      });
      message.success(
        res.data?.message || "Verification email sent. Please check your inbox."
      );
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-info">
        <img src="/fav.png" alt="logo" />
        <h1 className="login-hero-text">
          Verify your <span>Email</span>
        </h1>
        <p className="login-sub-text">
          Enter your registered email to resend the verification link.
        </p>
      </div>

      <div className="login-container">
        <Title level={2} className="login-title">
          Resend Verification
        </Title>
        <Text className="login-subtitle">Check your inbox after submit</Text>

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
              Resend Verification Email
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center mt-2">
          Back to <Link to="/login" className="text-decoration-none ">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResendVerification;
