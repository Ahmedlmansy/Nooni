import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Drawer from "@mui/material/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import DehazeIcon from "@mui/icons-material/Dehaze";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import DrawerSearch from "./Drawers/DrawerSearch";
import DrawerCart from "./Drawers/DrawerCart";
export default function StaticHeader() {
  // use Cart & favorites from store
  const cart = useSelector((stats) => stats.cart);
  const favorites = useSelector((stats) => stats.favorites);
  // toggleDrawer to open and close the drawer
  const [open, setOpen] = useState(null);
  // toggleDrawer function to open and close the drawer
  const toggleDrawer = (drawerId) => {
    setOpen(drawerId);
  };

  // header styled after scroling
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <div
        className={`d-flex  justify-content-between py-4 header  ${
          isFixed ? "fixed px-3" : ""
        }`}
        style={{ borderBottom: "1px solid #bbbbbb" }}
      >
        <div className="leftIcons">
          <Link
            to={"/"}
            onClick={(e) => {
              e.preventDefault();
              toggleDrawer("Drawer links");
            }}
          >
            <DehazeIcon className="mx-2" />
          </Link>
          <Drawer
            open={open === "Drawer links"}
            onClose={() => toggleDrawer(null)}
          >
            <div className="exitI" onClick={() => toggleDrawer(null)}>
              <ClearIcon />
            </div>
            <ul className="linksDr list-unstyled">
              <Link to={"/"} className="linkNav">
                <li className="linkDrawer active">Home</li>
              </Link>
              <Link to={"/Shop"} className="linkNav">
                <li className="linkDrawer">Shop</li>
              </Link>
              {/* <Link to={"/"} className="linkNav">
                <li className="linkDrawer">Products</li>
              </Link> */}
              <Link to={"/"} className="linkNav">
                <li className="linkDrawer">Blog</li>
              </Link>
              <Link to={"/"} className="linkNav">
                <li className="linkDrawer">About us </li>
              </Link>
              <Link to={"/"} className="linkNav">
                <li className="linkDrawer">Contact us</li>
              </Link>
            </ul>
          </Drawer>
          <Link
            to={"/"}
            onClick={(e) => {
              e.preventDefault();
              toggleDrawer("Drawer Search");
            }}
          >
            <SearchIcon className="mx-2" />
          </Link>
          <DrawerSearch
            closeDrawer={() => toggleDrawer(null)}
            openDrawer={open === "Drawer Search"}
          />
        </div>

        <div className="logo" style={{ width: "120px" }}>
          <Link to={"/"}>
            <img src="/logo.png" className="w-100" />{" "}
          </Link>{" "}
        </div>
        <div className="rightIcons" style={{ display: "flex", gap: "10px" }}>
          <Link to={"/"}>
            <PersonIcon className="mx-2" />
          </Link>

          <Link to={"/Wishlist"}>
            <Badge
              color="default"
              badgeContent={`${favorites.length}`}
              max={999}
            >
              <FavoriteBorderIcon className="mx-2" />
            </Badge>
          </Link>

          <Link
            to={"/"}
            onClick={(e) => {
              e.preventDefault();
              toggleDrawer("Drawer Cart");
            }}
          >
            <Badge color="default" badgeContent={`${cart.length}`} max={100}>
              <ShoppingCartCheckoutIcon className="mx-2" />
            </Badge>
          </Link>
          <DrawerCart
            openDrawer={open === "Drawer Cart"}
            closeDrawer={() => toggleDrawer(null)}
          />
        </div>
      </div>
    </>
  );
}
