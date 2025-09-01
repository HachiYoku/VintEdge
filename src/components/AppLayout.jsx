import React, { useState, useEffect, use } from "react";
import AppHeader from "./AppHeader";
import { Flex, Layout } from "antd";
import AppFooter from "./AppFooter";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import "../styles/components/AppLayout.css";

const { Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: "100vh",
  lineHeight: "120px",
  color: "#000000ff",
  backgroundColor: "#F0F2F2",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  // width: 'calc(50% - 8px)',
  maxWidth: "100%",
};

const AppLayout = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {console.log(products)}, [products])

  // Fetch categories once
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch products (all or by category)
  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products";

    axios.get(url)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <Flex gap="middle" wrap>
      <Layout style={{ borderRadius: 8, maxWidth: "100%" }}>
        <AppHeader />
        <Content style={{ textAlign: "center", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
          {loading ? (
            <Spin size="large" style={{ marginTop: "50px" }} />
          ) : (
            <Outlet context={{ products, categories, setSelectedCategory }} />
          )}
        </Content>
        <AppFooter />
      </Layout>
    </Flex>
  );
};

export default AppLayout;
