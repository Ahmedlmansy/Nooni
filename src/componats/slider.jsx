import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItmes } from "../RTK/Slices/Itmes-slice";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";



function Slider() {
  const dispatch = useDispatch();
  // const allItems = useSelector((state) => state.items.items);
const status = useSelector((state) => state.items.status);
  const [ index , setIndex] = useState(0)
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItmes());
    }
  }, [dispatch, status]);
   const sliderContnet = [
      {
      id: "e76fdfca-170d-432e-933f-151454dde9cb",
      name: "Outdoor Garden Chair",
      category: "garden",
      description: "A stylish and comfortable chair for your garden, perfect for relaxing on sunny days.",
      image_path: "/public/imgContent_1.png",
    },
    {
      id: "9da38fbe-e54c-4b33-b120-af09a2a2c9e2",
      name: "Modern Oak Desk Lamp",
      category: "lamp",
      description: "A sleek and contemporary desk lamp that combines functionality with aesthetic appeal, crafted from high-quality oak wood. Perfect for any modern workspace, it features an adjustable arm for customizable lighting angles and a warm, inviting glow.",
      image_path: "/public/imgContent_2.png",
    },
    {
      id: "4bfa11cc-5abd-4893-ad98-682bbe1b7c39",
      name: "Elegant Comfort Mattress",
      category: "lamp",
      description: "A luxurious mattress designed to provide ultimate comfort and support for a restful night's sleep. Crafted from high-quality materials, it features a breathable cover and multiple layers of cushioning to ensure a perfect fit for your body.",
      image_path: "/public/imgContent_3.png",
    },
  ]
  return (
    <div className="slider-container container my-3 ">
      <AnimatePresence mode="wait">
        <motion.div

          key={sliderContnet[index].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="slide"
        >
            <div className="text">
            <h2 className="h2">{sliderContnet[index].name}</h2>
            <p className="p">{sliderContnet[index].description}</p>
            <button className="shop-btn">SHOP NOW</button>
          </div>
          <img src={`${sliderContnet[index].image_path}`} alt="Chair" className="chair-image" />
        </motion.div>
      </AnimatePresence>
       <div className="dots"> 
        {sliderContnet.map((_, i) => (
          <span key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)}></span>
        ))}
      </div>
    </div>
    
  );
}

export default Slider;
