import React from "react";
import { Card, Button,Image } from "antd";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <Image.PreviewGroup>
          <Image
            alt={product.title}
            src={product.image}
            style={{ height: 200, objectFit: "contain",padding: "10px" }}
          />
        </Image.PreviewGroup>
      }
      actions={[
        <Button
          type="primary"
          icon={<FaShoppingCart />}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Add to Cart
        </Button>,
        <Button
          type="default"
          icon={<FaInfoCircle />}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          See Description
        </Button>
      ]}
    >
      <Meta title={product.title} />
      <div style={{ marginTop: "10px", fontSize: "16px" }}>
        <p>Stock: {product.rating?.count || 0}</p>
        <p>${product.price}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
