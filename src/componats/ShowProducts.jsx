import { Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItmes } from "../RTK/Slices/Itmes-slice";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { toggleFav } from "../RTK/Slices/favorites-slice";
import { addToCart } from "../RTK/Slices/addToCart-slice";

function ShowProducts() {
  // get all products
  const allItems = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);
  //
  const dispatch = useDispatch();
  const favorites = useSelector((stats) => stats.favorites);
  //
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItmes());
    }
  }, [dispatch, status]);

  const allData = allItems?.data || [];

  const randomItems = useMemo(() => {
    return [...allData].sort(() => Math.random() - 0.5).slice(0, 6);
  }, [allData]);
  // Status loading

  if (status === "loading") {
    return (
      <Stack spacing={2} direction="row" alignItems="center">
        <CircularProgress size="3rem" />
      </Stack>
    );
  }

  // Status failed

  if (status === "failed") return <p>Error: {error}</p>;

  // Equipment for the discount account
  function calculateDiscount(originPrice, discountPrice) {
    let discountPercentage =
      ((Math.ceil(originPrice) - discountPrice) / Math.ceil(originPrice)) * 100;
    return discountPercentage.toFixed(0);
  }

  return (
    <>
      {randomItems?.map((product) => {
        return (
          <Col lg={4} md={6} sm={12} key={product.id}>
            <Link to={`/Shop/Products/${product.id}`}>
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
                    -{calculateDiscount(product.price, product.discount_price)}%
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
    </>
  );
}
export default ShowProducts;
