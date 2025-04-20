import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { addToCart } from "../../RTK/Slices/addToCart-slice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PropTypes from "prop-types";
import { Drawer } from "@mui/material";
function DrawerSearch({ openDrawer, closeDrawer }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const allItems = useSelector((state) => state.items.items);
  const allData = allItems?.data;

  const filteredProducts = useMemo(() => {
    return Array.isArray(allData)
      ? allData.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  }, [allData, searchTerm]);
  return (
    <Drawer
      style={{ maxWidth: "380px" }}
      anchor="right"
      open={openDrawer}
      onClose={() => closeDrawer(null)}
    >
      <div
        className="exitI"
        style={{ justifyContent: "space-between" }}
        onClick={() => closeDrawer(null)}
      >
        <span>Search for products ( {filteredProducts.length})</span>
        <ClearIcon />
      </div>
      <div className="searchItems w0">
        <input
          type="text"
          placeholder="Search For Products ..."
          className="5"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <SearchIcon className="w5" />
      </div>
      <Row className="p-3">
        {searchTerm.length > 0 ? (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id}>
                <Col
                  className="mb-3"
                  style={{ cursor: "pointer", display: "flex" }}
                >
                  <div className="productCard w-50 p-2">
                    <Link
                      to={`Shop/Products/${product.id}`}
                      className="text-dark"
                    >
                      <img src={product.image_path} className="w-100" />
                    </Link>
                  </div>
                  <div className="w-50 p-3 d-flex flex-column justify-content-between">
                    <Link
                      to={`Shop/Products/${product.id}`}
                      className="text-dark"
                    >
                      <h5 className="m-0">{product.name}</h5>
                    </Link>
                    <div className="price my-2">
                      <span className="originPrice">${product.price}</span>{" "}
                      <span className="discountPrice">
                        ${product.discount_price}{" "}
                      </span>{" "}
                    </div>
                    <div className="addToCart w-100 ">
                      <button
                        className="w-100"
                        onClick={(e) => {
                          dispatch(addToCart(product));
                          e.preventDefault();
                        }}
                      >
                        <AddShoppingCartIcon
                          style={{ color: "#fff", fontSize: "15px" }}
                        />{" "}
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </Col>
              </div>
            ))
          ) : (
            <p> No products were found </p>
          )
        ) : (
          <p></p>
        )}
      </Row>
    </Drawer>
  );
}
export default DrawerSearch;
DrawerSearch.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};
