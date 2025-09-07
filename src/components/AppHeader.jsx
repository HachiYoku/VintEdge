import React, { useState, useEffect } from "react";
import { Layout, Space, Input, Badge } from "antd";
import ThemeToggle from "./ThemeToggle";
import BurgerMenu from "./BurgerMenu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TbUserSquare } from "react-icons/tb";
import { PiShoppingCartBold } from "react-icons/pi";
import { useCart } from "../context/CartContext";

const { Header } = Layout;

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#fff",
  height: "50px",
  paddingTop: "10px",
  backgroundColor: "#F7FBFC",
};

const iconStyle = {
  fontSize: "24px",
  color: "#fff",
};

const AppHeader = ({ products = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Pre-fill search input when on /search
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [location.search, initialQuery]);

  // Handle search
  const onSearch = (value) => {
    if (value.trim() === "") return;

    // Filter products by title if products are passed
    const filtered =
      products.length > 0
        ? products.filter((p) =>
            p.title.toLowerCase().includes(value.trim().toLowerCase())
          )
        : [];

    navigate("/search", {
      state: { results: filtered, query: value.trim() },
    });
  };

  return (
    <Header
      className="app-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "#c5bebeff",
        transition: "background-color 0.3s",
      }}
    >
      {/* Left: Burger menu */}
      <BurgerMenu iconStyle={iconStyle} />

      {/* Center: Search input */}
      <Input.Search
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={onSearch}
        enterButton
        style={{ maxWidth: 400 }}
      />

      {/* Right: Icons */}
      <Space size="large">
        <ThemeToggle />
        <Link to="/cart">
          <Badge count={totalItems} size="small" offset={[0, 5]}>
            <PiShoppingCartBold style={{ fontSize: "24px", color: "#fff" }} />
          </Badge>
        </Link>
        <Link to="/profile">
          <TbUserSquare style={iconStyle} />
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;
