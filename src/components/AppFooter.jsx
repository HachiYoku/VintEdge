import React from "react";
import "../styles/components/AppFooter.css";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      className="app-footer"
      style={{ backgroundColor: "#D6B587", color: "#2c2c2c" }}
    >
      <Row gutter={[32, 32]} justify="space-between">
        {/* Logo + Description */}
        <Col xs={24} sm={12} md={6}>
          <h3 style={{ color: "#2c2c2c" }}>VintEdge</h3>
          <p style={{ color: "#333" }}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
          </p>
          <div style={{ fontSize: "18px", color: "#2c2c2c" }}>
            <FacebookOutlined className="me-3" />
            <TwitterOutlined className="me-3" />
            <InstagramOutlined className="me-3" />
            <LinkedinOutlined className="me-3" />
            <YoutubeOutlined />
          </div>
        </Col>

        {/* Product */}
        <Col xs={12} sm={6} md={4}>
          <h4 style={{ color: "#2c2c2c" }}>Product</h4>
          <ul className="list-unstyled">
            <li>Features</li>
            <li>Pricing</li>
            <li>Case studies</li>
            <li>Reviews</li>
            <li>Updates</li>
          </ul>
        </Col>

        {/* Company */}
        <Col xs={12} sm={6} md={4}>
          <h4 style={{ color: "#2c2c2c" }}>Company</h4>
          <ul className="list-unstyled">
            <li>About</li>
            <li>Contact us</li>
            <li>Careers</li>
            <li>Culture</li>
            <li>Blog</li>
          </ul>
        </Col>

        {/* Support */}
        <Col xs={12} sm={6} md={4}>
          <h4 style={{ color: "#2c2c2c" }}>Support</h4>
          <ul className="list-unstyled">
            <li>Getting started</li>
            <li>Help center</li>
            <li>Server status</li>
            <li>Report a bug</li>
            <li>Chat support</li>
          </ul>
        </Col>

        {/* Contact */}
        <Col xs={12} sm={6} md={6}>
          <h4 style={{ color: "#2c2c2c" }}>Contact us</h4>
          <ul className="list-unstyled">
            <li>
              <MailOutlined className="me-2" /> contact@ecoexchange.com
            </li>
            <li>
              <PhoneOutlined className="me-2" /> (061) 687 - 5892
            </li>
            <li>
              <EnvironmentOutlined className="me-2" />
              333 Tha Sut, Amphoe Mueang Chiang Rai,
              <br />
              Chang Wat Chiang Rai 57100
            </li>
          </ul>
        </Col>
      </Row>

      <hr style={{ borderColor: "rgba(0,0,0,0.2)" }} />
      <div style={{ textAlign: "center", marginTop: "10px", color: "#2c2c2c" }}>
        © {new Date().getFullYear()} VintEdge. All Rights Reserved |{" "}
        <a href="#" style={{ color: "#2c2c2c" }}>
          Terms and Conditions
        </a>{" "}
        |{" "}
        <a href="#" style={{ color: "#2c2c2c" }}>
          Privacy Policy
        </a>
      </div>
    </Footer>
  );
};

export default AppFooter;
