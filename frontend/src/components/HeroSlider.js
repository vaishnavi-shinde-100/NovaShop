import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./HeroSlider.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

function HeroSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="hero-slider"
    >
      <SwiperSlide>
        <div className="slide slide1">
          <h1>New Jewellery Collection ✨</h1>
          <p>Elegant designs for every occasion</p>
          <button>Shop Now</button>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slide slide2">
          <h1>Wedding Collection 💍</h1>
          <p>Make your moments special</p>
          <button>Explore</button>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slide slide3">
          <h1>Exclusive Offers 🔥</h1>
          <p>Up to 50% off</p>
          <button>Grab Now</button>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slide slide4">
          <h1>New Jewellery Collection ✨</h1>
          <p>Elegant designs for every occasion</p>
          <button>Shop Now</button>
        </div>
      </SwiperSlide>
        
    </Swiper>
  );
}

export default HeroSlider;
