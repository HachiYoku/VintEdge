import React, { useState, useEffect, useCallback } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import api from "../api/client";
import { normalizeProducts } from "../api/normalizeProduct";
import { HiArrowCircleUp } from "react-icons/hi";
import "../styles/components/AppLayout.css";

const { Content } = Layout;

const AppLayout = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/product");
      const normalized = normalizeProducts(res.data);
      setAllProducts(normalized);
      const categorySet = new Set(
        normalized.map((p) => p.category).filter(Boolean)
      );
      setCategories([...categorySet]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  useEffect(() => {
    if (!selectedCategory) {
      setProducts(allProducts);
      return;
    }
    setProducts(allProducts.filter((p) => p.category === selectedCategory));
  }, [allProducts, selectedCategory]);

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
            <Outlet
              context={{
                products,
                categories,
                setSelectedCategory,
                refreshProducts,
              }}
            />
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
