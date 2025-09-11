import React from "react";
import { Form, Input, Button, Typography, message, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

const LoginPage = () => {
  const { login, loading } = useAuth();
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

  // ✅ Show spinner while checking localStorage
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 32,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Login
      </Title>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Enter a valid email!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Login
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
