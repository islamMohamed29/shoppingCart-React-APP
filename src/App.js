import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { checkLocalStorage } from "./reducers/cartReducer";
export default function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [totalQTY, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("data"));
    if (dataFromLocalStorage) {
      dispatch(checkLocalStorage(dataFromLocalStorage));
    }
  }, [dispatch]);

  const getTotalQuantity = () => {
    const totalQuantity = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setTotalQuantity(totalQuantity);
  };

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    getTotalQuantity();
    getTotalPrice();
  }, [cartItems]);

  return (
    <>
      <Navbar totalPrice={totalPrice} totalQTY={totalQTY} />

      <div className="my-shopping-cart py-5">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="home" element={<Products />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}
