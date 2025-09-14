import React, { useState, useEffect } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { HiArrowCircleUp } from "react-icons/hi";
import "../styles/components/AppLayout.css";

const { Content } = Layout;

const AppLayout = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    console.log(products);
  }, [products]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products";

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout className="app-layout">
      <AppHeader className="app-header" />
      <Content className="app-content">
        {loading ? (
          <Spin size="large" style={{ marginTop: "50px" }} />
        ) : (
          <div className="app-content-grid">
            <Outlet context={{ products, categories, setSelectedCategory }} />
          </div>
        )}
      </Content>

      {showTopBtn && (
        <HiArrowCircleUp
          onClick={scrollToTop}
          size={35}
          className="scroll-top-btn"
        />
      )}

      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
