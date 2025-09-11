import React, { useState, useEffect } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { FaArrowCircleUp } from "react-icons/fa";
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
      if (window.scrollY >= 800) {
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
    <Layout
      style={{
        borderRadius: 8,
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#FFFFFF",
      }}
    >
      <AppHeader />
      <Content
        className="app-content"
        style={{
          textAlign: "center",
          minHeight: "calc(100vh - 120px)",
          padding: "8px",
          transition: "background-color 0.3s, color 0.3s",
          width: "100%",
          boxSizing: "border-box",
          background: "transparent",
        }}
      >
        {loading ? (
          <Spin size="large" style={{ marginTop: "50px" }} />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px",
              width: "100%",
            }}
          >
            <Outlet context={{ products, categories, setSelectedCategory }} />
          </div>
        )}
      </Content>

      {showTopBtn && (
        <FaArrowCircleUp
          onClick={scrollToTop}
          size={35}
          style={{
            position: "fixed",
            bottom: 40,
            right: 40,
            color: "#FF7343",
            cursor: "pointer",
            zIndex: 1000,
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      )}

      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
