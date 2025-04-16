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
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toggleFav } from "../RTK/Slices/favorites-slice";
import BasicBreadcrumbs from "../componats/Routed";
import { addToCart } from "../RTK/Slices/addToCart-slice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function Favorites() {
  const [width, setWidth] = useState(window.innerWidth); // 770
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });
  useEffect(() => {
    document.title = "Nooni - Wishlist";
  }, []);
  //

  const dispatch = useDispatch();
  //
  const favorites = useSelector((stats) => stats.favorites);

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
      <div className="">
        {favorites.length === 0 ? (
          <div className="text-center">
            <h2 className="my-5">Your Wishlist is Empty</h2>
          </div>
        ) : (
          <Container>
            {width > 770 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell align="right">Unit Price</TableCell>
                      <TableCell align="right"> Stock Status</TableCell>
                      <TableCell align="right"> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {favorites.map((product) => (
                      <TableRow
                        key={product.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Link to={`/Shop/Products/${product.id}`}>
                            <div className="imgd" style={{ width: "100px" }}>
                              <img src={product.image_path} className="w-100" />
                              {product.name}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <div className="price">
                            <span className="originPrice">
                              ${product.price}
                            </span>{" "}
                            <span className="discountPrice">
                              ${product.discount_price}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {product.stock < 0 ? (
                            "out of stock"
                          ) : (
                            <span className="inStock">
                              {" "}
                              <CheckIcon /> in stock
                            </span>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          <button
                            type="button"
                            id="button-addon2"
                            className="btn btn-primary"
                            onClick={() => {
                              dispatch(addToCart(product));
                            }}
                          >
                            Add to Cart
                          </button>
                          <span
                            className="delete"
                            onClick={() => {
                              dispatch(toggleFav(product));
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
                {favorites.map((product) => {
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
                        <Link
                          to={`/Shop/Products/${product.id}`}
                          className="w-50"
                        >
                          <div className="imgd">
                            <img src={product.image_path} className="w-100" />
                          </div>
                        </Link>
                        <div className="w-50">
                          <div className="price">
                            <h5>{product.name}</h5>
                            <span className="originPrice">
                              ${product.price}
                            </span>
                            <span className="discountPrice">
                              ${product.discount_price}
                            </span>
                          </div>
                          {product.stock < 0 ? (
                            "out of stock"
                          ) : (
                            <span className="inStock mt-3">
                              {" "}
                              <CheckIcon /> in stock
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-100 mt-4">
                        <button
                          type="button"
                          id="button-addon2"
                          className="btn btn-primary w-75"
                          onClick={() => {
                            dispatch(addToCart(product));
                            const Toast = Swal.mixin({
                              toast: true,
                              position: "top-end",
                              showConfirmButton: false,
                              timer: 3000,
                              timerProgressBar: true,
                              didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                              },
                            });
                            Toast.fire({
                              icon: "success",
                              title: "Added to Cart",
                            });
                          }}
                        >
                          Add to Cart
                        </button>
                        <span
                          className="delete w-25"
                          onClick={() => {
                            dispatch(toggleFav(product));
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
        )}
      </div>
      <div className="">
        <Container
          className="my-5"
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <h2 className="text-center ">Follow Us</h2>
          <div className="icons text-center">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="facebook"
              className="svg-inline--fa fa-facebook "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="twitter"
              className="svg-inline--fa fa-twitter "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="instagram"
              className="svg-inline--fa fa-instagram "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="pinterest"
              className="svg-inline--fa fa-pinterest "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                fill="currentColor"
                d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"
              ></path>
            </svg>
          </div>
        </Container>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default Favorites;
