import { useEffect, useState } from "react";
import AllHeader from "../componats/AllHeader";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import StaticHeader from "../componats/StaticHeader";
import BasicBreadcrumbs from "../componats/Routed";
import Footer from "../componats/Footer";
import SliderCategory from "../componats/sliderCategory";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchItmes } from "../RTK/Slices/Itmes-slice";
import { Link } from "react-router-dom";
import { toggleFav } from "../RTK/Slices/favorites-slice";
import { addToCart } from "../RTK/Slices/addToCart-slice";

function Shop() {
  const dispatch = useDispatch();
  const favorites = useSelector((stats) => stats.favorites);

  // status Current Page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    document.title = `Nooni - Shop ${currentPage === 1 ? "" : currentPage}`;
    dispatch(fetchItmes());
  }, [dispatch, currentPage]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedWoodType, setSelectedWoodType] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("");

  const handleCategoryChange = (label) => {
    setSelectedCategory(selectedCategory === label ? "" : label);
    setCurrentPage(1); // Retrun to Frest Page
  };

  const handleWoodTypeChange = (label) => {
    setSelectedWoodType(selectedWoodType === label ? "" : label);
    setCurrentPage(1);
  };

  const handleFinishChange = (label) => {
    setSelectedFinish(selectedFinish === label ? "" : label);
    setCurrentPage(1);
  };

  const allItems = useSelector((state) => state.items.items);

  // count (category)
  const categoryCount = allItems?.data?.length
    ? allItems.data.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {})
    : {};

  const sliderContent = Object.entries(categoryCount).map(([key, value]) => ({
    name: key,
    count: value,
  }));

  // count (wood_type)
  const woodTypeCount = allItems?.data?.length
    ? allItems.data.reduce((acc, item) => {
        acc[item.wood_type] = (acc[item.wood_type] || 0) + 1;
        return acc;
      }, {})
    : {};

  const woodTypeContent = Object.entries(woodTypeCount).map(([key, value]) => ({
    name: key,
    count: value,
  }));

  // count (finish)
  const finishCount = allItems?.data?.length
    ? allItems.data.reduce((acc, item) => {
        acc[item.finish] = (acc[item.finish] || 0) + 1;
        return acc;
      }, {})
    : {};

  const finishContent = Object.entries(finishCount).map(([key, value]) => ({
    name: key,
    count: value,
  }));

  // Filtered items based on selected filters
  const filteredItems =
    allItems?.data?.filter((item) => {
      const matchesCategory = selectedCategory
        ? item.category === selectedCategory
        : true;
      const matchesWoodType = selectedWoodType
        ? item.wood_type === selectedWoodType
        : true;
      const matchesFinish = selectedFinish
        ? item.finish === selectedFinish
        : true;

      return matchesCategory && matchesWoodType && matchesFinish;
    }) || [];

  // calculate the total number of items and pages
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
        style={{ color: "#fff", background: "#000", border: "none" }}
      >
        {number}
      </Pagination.Item>
    );
  }
  // Equipment for the discount account
  function calculateDiscount(originPrice, discountPrice) {
    let discountPercentage =
      ((Math.ceil(originPrice) - discountPrice) / Math.ceil(originPrice)) * 100;
    return discountPercentage.toFixed(0);
  }

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
        <hr />
        <Row>
          {/* Offcanvas Button*/}
          <Col lg={2}>
            <Button
              variant="dark"
              onClick={handleShow}
              className="d-lg-none mt-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                style={{ width: "15px", height: "15px", marginRight: "5px" }}
              >
                <path
                  fill="#ffffff"
                  d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
                />
              </svg>
              Filter
            </Button>
          </Col>
          <Col lg={3} className="d-none d-lg-block">
            <Box
              sx={{
                width: 250,
                padding: 2,
                background: "#f4f4f4",
                borderRadius: "8px",
              }}
            >
              {/*  TYPE (Category) */}
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                TYPE
              </Typography>
              <FormGroup>
                {sliderContent.map((category) => (
                  <FormControlLabel
                    key={category.name}
                    control={
                      <Checkbox
                        checked={selectedCategory === category.name}
                        onChange={() => handleCategoryChange(category.name)}
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label={`${category.name} (${category.count})`}
                  />
                ))}
              </FormGroup>

              {/*  Wood Type */}
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 3, mb: 1 }}
              >
                WOOD TYPE
              </Typography>
              <FormGroup>
                {woodTypeContent.map((woodType) => (
                  <FormControlLabel
                    key={woodType.name}
                    control={
                      <Checkbox
                        checked={selectedWoodType === woodType.name}
                        onChange={() => handleWoodTypeChange(woodType.name)}
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label={`${woodType.name} (${woodType.count})`}
                  />
                ))}
              </FormGroup>

              {/*  Finish */}
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 3, mb: 1 }}
              >
                FINISH
              </Typography>
              <FormGroup>
                {finishContent.map((finish) => (
                  <FormControlLabel
                    key={finish.name}
                    control={
                      <Checkbox
                        checked={selectedFinish === finish.name}
                        onChange={() => handleFinishChange(finish.name)}
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label={`${finish.name} (${finish.count})`}
                  />
                ))}
              </FormGroup>
            </Box>
          </Col>

          <Col lg={9}>
            <Row>
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <Col lg={4} md={6} sm={12} key={product.id}>
                    <Link to={"/"}>
                      <div className="cardProduct">
                        <div className="price_fav">
                          <div className="price">
                            <span className="originPrice">
                              ${product.price}
                            </span>{" "}
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
                  </Col>
                ))
              ) : (
                <Col>
                  <p>No items found for the selected filters.</p>
                </Col>
              )}
            </Row>

            {/*   (Pagination) */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev
                    style={{ color: "black" }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                  {paginationItems}
                  <Pagination.Next
                    style={{ color: "black" }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </Col>
        </Row>

        {/* Offcanvas*/}
        <Offcanvas
          placement="end"
          show={show}
          onHide={handleClose}
          backdrop="static"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Box sx={{ padding: 2 }}>
              {/*  TYPE (Category) */}
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                TYPE
              </Typography>
              <FormGroup>
                {sliderContent.map((category) => (
                  <FormControlLabel
                    key={category.name}
                    control={
                      <Checkbox
                        checked={selectedCategory === category.name}
                        onChange={() => handleCategoryChange(category.name)}
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label={`${category.name} (${category.count})`}
                  />
                ))}
              </FormGroup>

              {/*  Wood Type */}
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 3, mb: 1 }}
              >
                WOOD TYPE
              </Typography>
              <FormGroup>
                {woodTypeContent.map((woodType) => (
                  <FormControlLabel
                    key={woodType.name}
                    control={
                      <Checkbox
                        checked={selectedWoodType === woodType.name}
                        onChange={() => handleWoodTypeChange(woodType.name)}
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label={`${woodType.name} (${woodType.count})`}
                  />
                ))}
              </FormGroup>

              {/*  Finish */}
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 3, mb: 1 }}
              >
                FINISH
              </Typography>
              <FormGroup>
                {finishContent.map((finish) => (
                  <FormControlLabel
                    key={finish.name}
                    control={
                      <Checkbox
                        checked={selectedFinish === finish.name}
                        onChange={() => handleFinishChange(finish.name)}
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label={`${finish.name} (${finish.count})`}
                  />
                ))}
              </FormGroup>
            </Box>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default Shop;
