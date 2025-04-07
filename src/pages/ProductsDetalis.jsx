import { Col, Container, Row } from "react-bootstrap";
import AllHeader from "../componats/AllHeader";
import StaticHeader from "../componats/StaticHeader";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItmes } from "../RTK/Slices/Itmes-slice";
import Footer from "../componats/Footer";
import { toggleFav } from "../RTK/Slices/favorites-slice";
import { addToCart } from "../RTK/Slices/addToCart-slice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShowProducts from "../componats/ShowProducts";

function ProductsDetalis() {
  const allItems = useSelector((state) => state.items.items);
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((stats) => stats.favorites);
  useEffect(() => {
    document.title = `Nooni - `;
    dispatch(fetchItmes());
  }, [dispatch, id]);
  return (
    <>
      <header>
        <AllHeader />
      </header>
      <div className="landing" style={{ background: "#fff" }}>
        <Container>
          <StaticHeader />
        </Container>
      </div>
      <Container className="productDetails">
        <Row className="mt-5 align-items-center">
          {allItems?.data?.find((item) => item.id === id)
            ? allItems?.data
                ?.filter((item) => item.id === id)
                .map((product) => {
                  document.title = `Nooni - ${product.name} `;

                  return (
                    <>
                      <Col lg={6} md={6} sm={12} key={product.id}>
                        <img src={product.image_path} className="w-100" />
                      </Col>
                      <Col lg={6} md={6} sm={12} className="p-3">
                        <div
                          className="wishlist mb-4"
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            cursor: "pointer",
                          }}
                        >
                          {" "}
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(toggleFav(product));
                            }}
                          >
                            {favorites.some(
                              (item) => item.id === product.id
                            ) ? (
                              <FavoriteIcon />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </div>{" "}
                        </div>
                        <h4>{product.name}</h4>
                        <p style={{ color: "#848484", letterSpacing: "1px" }}>
                          {product.description}
                        </p>
                        <div className="">
                          <p>
                            {" "}
                            <span className="fw-semibold">
                              Wood Type
                            </span> : {product.wood_type}{" "}
                          </p>
                          <p>
                            {" "}
                            <span className="fw-semibold">Finish </span> :{" "}
                            {product.finish}{" "}
                          </p>
                          <p>
                            <span className="fw-semibold">Dimensions</span> :{" "}
                            {product.dimensions.width}W *{" "}
                            {product.dimensions.depth}D *{" "}
                            {product.dimensions.height}H
                          </p>
                        </div>
                        <div className="price">
                          <span className="fw-semibold">Price</span> :{" "}
                          <span className="originPrice">${product.price}</span>{" "}
                          <span className="discountPrice">
                            ${product.discount_price}{" "}
                          </span>{" "}
                        </div>
                        <div className="addToCart w-100 mt-5">
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
                      </Col>
                    </>
                  );
                })
            : null}
        </Row>
      </Container>
      <Container>
        <Row>
          <h2 className="mb-4 mt-5 fw-bold">Related Products</h2>
          <ShowProducts />
        </Row>
      </Container>
      <Footer />
    </>
  );
}
export default ProductsDetalis;
