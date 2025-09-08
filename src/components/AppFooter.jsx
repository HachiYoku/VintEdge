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
          <h3>🌱 Eco Exchange</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam</p>
          <div style={{ fontSize: "18px" }}>
            <FacebookOutlined className="me-3" />
            <TwitterOutlined className="me-3" />
            <InstagramOutlined className="me-3" />
            <LinkedinOutlined className="me-3" />
            <YoutubeOutlined />
          </div>
        </Col>

        {/* Product */}
        <Col xs={12} sm={6} md={4}>
          <h4>Product</h4>
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
          <h4>Company</h4>
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
          <h4>Support</h4>
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
          <h4>Contacts us</h4>
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

      <hr />
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        © 2024 VintEdge. All Rights Reserved |{" "}
        <a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy</a>
      </div>
    </Footer>
  );
};

export default AppFooter;
