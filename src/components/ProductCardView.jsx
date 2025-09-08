import React from "react";
import { Card, Button } from "antd";
import { useCart } from "../context/CartContext";

const ProductCardView = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card
      hoverable
      style={{ width: "100%", maxWidth: 800, marginBottom: 20 }}
      bodyStyle={{ display: "flex", gap: "20px" }}
    >
      <div style={{ flex: 1 }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "contain",
            borderRadius: "10px",
          }}
        />
      </div>
      <div
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <h4>${product.price}</h4>
        <Button type="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCardView;
