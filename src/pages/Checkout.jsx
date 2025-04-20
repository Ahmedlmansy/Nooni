import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../componats/Footer";
import BasicBreadcrumbs from "../componats/Routed";
import StaticHeader from "../componats/StaticHeader";
import AllHeader from "../componats/AllHeader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { FormControl, Box, Paper } from "@mui/material";
import Swal from "sweetalert2";
import { clearCart } from "../RTK/Slices/addToCart-slice";

function CheckoutPage() {
  useEffect(() => {
    document.title = "Nooni - Checkout";
  }, []);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shipping, setShipping] = useState(10);

  const handleChange = (e) => {
    setShipping(parseInt(e.target.value, 10));
  };

  const cart = useSelector((stats) => stats.cart);
  const subtotal =
    cart.length > 0
      ? parseFloat(
          cart.reduce(
            (total, item) => total + item.discount_price * item.quantity,
            0
          )
        )
      : 0;
  const total = subtotal + shipping;
  const [selectedValue, setSelectedValue] = useState("check");

  const handleChanged = (event) => {
    setSelectedValue(event.target.value);
  };

  /// Collecting customer data

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    townCity: "",
    streetAddress: "",
    phoneNumber: "",
    emailAddress: "",
    notes: "",
  });
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newErrors = { ...errors };
    if (id === "firstName" || id === "lastName") {
      const hasNumber = /\d/.test(value);
      newErrors[id] = hasNumber ? "The name must not contain numbers!" : "";
    }
    if (id === "phoneNumber") {
      const isNumeric = /^\d*$/.test(value);
      newErrors.phoneNumber = isNumeric
        ? ""
        : "Numbers should only be entered into the phone number";
    }
    setErrors(newErrors);
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        townCity: formData.townCity,
        streetAddress: formData.streetAddress,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress || "not provided",
        notes: formData.notes || "not Notes",
      },
      cartItems: cart.map((item) => {
        return {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.discount_price,
        };
      }),
      shipping: shipping === 10 ? "Flat rate" : "Local pickup",
      paymentMethod: selectedValue,
      subtotal: subtotal,
      total: total,
    };
    Swal.fire({
      icon: "success",
      title: "Order Placed",
      text: "Your order has been successfully submitted!",
      confirmButtonColor: "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Order Data:", orderData);
        navigate("/");
        setTimeout(() => {
          dispatch(clearCart()); // Clear the cart after placing the order
        }, 1000);
      }
    });
  };

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
          ></svg>
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
      <Container>
        <Row>
          <Col lg={7}>
            <Box>
              <TextField
                id="firstName"
                label="Frist Name"
                variant="outlined"
                className="w-50"
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                value={formData.firstName}
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                className="w-50"
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                value={formData.lastName}
              />
            </Box>
            <Box className="mt-3">
              <TextField
                className="w-100"
                id="townCity"
                label="Town / City"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.townCity}
              />
            </Box>
            <Box className="mt-3">
              <TextField
                type="text"
                className="w-100"
                id="streetAddress"
                label="Street address"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.streetAddress}
              />
            </Box>
            <Box className="mt-3">
              <TextField
                type="text"
                className="w-100"
                id="phoneNumber"
                label="Phone Number"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Box>
            <Box className="mt-3">
              <TextField
                className="w-100"
                id="emailAddress"
                label="Email address (optional)"
                variant="outlined"
                value={formData.emailAddress}
                onChange={handleInputChange}
              />
            </Box>
            <Box className="mt-3">
              <TextareaAutosize
                aria-label="minimum height"
                placeholder="Notes about your order, e.g. special notes for delivery. (optional)"
                id="notes"
                value={formData.notes}
                onChange={handleInputChange}
                style={{ width: "100%", minHeight: "200px", padding: " 10px" }}
              />
            </Box>
          </Col>
          <Col lg={5}>
            <Row
              className="p-3"
              style={{ backgroundColor: "rgb(249, 249, 249)" }}
            >
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
              <Col lg={12}>
                <ul>
                  {cart.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="d-flex justify-content-between my-3"
                      >
                        <span>
                          {item.name} ×&nbsp; {item.quantity}
                        </span>
                        <div className="price">
                          <span className="originPrice me-2">
                            ${item.price}
                          </span>
                          <span className="discountPrice">
                            ${item.discount_price}{" "}
                          </span>{" "}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Col>
              <hr />
              <Col lg={12} className="py-3" style={{ display: "flex" }}>
                <div className="w-50">
                  <h4 className="h_card_total">Shipping</h4>
                </div>
                <div className="w-50">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleChange}
                    defaultValue={10}
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
                </div>
              </Col>
              <hr />
              {/* PaymentOptions */}
              <Col lg={12} style={{ display: "flex" }}>
                <Box sx={{ p: 2 }}>
                  <FormControl component="fieldset">
                    <RadioGroup value={selectedValue} onChange={handleChanged}>
                      {/* Check Payments */}
                      <FormControlLabel
                        value="check"
                        control={
                          <Radio
                            sx={{
                              color: "gray",
                              "&.Mui-checked": { color: "#616161" },
                            }}
                          />
                        }
                        label="Check payments"
                      />
                      {selectedValue === "check" && (
                        <Paper elevation={3} sx={styles.paper}>
                          <Box sx={styles.arrow} />
                          Please send a check to Store Name, Store Street, Store
                          Town, Store State / County, Store Postcode.
                        </Paper>
                      )}

                      {/* Cash on Delivery */}
                      <FormControlLabel
                        value="cod"
                        control={
                          <Radio
                            sx={{
                              color: "gray",
                              "&.Mui-checked": { color: "#616161" },
                            }}
                          />
                        }
                        label="Cash on delivery"
                      />
                      {selectedValue === "cod" && (
                        <Paper elevation={3} sx={styles.paper}>
                          <Box sx={styles.arrow} /> {/* السهم */}
                          Pay with cash upon delivery.
                        </Paper>
                      )}

                      {/* PayPal */}
                      <FormControlLabel
                        value="paypal"
                        control={
                          <Radio
                            sx={{
                              color: "gray",
                              "&.Mui-checked": { color: "#616161" },
                            }}
                          />
                        }
                        label={
                          <>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                              alt="PayPal"
                              width="40"
                              style={{ marginRight: 8 }}
                            />
                            PayPal
                          </>
                        }
                      />
                      {selectedValue === "paypal" && (
                        <Paper elevation={3} sx={styles.paper}>
                          <Box sx={styles.arrow} /> {/* السهم */}
                          Pay via PayPal; you can pay with your credit card if
                          you don’t have a PayPal account.
                        </Paper>
                      )}
                    </RadioGroup>
                  </FormControl>
                </Box>
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
                <h3 className="h_card_total">${total} </h3>
              </Col>

              <Col>
                <button
                  type="button"
                  id="button-addon2"
                  disabled={
                    formData.firstName === "" ||
                    formData.lastName === "" ||
                    formData.phoneNumber === "" ||
                    formData.streetAddress === "" ||
                    formData.townCity === "" ||
                    errors.firstName ||
                    errors.lastName ||
                    errors.phoneNumber
                  }
                  className="btn btn-primary my-1 w-100"
                  onClick={handleFormSubmit}
                >
                  order now !
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default CheckoutPage;

const styles = {
  paper: {
    p: 2,
    mt: 1,
    position: "relative",
    backgroundColor: "#f5f5f5",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-10px",
      left: "20px",
      borderLeft: "10px solid transparent",
      borderRight: "10px solid transparent",
      borderBottom: "10px solid #f5f5f5",
    },
  },
  arrow: {
    position: "absolute",
    top: "-10px",
    left: "20px",
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "10px solid #f5f5f5",
  },
};
