import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ViewCart from "./pages/ViewCart";
import CheckoutPage from "./pages/Checkout";
import Shop from "./pages/Shop";
import Category from "./pages/Category";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Wishlist" element={<Favorites />} />
        <Route path="/Cart" element={<ViewCart />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Shop/:Category" element={<Category />} />
      </Routes>
    </>
  );
}

export default App;
