import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <Container className="mt-5">
        <Row style={{ borderBottom: "1px solid #eee", marginBottom: "20px" }}>
          <Col lg={3} md={4} sm={12} className="logo_call">
            <ul className="list-unstyled listFooter  ">
              <li className="">
                <img src="/logo.png" className="w-50 mb-3" />
              </li>
              <li className="m">
                <Link to={"/"} className="footertext">
                  Text: +00(234)23-45-666
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Mon – Fri: 8 am – 8 pm
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Sat – Sun: 8 am – 7 pm
                </Link>
              </li>
            </ul>
          </Col>
          <Col lg={2} md={4} sm={6} xs={6} className="about">
            <ul className="list-unstyled listFooter  ">
              <li className="">
                <p className="footerHeadre h6 list-style-none text-dark fw-bold">
                  ABOUT{" "}
                </p>
              </li>
              <li className="m">
                <Link to={"/"} className="footertext">
                  Our Story
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Careers
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Influencers
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Join our team
                </Link>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={4} sm={6} xs={6} className="customServ">
            <ul className="list-unstyled listFooter  ">
              <li className="">
                <p className="footerHeadre h6 list-style-none text-dark fw-bold">
                  CUSTOMER SERVICES{" "}
                </p>
              </li>
              <li className="m">
                <Link to={"/"} className="footertext">
                  Contact Us
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Customer Service
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Find Store
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Book appointment
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </Col>
          <Col lg={4} md={12} sm={12} className="signUp">
            <ul className="list-unstyled listFooter  ">
              <li className="">
                <p className="footerHeadre h6 list-style-none text-dark fw-bold">
                  SIGN UP FOR EMAILS
                </p>
              </li>
              <li className="m">
                <Link to={"/"} className="footertext">
                  Enjoy 15% off your first order when you sign up to our
                  newsletter
                </Link>
              </li>
              <li>
                <div className="">
                  <InputGroup className="mb-3">
                    <Form.Control
                      style={{ padding: "12px 26px", background: "#ededed" }}
                      placeholder="Your e-mail address"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <Button id="button-addon2">Subscribe</Button>
                  </InputGroup>
                  <div className="icons">
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faPinterest} />
                  </div>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
        <Row style={{ gap: "12px" }} className="sc-footer">
          <Col lg={4} md={12} sm={12}>
            <ul
              className="list-unstyled listFooter  "
              style={{ flexDirection: "row", justifyContent: "center" }}
            >
              <li className="m">
                <Link to={"/"} className="footertext">
                  Privacy Policy
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  Help
                </Link>
              </li>
              <li className="">
                <Link to={"/"} className="footertext">
                  FAQs
                </Link>
              </li>
            </ul>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <p style={{ color: "#848484" }}>© Nooni. All Rights Reserved.</p>
          </Col>
          <Col lg={3} md={12} sm={12}>
            <img src="/payment.png" className="w00" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
