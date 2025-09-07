import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products based on query (search term or category)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");

        let filtered = res.data;

        if (searchTerm) {
          filtered = res.data.filter(
            (p) =>
              p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              p.category.toLowerCase() === searchTerm.toLowerCase()
          );
        }

        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <Spin size="large" style={{ marginTop: 50 }} />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
