import React from "react";
import { Form, Input, Button, Typography, message, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const { Title, Text } = Typography;

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

<<<<<<< HEAD
  // ✅ Show spinner while checking localStorage
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin size="large" />
      </div>
    );
  }
=======
  const primaryColor = "#ff6431ed";

  const inputStyle = {
    background: "transparent",
    border: "none",
    borderBottom: `2px solid ${primaryColor}`,
    borderRadius: 0,
    boxShadow: "none",
    outline: "none",
    color: "#333",
  };
>>>>>>> c573f0d (designUpdateVy)

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F9F9F9",
        padding: "20px",
      }}
    >
<<<<<<< HEAD
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
=======
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: 4,
            fontWeight: "bold",
            color: primaryColor,
            textTransform: "uppercase",
          }}
        >
          Login
        </Title>
        <Text
          style={{
            display: "block",
            marginBottom: 32,
            color: "#888",
          }}
        >
          To continue
        </Text>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: primaryColor }} />}
              placeholder="your email"
              size="large"
              style={inputStyle}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: primaryColor }} />}
              placeholder="your password"
              size="large"
              style={inputStyle}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                borderRadius: 6,
                background: primaryColor,
                border: "none",
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 16 }}>
          <Text style={{ color: "#555" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: primaryColor, fontWeight: 500 }}>
              Sign Up
            </Link>
          </Text>
        </div>
>>>>>>> c573f0d (designUpdateVy)
      </div>
    </div>
  );
};

export default LoginPage;
