import { Container } from "react-bootstrap";
// import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { useState } from "react";

// const DropDownMu = ({ title, items }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       style={{ position: "relative" }}
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <span style={{ textTransform: "uppercase" }}>
//         {title} <KeyboardArrowDownIcon fontSize="small" />
//       </span>
//       <motion.div
//         className="dropDown"
//         initial={{ opacity: 0, y: -10, scale: 0.9, display: "none" }}
//         animate={
//           isOpen
//             ? { opacity: 1, y: 0, scale: 1, display: "block", zIndex: "555" }
//             : { opacity: 0, y: -10, scale: 0.9 }
//         }
//         transition={{ duration: 0.3 }}
//       >
//         <ul className="p-0 m-0" style={{ listStyle: "none" }}>
//           {items.map((item, i) => (
//             <li
//               className="mb-2 px-3 dropDownLink"
//               key={i}
//               style={{ textTransform: "uppercase" }}
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       </motion.div>
//     </div>
//   );
// };

function AllHeader() {
  return (
    <>
      <div className="topHeader">
        <Container className="containerTopHeader">
          <div>
            <p className="m-0 textTop">
              Up to 40% off Best-Selling Furniture.{" "}
              <Link to={"/Shop"} className="shop">
                Shop Now
              </Link>
            </p>
          </div>
          <div style={{ display: "flex" }}>
            {/* <DropDownMu title="English" items={["Français", "Deutsch"]} /> */}
            {/* <DropDownMu title="Usd" items={["usd", "eur"]} /> */}
          </div>
        </Container>
      </div>
    </>
  );
}

export default AllHeader;
