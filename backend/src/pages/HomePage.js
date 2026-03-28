import React from "react";
import "./HomePage.css";
// import ProductList from "../components/ProductList";
import JewellerySection from "../components/JewellerySection";
import HeroSlider from "../components/HeroSlider";
import CategorySections from "../components/CategorySections";
// import ProductList from "../components/ProductList";


function HomePage({ addToCart, addToWishlist }) {
  return (
    <div>
      {/* HERO SECTION */}
      <HeroSlider />

      {/* CATEGORIES */}

      <JewellerySection />

      {/* PRODUCTS */}
      {/* <section className="products">
        <h2>Trending Products</h2>
       <ProductList addToCart={addToCart} />
       </section> */}

      <CategorySections addToCart={addToCart} addToWishlist={addToWishlist} />

      <footer/>
    </div>
  );
}

export default HomePage;
