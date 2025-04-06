import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function SliderCategory() {
  const allItems = useSelector((state) => state.items.items);

  const categoryCount = allItems?.data?.length
    ? allItems.data.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {})
    : {};

  const sliderContent = Object.entries(categoryCount).map(([key, value]) => ({
    name: key,
    count: value,
    img: `/${key.replace(/\s/g, "_")}.png`,
  }));

  const mixed = [
    ...sliderContent,
    ...sliderContent,
    ...sliderContent,
    ...sliderContent,
    ...sliderContent,
  ];
  const itemWidth = 260;
  const totalItems = mixed.length;
  const maxOffset = (-itemWidth * totalItems) / 2;

  const [xPos, setXPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setXPos((prev) => {
        const nextPos = prev - itemWidth;
        return nextPos <= maxOffset ? 0 : nextPos;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [maxOffset]);

  return (
    <Container>
      <div className="slider-wrapper overflow-hidden my-5">
        <motion.div
          className="d-flex slider-track"
          animate={{ x: xPos }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          {mixed.map((cat, i) => (
            <Link key={i} to={`/Shop/${encodeURIComponent(cat.name)}`}>
              <div
                className="col d-flex align-items-center slider-item"
                style={{ width: "240px", height: "100px", padding: "10px" }}
              >
                <div className="imgCategory" style={{ width: "100px" }}>
                  <Image src={`${cat.img}`} roundedCircle className="w-100" />
                </div>
                <div className="detailsCategory">
                  <h4 className="mb-0">{cat.name}</h4>
                  <span>{cat.count} products</span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </Container>
  );
}

export default SliderCategory;
