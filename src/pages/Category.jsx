import { useEffect } from "react";
import AllHeader from "../componats/AllHeader";
import { Col, Container, Row } from "react-bootstrap";
import StaticHeader from "../componats/StaticHeader";
import BasicBreadcrumbs from "../componats/Routed";
import Footer from "../componats/Footer";
import SliderCategory from "../componats/sliderCategory";
import { useDispatch, useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchItmes } from "../RTK/Slices/Itmes-slice";
import { Link, useParams } from "react-router-dom";
import { toggleFav } from "../RTK/Slices/favorites-slice";
import { addToCart } from "../RTK/Slices/addToCart-slice";
function Category() {
  const { Category } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((stats) => stats.favorites);
  useEffect(() => {
    document.title = `Nooni - ${Category}`;
    dispatch(fetchItmes());
  }, [dispatch]);
  const decodedName = decodeURIComponent(Category.replace(/%20/g, " "));
  console.log(decodedName);
  // Equipment for the discount account
  function calculateDiscount(originPrice, discountPrice) {
    let discountPercentage =
      ((Math.ceil(originPrice) - discountPrice) / Math.ceil(originPrice)) * 100;
    return discountPercentage.toFixed(0);
  }
  const allItems = useSelector((state) => state.items.items);
  const categoryFiltered = allItems?.data?.filter(
    (item) => item.category === Category
  );

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
      <div className="">
        <BasicBreadcrumbs />
      </div>
      <SliderCategory />
      <Container>
        <Row>
          {categoryFiltered?.map((product) => {
            return (
              <Col lg={4} md={6} sm={12} key={product.id}>
                <Link to={"/"}>
                  <div className="cardProduct">
                    <div className="price_fav">
                      <div className="price">
                        <span className="originPrice">${product.price}</span>{" "}
                        <span className="discountPrice">
                          ${product.discount_price}{" "}
                        </span>{" "}
                      </div>
                      <div className="wishlist">
                        {" "}
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(toggleFav(product));
                          }}
                        >
                          {favorites.some((item) => item.id === product.id) ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </div>{" "}
                      </div>
                    </div>
                    <div className="imgProduct">
                      <div className="discountPercentage">
                        {" "}
                        -
                        {calculateDiscount(
                          product.price,
                          product.discount_price
                        )}
                        %
                      </div>
                      <img src={product.image_path} className="w-100" />
                    </div>
                    <div className="details">
                      <h2 className="">{product.name}</h2>
                      <p className="categoryName">
                        {" "}
                        Category : {product.category}{" "}
                      </p>
                      <div className="addToCart">
                        <button
                          className=""
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
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Footer />
    </>
  );
}
export default Category;

/**
 *
 *
 */
