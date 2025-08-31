import React from "react";
import { Layout, Space } from "antd";
import BurgerMenu from "./BurgerMenu";
import { Link } from "react-router-dom";
import { TbUserSquare } from "react-icons/tb";
import { PiShoppingCartBold } from "react-icons/pi";

const { Header } = Layout;
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#fff",
  height: "50px",
  paddingTop: "10px",
  backgroundColor: "#c5bebeff",
};

// Define the styles for the icons
const iconStyle = {
  fontSize: "24px",
  color: "#fff",
};

const AppHeader = () => {
  return (
    <Header style={headerStyle}>
      <BurgerMenu iconStyle={iconStyle} />
      <Space size="large">
        <Link to="/cart">
          <PiShoppingCartBold style={{ fontSize: "24px", color: "#fff" }} />
        </Link>
        <Link to="/profile">
          <TbUserSquare style={{ fontSize: "24px", color: "#fff" }} />
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;
