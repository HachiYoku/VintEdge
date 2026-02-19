import React, { useState, useEffect } from "react";
import { Layout, Space, Input, Badge, Drawer } from "antd";
import BurgerMenu from "./BurgerMenu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { PiShoppingCartLight } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
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
  const { user } = useAuth();
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [location.search, initialQuery]);

  // Handle search
  const onSearch = (value) => {
  if (value.trim() === "") return;
  navigate(`/search?query=${encodeURIComponent(value.trim())}`);
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

        <Link to="/cart">
          <Badge count={totalItems} size="small" offset={[0, 5]}>
            <PiShoppingCartLight className="cart-icon" />
          </Badge>
        </Link>
        <Link to="/profile">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username || "User avatar"}
              className="profile-avatar"
            />
          ) : (
            <FiUser className="profile-icon" />
          )}
        </Link>
      </Space>

      {/* Mobile Search Drawer */}
      <Drawer
        title={null} // remove default title
        placement="top"
        onClose={() => setShowSearchDrawer(false)}
        open={showSearchDrawer}
        //responsive
        height={window.innerWidth < 480 ? 140 : 100}
        styles={{
          body: {
            padding: "10px 16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Input.Search
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={onSearch}
          enterButton
          style={{
            width: "100%",
            maxWidth: window.innerWidth < 480 ? "100%" : "500px",
            fontSize: window.innerWidth < 480 ? "14px" : "16px",
            height: window.innerWidth < 480 ? "35px" : "40px",
          }}
        />
      </Drawer>
    </Header>
  );
};

export default AppHeader;
