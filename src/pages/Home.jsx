import { Container, Row } from "react-bootstrap";
import AllHeader from "../componats/AllHeader";
import StaticHeader from "../componats/StaticHeader";
import Slider from "../componats/slider";
import SliderCategory from "../componats/sliderCategory";
import AllBaners from "../componats/AllBaners";
import ShowProducts from "../componats/ShowProducts";
import BlogSwiper from "../componats/BlogSwiper";
import Footer from "../componats/Footer";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Nooni - Home";
  }, []);
  return (
    <>
      <header>
        <AllHeader />
      </header>
      <div className="landing" style={{ background: "#F2F2F2" }}>
        <Container>
          <StaticHeader />
          <Slider />
        </Container>
      </div>
      <SliderCategory />
      <Container>
        <AllBaners />
      </Container>
      <div className="showAllProducts mt-3">
        <h2 className="text-center my-4">Best Modern Furniture</h2>
        <Container>
          <Row>
            <ShowProducts />
          </Row>
        </Container>
        <BlogSwiper />
        <div className="wood">
          <div className="h-100">
            <img src="/download.jpg" className="w-100 h-100" />{" "}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
