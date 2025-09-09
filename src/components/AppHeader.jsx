import React, { useState, useEffect } from "react";
import { Layout, Space, Input, Badge } from "antd";
import ThemeToggle from "./ThemeToggle";
import BurgerMenu from "./BurgerMenu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TbUserSquare } from "react-icons/tb";
import { PiShoppingCartBold } from "react-icons/pi";
import { useCart } from "../context/CartContext";

const { Header } = Layout;

const AppHeader = ({
  products = [],
  bgColor = "#D6B587",
  iconColor = "#fff",
}) => {
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
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: bgColor,
        transition: "background-color 0.3s",
      }}
    >
      {/* Left: Burger menu + Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <BurgerMenu iconStyle={{ fontSize: "24px", color: iconColor }} />
        <Link to="/">
          <img
            src="/fav.png"
            alt="Logo"
            style={{ height: "60px", width: "60px", cursor: "pointer" }}
          />
        </Link>
      </div>

      {/* Center: Search input */}
      <Input.Search
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={onSearch}
        enterButton
        style={{ maxWidth: 400 }}
        className="custom-search"
      />

      {/* Right: Icons */}
      <Space size="large">
        <ThemeToggle />
        <Link to="/cart">
          <Badge count={totalItems} size="small" offset={[0, 5]}>
            <PiShoppingCartBold
              style={{ fontSize: "24px", color: iconColor }}
            />
          </Badge>
        </Link>
        <Link to="/profile">
          <TbUserSquare style={{ fontSize: "24px", color: iconColor }} />
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;
