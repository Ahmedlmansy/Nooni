import { Drawer } from "@mui/material";
import PropTypes from "prop-types";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../RTK/Slices/addToCart-slice";

function DrawerCart({ openDrawer, closeDrawer }) {
  const dispatch = useDispatch();

  // use Cart from store
  const cart = useSelector((stats) => stats.cart);
  // Subtotal
  const subtotal =
    cart.length > 0
      ? cart.reduce(
          (total, item) => total + item.discount_price * item.quantity,
          0
        )
      : 0;
  return (
    <Drawer anchor="right" open={openDrawer} onClose={() => closeDrawer(null)}>
      <div className="exitI" onClick={() => closeDrawer(null)}>
        <ClearIcon />
      </div>
      {cart.length === 0 ? (
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
      ) : (
        <div
          className=""
          style={{ position: "relative", minWidth: "370px !important" }}
        >
          <div
            className="cartItems"
            style={{
              width: "370px",
            }}
          >
            {cart.map((item) => {
              return (
                <div className="cartItem w-100" key={item.id}>
                  <div
                    className="productCart"
                    style={{
                      display: "flex",
                      gap: "10px",
                      padding: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div className="imgCart">
                      <Link to={`/Shop/Products/${item.id}`}>
                        <img src={item.image_path} style={{ width: "100px" }} />
                      </Link>
                    </div>
                    <div
                      className="detailsCart text-dark"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <h4 style={{ fontSize: " 18px" }}>{item.name}</h4>
                      <div className="quantity-container">
                        <button
                          className="quantity-btn"
                          disabled={item.quantity === 1}
                          onClick={(e) =>
                            e.preventDefault() ||
                            dispatch(decreaseQuantity(item.id))
                          }
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={(e) =>
                            e.preventDefault() ||
                            dispatch(increaseQuantity(item.id))
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="price">
                        <span className="originPrice me-2">${item.price}</span>
                        <span className="discountPrice">
                          ${item.discount_price}{" "}
                        </span>{" "}
                      </div>
                    </div>
                    <div className="ms-auto">
                      <span
                        className="delete"
                        onClick={() => {
                          dispatch(removeFromCart(item));
                        }}
                      >
                        <DeleteOutlineIcon />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className=""
              style={{
                bottom: "0",
                background: "#fff",
                width: "370px",
              }}
            >
              <div className="d-flex justify-content-between p-3">
                <h5 className="fw-bold">Subtotal</h5>
                <h5 className="fw-bold">$ {subtotal.toFixed(2)}</h5>
              </div>
              <Link to={"/Cart"}>
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    id="button-addon1"
                    className="btn btn-primary my-1 w-75"
                  >
                    View Cart
                  </button>
                </div>
              </Link>
              <Link to={"/Checkout"}>
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    id="button-addon2"
                    className="btn btn-primary my-1 w-75"
                  >
                    Checkout
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
export default DrawerCart;
DrawerCart.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};
