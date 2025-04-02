import { Col, Container, Row } from "react-bootstrap";
import Footer from "../componats/Footer";
import BasicBreadcrumbs from "../componats/Routed";
import StaticHeader from "../componats/StaticHeader";
import AllHeader from "../componats/AllHeader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { FormControl, Box, Paper } from "@mui/material";

function CheckoutPage() {
  useEffect(() => {
    document.title = "Nooni - Checkout";
  }, []);

  const [shipping, setShipping] = useState(10);
  const [selectedValue, setSelectedValue] = useState("check");

  // حالة لتخزين بيانات العميل
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    townCity: "",
    streetAddress: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });

  const handleChange = (e) => {
    setShipping(parseInt(e.target.value, 10));
  };

  const handleChanged = (event) => {
    setSelectedValue(event.target.value);
  };

  // التعامل مع تغيير قيم الحقول
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const cart = useSelector((stats) => stats.cart);
  const subtotal =
    cart.length > 0
      ? parseFloat(
          cart.reduce((total, item) => total + item.price * item.quantity, 0)
        )
      : 0;
  const total = subtotal + shipping;

  // دالة لتجميع البيانات وإرسالها
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        townCity: formData.townCity,
        streetAddress: formData.streetAddress,
        phoneNumber: formData.phoneNumber,
        email: formData.email || "Not provided", // اختياري
        notes: formData.notes || "No notes", // اختياري
      },
      products: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        discountPrice: item.discount_price,
      })),
      shipping: {
        method: shipping === 10 ? "Flat rate" : "Local pickup",
        cost: shipping,
      },
      payment: {
        method: selectedValue,
      },
      subtotal: subtotal,
      total: total,
    };

    console.log("Order Data:", orderData);
    // fetch('/api/orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(orderData),
    // });
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
            <Box component="form" onSubmit={handleSubmit}>
              <Box>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  className="w-50"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  className="w-50"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Box>
              <Box className="mt-3">
                <TextField
                  className="w-100"
                  id="townCity"
                  label="Town / City"
                  variant="outlined"
                  required
                  value={formData.townCity}
                  onChange={handleInputChange}
                />
              </Box>
              <Box className="mt-3">
                <TextField
                  className="w-100"
                  id="streetAddress"
                  label="Street address"
                  variant="outlined"
                  required
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                />
              </Box>
              <Box className="mt-3">
                <TextField
                  className="w-100"
                  id="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </Box>
              <Box className="mt-3">
                <TextField
                  className="w-100"
                  id="email"
                  label="Email address (optional)"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Box>
              <Box className="mt-3">
                <TextareaAutosize
                  id="notes"
                  aria-label="minimum height"
                  placeholder="Notes about your order, e.g. special notes for delivery. (optional)"
                  style={{ width: "100%", minHeight: "200px", padding: "10px" }}
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </Box>
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
                          {item.name} × {item.quantity}
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
              <Col lg={12} style={{ display: "flex" }}>
                <Box sx={{ p: 2 }}>
                  <FormControl component="fieldset">
                    <RadioGroup value={selectedValue} onChange={handleChanged}>
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
                          <Box sx={styles.arrow} />
                          Pay with cash upon delivery.
                        </Paper>
                      )}
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
                          <Box sx={styles.arrow} />
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
                  type="submit"
                  form="checkout-form"
                  id="button-addon2"
                  className="btn btn-primary my-1 w-100"
                >
                  Order Now!
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
