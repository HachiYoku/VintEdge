// components/HomeCarousel.jsx

import React from "react";
import { Carousel } from "antd"; // Ant Design Carousel is still needed for its functionality

const contentStyle = {
  height: "360px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#BCC9D1",
};

const ProductCarousel = () => {
  return (
    <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
      <div tabIndex="-1">
        {" "}
        {/* Add tabIndex="-1" to prevent focus on the div itself */}
        <h3 style={contentStyle}>1</h3>
      </div>
      <div tabIndex="-1">
        <h3 style={contentStyle}>2</h3>
      </div>
      <div tabIndex="-1">
        <h3 style={contentStyle}>3</h3>
      </div>
      <div tabIndex="-1">
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};
export default ProductCarousel;
