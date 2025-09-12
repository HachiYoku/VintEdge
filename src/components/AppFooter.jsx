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
    <Footer className="app-footer">
      <Row gutter={[32, 32]} justify="space-between">
        {/* Logo + Description */}
        <Col xs={24} sm={12} md={6}>
          <h3>VintEdge</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam</p>
          <div style={{ fontSize: "18px" }}>
            <FacebookOutlined />
            <TwitterOutlined />
            <InstagramOutlined />
            <LinkedinOutlined />
            <YoutubeOutlined />
          </div>
        </Col>

        {/* Product */}
        <Col xs={12} sm={6} md={4}>
          <h4>Product</h4>
          <ul>
            <li>Features</li>
            <li>Pricing</li>
            <li>Case studies</li>
            <li>Reviews</li>
            <li>Updates</li>
          </ul>
        </Col>

        {/* Company */}
        <Col xs={12} sm={6} md={4}>
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Contact us</li>
            <li>Careers</li>
            <li>Culture</li>
            <li>Blog</li>
          </ul>
        </Col>

        {/* Support */}
        <Col xs={12} sm={6} md={4}>
          <h4>Support</h4>
          <ul>
            <li>Getting started</li>
            <li>Help center</li>
            <li>Server status</li>
            <li>Report a bug</li>
            <li>Chat support</li>
          </ul>
        </Col>

        {/* Contact */}
        <Col xs={12} sm={6} md={6}>
          <h4>Contact us</h4>
          <ul>
            <li>
              <MailOutlined /> VintEdge.com
            </li>
            <li>
              <PhoneOutlined /> (061) 687 - 5892
            </li>
            <li>
              <EnvironmentOutlined />
              333 Tha Sut, Amphoe Mueang Chiang Rai,
              <br />
              Chang Wat Chiang Rai 57100
            </li>
          </ul>
        </Col>
      </Row>

      <hr style={{ borderColor: "rgba(0,0,0,0.2)" }} />
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        © {new Date().getFullYear()} VintEdge. All Rights Reserved |{" "}
        <a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy</a>
      </div>
    </Footer>
  );
};

export default AppFooter;
