import React, { useState } from "react";
import { Layout, Space, Input } from "antd";
import BurgerMenu from "./BurgerMenu";
import { Link, useNavigate } from "react-router-dom";
import { TbUserSquare } from "react-icons/tb";
import { PiShoppingCartBold } from "react-icons/pi";

const { Header } = Layout;

const iconStyle = {
  fontSize: "24px",
  color: "#fff",
};

const AppHeader = ({ products }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "#c5bebeff",
      }}
    >
      <BurgerMenu iconStyle={iconStyle} />

      <Space size="large">
        <Link to="/cart">
          <PiShoppingCartBold style={iconStyle} />
        </Link>
        <Link to="/profile">
          <TbUserSquare style={iconStyle} />
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;
