import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import ProductCardView from "./ProductCardView";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useOutletContext(); // get products from AppLayout

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
      <ProductCardView product={product} />
    </div>
  );
};

export default ProductDetails;
