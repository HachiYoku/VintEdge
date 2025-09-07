import React from "react";
import { Carousel } from "antd";
import PopularItemCard from "./PopularItemCard";

const PopularItemListing = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000} style={{  margin: "0 auto" }}>
      {products.map((item) => (
        <PopularItemCard key={item.id} product={item} />
      ))}
    </Carousel>
  );
};

export default PopularItemListing;
