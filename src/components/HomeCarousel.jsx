import React from "react";
import { Carousel } from "antd";
import "../styles/components/HomeCarousel.css";

const ProductCarousel = () => {
  return (
    <Carousel autoplay autoplaySpeed={1500} dots>
      <div tabIndex="-1">
        <img className="carousel-img" src="/HomeCarousel-1.png" alt="Carousel 1" />
      </div>
      <div tabIndex="-1">
        <img className="carousel-img" src="/HomeCarousel-2.png" alt="Carousel 2" />
      </div>
      <div tabIndex="-1">
        <img className="carousel-img" src="/HomeCarousel-3.png" alt="Carousel 3" />
      </div>
      <div tabIndex="-1">
        <img className="carousel-img" src="/HomeCarousel-4.png" alt="Carousel 4" />
      </div>
    </Carousel>
  );
};

export default ProductCarousel;
