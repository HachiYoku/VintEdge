import React, { useState,useEffect } from 'react';
import { Layout, Space, Input } from 'antd';
import BurgerMenu from './BurgerMenu';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { TbUserSquare } from 'react-icons/tb';
import { PiShoppingCartBold } from "react-icons/pi";


const { Header} = Layout;
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#fff',
  height: '50px',
  paddingTop: '10px',
  backgroundColor: '#c5bebeff',
};

const iconStyle = {
  fontSize: "24px",
  color: "#fff",
};

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill search input when on /search
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [location.search]);

  const onSearch = (value) => {
    if (value.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(value.trim())}`);
  };

  return (
    <Header style={headerStyle}>
      <BurgerMenu iconStyle={iconStyle} />

      <Input.Search
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={onSearch}
        enterButton
        style={{ maxWidth: 400 }}
      />

      {/* Right icons */}
      <Space size="large">
        <Link to="/cart">
          <PiShoppingCartBold style={{ fontSize: "24px", color: "#fff" }} />
          <PiShoppingCartBold style={iconStyle} />
        </Link>
        <Link to="/profile">
          <TbUserSquare style={{ fontSize: "24px", color: "#fff" }} />
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;
