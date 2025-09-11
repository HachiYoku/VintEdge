import React, { useState, useEffect } from "react";
import { Layout, Space, Input, Badge, Drawer } from "antd";
import ThemeToggle from "./ThemeToggle";
import BurgerMenu from "./BurgerMenu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TbUserSquare } from "react-icons/tb";
import { PiShoppingCartBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "../styles/components/AppHeader.css";

const { Header } = Layout;

const AppHeader = ({
  products = [],
  bgColor = "white",
  iconColor = "#220303ff",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [location.search, initialQuery]);

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
    setShowSearchDrawer(false);
  };


  return (
    <Header className="app-header" style={{ backgroundColor: "white" }}>
      {/* Left: Burger + Logo */}
      <div className="header-left">
        <BurgerMenu iconStyle={{ fontSize: "24px", color: "#280808ff" }} />
        <Link to="/">
          <img
            src="/fav.png"
            alt="Logo"
            style={{
              height: "70px",
              width: "120px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          />
        </Link>
      </div>

      {/* Center: Search (desktop only) */}
      <div className="desktop-search">
        <Input.Search
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: 400 }}
        />
      </div>

      {/* Right: Icons */}
      <Space size="large" className="header-icons">
        {/* Mobile search icon */}
        <div className="mobile-search-icon">
          <FiSearch
            className="search-icon"
            onClick={() => setShowSearchDrawer(true)}
          />
        </div>

        <ThemeToggle />
        <Link to="/cart">
          <Badge count={totalItems} size="small" offset={[0, 5]}>
            <PiShoppingCartBold className="cart-icon" />
          </Badge>
        </Link>
        <Link to="/profile">
          <TbUserSquare className="profile-icon" />
        </Link>
      </Space>

      {/* Mobile Search Drawer */}
      <Drawer
        title="Search Products"
        placement="top"
        onClose={() => setShowSearchDrawer(false)}
        open={showSearchDrawer}
        height={100}
      >
        <Input.Search
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={onSearch}
          enterButton
        />
      </Drawer>
    </Header>
  );
};

export default AppHeader;
