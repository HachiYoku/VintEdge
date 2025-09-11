import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const { Title, Text } = Typography;

const SignUpPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = (values) => {
    const success = signup(values.name, values.email, values.password);
    if (success) {
      message.success("Account created successfully!");
      navigate("/login");
    } else {
      message.error("Failed to create account");
    }
  };

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
          Sign Up
        </Title>
        <Text style={{ display: "block", marginBottom: 32, color: "#888" }}>
          For your account
        </Text>

        <Form layout="vertical" onFinish={handleSignUp}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please enter your name!" },
              { min: 5, message: "Username must be at least 5 characters!" },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: primaryColor }} />}
              placeholder="username"
              size="large"
              style={inputStyle}
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
              prefix={<MailOutlined style={{ color: primaryColor }} />}
              placeholder="your email"
              size="large"
              style={inputStyle}
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 16 }}>
          <Text style={{ color: "#555" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: primaryColor, fontWeight: 500 }}>
              Login
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
