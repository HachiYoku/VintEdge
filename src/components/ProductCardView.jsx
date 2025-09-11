import React from "react";
import { Card, Button } from "antd";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCardView = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        maxWidth: 800,
        marginBottom: 20,
        backgroundColor: "#f9f9f9", // changed card background
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
      bodyStyle={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
    >
      <div style={{ flex: "1 1 150px" }}>
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
          flex: "2 1 250px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <h4>${product.price}</h4>
        <Button
          type="primary"
          icon={<FaShoppingCart />}
          onClick={() => addToCart(product)}
          style={{
            backgroundColor: "#FF6530",
            borderColor: "#FF6530",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 8,
            height: 40,
            width: "150px",
            transition: "all 0.3s",
            alignSelf: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#ff7f50")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#FF6530")
          }
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCardView;
