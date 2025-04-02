import { useDispatch, useSelector } from "react-redux";
import AllHeader from "../componats/AllHeader";
import { Col, Container, Row } from "react-bootstrap";
import StaticHeader from "../componats/StaticHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Footer from "../componats/Footer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BasicBreadcrumbs from "../componats/Routed";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../RTK/Slices/addToCart-slice";
import { Link } from "react-router-dom";
import { toggleFav } from "../RTK/Slices/favorites-slice";
import { useMemo } from "react";
import { fetchItmes } from "../RTK/Slices/Itmes-slice";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ViewCart() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <ArrowForwardIosIcon />,
    prevArrow: <ArrowBackIosIcon />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // Shipping
  const [shipping, setShipping] = useState(10);
  const handleChange = (e) => {
    setShipping(parseInt(e.target.value, 10));
  };
  //
  const [width, setWidth] = useState(window.innerWidth); // 770
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });
  useEffect(() => {
    document.title = "Nooni - Cart";
    dispatch(fetchItmes());
  }, []);
  //

  const dispatch = useDispatch();
  //
  const cart = useSelector((stats) => stats.cart);
  // Subtotal
  const subtotal =
    cart.length > 0
      ? parseFloat(
          cart.reduce(
            (total, item) => total + item.discount_price * item.quantity,
            0
          )
        )
      : 0;
  // get all products
  const allItems = useSelector((state) => state.items.items);
  const allData = allItems?.data || [];

  const randomItems = useMemo(() => {
    return [...allData].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [allData]);

  // Equipment for the discount account
  const favorites = useSelector((stats) => stats.favorites);
  function calculateDiscount(originPrice, discountPrice) {
    let discountPercentage =
      ((Math.ceil(originPrice) - discountPrice) / Math.ceil(originPrice)) * 100;
    return discountPercentage.toFixed(0);
  }

  if (cart.length === 0) {
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
        <div className="embtyCart text-center">
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M150 0H0V150H150V0Z" fill="white"></path>
            <path
              d="M34.5824 74.3272L33.4081 68.3582C32.1926 62.179 36.9225 56.428 43.2201 56.428H131.802C138.025 56.428 142.737 62.0523 141.647 68.1798L130.534 130.633C129.685 135.406 125.536 138.882 120.689 138.882H56.6221C51.9655 138.882 47.9253 135.668 46.8782 131.13L45.1458 123.623"
              stroke="#808080"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <path
              d="M83.5444 17.835C84.4678 16.4594 84.1013 14.5956 82.7257 13.6721C81.35 12.7486 79.4862 13.1152 78.5628 14.4908L47.3503 60.9858C46.4268 62.3614 46.7934 64.2252 48.169 65.1487C49.5446 66.0721 51.4084 65.7056 52.3319 64.33L83.5444 17.835Z"
              fill="#808080"
            ></path>
            <path
              d="M122.755 64.0173C124.189 64.8469 126.024 64.3569 126.854 62.9227C127.683 61.4885 127.193 59.6533 125.759 58.8237L87.6729 36.7911C86.2387 35.9614 84.4035 36.4515 83.5739 37.8857C82.7442 39.3198 83.2343 41.155 84.6684 41.9847L122.755 64.0173Z"
              fill="#808080"
            ></path>
            <path
              d="M34.9955 126.991C49.3524 126.991 60.991 115.352 60.991 100.995C60.991 86.6386 49.3524 75 34.9955 75C20.6386 75 9 86.6386 9 100.995C9 115.352 20.6386 126.991 34.9955 126.991Z"
              stroke="#808080"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeDasharray="5 5"
            ></path>
            <path
              d="M30.7 100.2C30.7 99.3867 30.78 98.64 30.94 97.96C31.1 97.2667 31.3333 96.6734 31.64 96.18C31.9467 95.6734 32.3133 95.2867 32.74 95.02C33.18 94.74 33.6667 94.6 34.2 94.6C34.7467 94.6 35.2333 94.74 35.66 95.02C36.0867 95.2867 36.4533 95.6734 36.76 96.18C37.0667 96.6734 37.3 97.2667 37.46 97.96C37.62 98.64 37.7 99.3867 37.7 100.2C37.7 101.013 37.62 101.767 37.46 102.46C37.3 103.14 37.0667 103.733 36.76 104.24C36.4533 104.733 36.0867 105.12 35.66 105.4C35.2333 105.667 34.7467 105.8 34.2 105.8C33.6667 105.8 33.18 105.667 32.74 105.4C32.3133 105.12 31.9467 104.733 31.64 104.24C31.3333 103.733 31.1 103.14 30.94 102.46C30.78 101.767 30.7 101.013 30.7 100.2ZM29 100.2C29 101.6 29.22 102.84 29.66 103.92C30.1 105 30.7067 105.853 31.48 106.48C32.2667 107.093 33.1733 107.4 34.2 107.4C35.2267 107.4 36.1267 107.093 36.9 106.48C37.6867 105.853 38.3 105 38.74 103.92C39.18 102.84 39.4 101.6 39.4 100.2C39.4 98.8 39.18 97.56 38.74 96.48C38.3 95.4 37.6867 94.5534 36.9 93.94C36.1267 93.3134 35.2267 93 34.2 93C33.1733 93 32.2667 93.3134 31.48 93.94C30.7067 94.5534 30.1 95.4 29.66 96.48C29.22 97.56 29 98.8 29 100.2Z"
              fill="#808080"
            ></path>
            <path
              d="M84.6121 101.029C85.8347 99.6106 88.8961 97.625 91.3609 101.029"
              stroke="#808080"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M74.1953 92.2265C75.8158 92.2265 77.1296 90.9128 77.1296 89.2922C77.1296 87.6716 75.8158 86.3579 74.1953 86.3579C72.5747 86.3579 71.261 87.6716 71.261 89.2922C71.261 90.9128 72.5747 92.2265 74.1953 92.2265Z"
              fill="#808080"
            ></path>
            <path
              d="M103.538 92.226C105.159 92.226 106.472 90.9123 106.472 89.2917C106.472 87.6711 105.159 86.3574 103.538 86.3574C101.917 86.3574 100.604 87.6711 100.604 89.2917C100.604 90.9123 101.917 92.226 103.538 92.226Z"
              fill="#808080"
            ></path>
          </svg>
          <p>Your cart is currently empty</p>
        </div>

        <div className="mt-5">
          <Footer />
        </div>
      </>
    );
  }
  return (
    <>
      {" "}
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
      <div className="">
        <Container>
          {width > 770 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right"> Quantity</TableCell>
                    <TableCell align="right"> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <div className="imgd" style={{ width: "100px" }}>
                          <img src={product.image_path} className="w-100" />
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="price">
                          <span className="originPrice">${product.price}</span>{" "}
                          <span className="discountPrice">
                            ${product.discount_price}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div
                          className=""
                          style={{ display: "flex", justifyContent: "end" }}
                        >
                          <div className="quantity-container">
                            <button
                              className="quantity-btn"
                              onClick={() =>
                                dispatch(decreaseQuantity(product.id))
                              }
                            >
                              −
                            </button>
                            <span className="quantity">{product.quantity}</span>
                            <button
                              className="quantity-btn"
                              onClick={() =>
                                dispatch(increaseQuantity(product.id))
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <span
                          className="delete"
                          onClick={() => {
                            dispatch(removeFromCart(product));
                          }}
                        >
                          <DeleteOutlineIcon />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Row
              className="my-5"
              style={{ gap: "40px", justifyContent: "center" }}
            >
              {cart.map((product) => {
                return (
                  <Col
                    key={product.id}
                    xs={10}
                    style={{
                      padding: "20px",
                      borderRadius: "6px",
                      boxShadow: "7px 4px 20px 0px #ccc",
                    }}
                  >
                    <div
                      className="w-100"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <div className="w-50">
                        <img src={product.image_path} className="w-100" />
                      </div>
                      <div className="w-50">
                        <div className="price">
                          <h5>{product.name}</h5>
                          <span className="originPrice">${product.price}</span>
                          <span className="discountPrice">
                            ${product.discount_price}
                          </span>
                        </div>
                        <div className="quantity-container">
                          <button
                            className="quantity-btn"
                            onClick={() =>
                              dispatch(decreaseQuantity(product.id))
                            }
                          >
                            −
                          </button>
                          <span className="quantity">{product.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() =>
                              dispatch(increaseQuantity(product.id))
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-100 mt-4 text-center">
                      <span
                        className="delete w-25"
                        onClick={() => {
                          dispatch(removeFromCart(product));
                        }}
                      >
                        <DeleteOutlineIcon />
                      </span>
                    </div>
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </div>
      <div className="">
        <Container
          className="mt-4 pt-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="addCoupon">
            <div className="inputCoupon">
              <input type="text" className="w-50" />
              <span className="w-50">Add Coupon</span>
            </div>
          </div>
          <div className="emptyCart">
            <div className="">
              <button
                type="button"
                id="button-addon1"
                className="btn btn-primary my-1 w-75"
                onClick={() => dispatch(clearCart())}
              >
                Empty Cart
              </button>
            </div>
          </div>
        </Container>
      </div>
      <Container
        className="cartTotals mt-5"
        style={{ background: "#f9f9f9", padding: "20px" }}
      >
        <h2 className="py-4">Cart Totals</h2>
        <Row>
          <Col
            lg={12}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <h3 className="h_card_total">Subtotal </h3>
            <h3 className="h_card_total">${subtotal}</h3>
          </Col>
          <hr />
          <Col lg={12} className="py-3" style={{ display: "flex" }}>
            <div className="w-50">
              <h4 className="h_card_total">Shipping</h4>
            </div>
            <div className="w-50">
              <FormControl onChange={handleChange}>
                <RadioGroup
                  defaultValue={10}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value={10}
                    control={
                      <Radio
                        sx={{
                          color: "gray",
                          "&.Mui-checked": { color: "#616161" },
                        }}
                      />
                    }
                    label="Flat rate: 10$"
                  />
                  <FormControlLabel
                    value={5}
                    control={
                      <Radio
                        sx={{
                          color: "gray",
                          "&.Mui-checked": { color: "#616161" },
                        }}
                      />
                    }
                    label="Local pickup: 5$"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Col>
          <hr />
          <Col
            lg={12}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <h3 className="h_card_total">Total</h3>
            <h3 className="h_card_total">${subtotal + shipping}</h3>
          </Col>
          <Col>
            <Link to={"/Checkout"} className="w-100">
              {" "}
              <button
                type="button"
                id="button-addon2"
                className="btn btn-primary my-1 w-100"
              >
                Proceed to checkout
              </button>
            </Link>{" "}
          </Col>
        </Row>
      </Container>
      <Container>
        {/* // Swiper */}
        <h3
          className="mb-4 mt-4 fw-bold"
          style={{ textTransform: "uppercase" }}
        >
          You may be interested in…
        </h3>
        <div className="slider-container">
          <Slider {...settings}>
            {randomItems?.map((product) => {
              return (
                <div key={product.id}>
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
                            {favorites.some(
                              (item) => item.id === product.id
                            ) ? (
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
                </div>
              );
            })}
          </Slider>
        </div>
      </Container>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default ViewCart;
