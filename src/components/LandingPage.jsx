import ClickCarousel from "./ClickCarousel";
import ProductList from "./ProductCard";

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Carousel Section */}
      <div className="w-full">
        <ClickCarousel />
      </div>

      {/* Products Section */}
      <div className="w-full max-w-6xl mx-auto px-2 md:px-2 mt-4 sm:mt-6">
        <ProductList />
      </div>
    </div>
  );
}
