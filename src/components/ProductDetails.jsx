import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import ProductCardView from "./ProductCardView";
import SimilarItemListing from "./SimilarItemListing";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useOutletContext(); // get products from AppLayout

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) return <h2>Product not found</h2>;

  const similarItems = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
      <ProductCardView product={product} />
      </div>
      <SimilarItemListing items={similarItems} />
    </div>
  );
};

export default ProductDetails;
