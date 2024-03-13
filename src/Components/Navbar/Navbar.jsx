import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ totalQTY, totalPrice }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3  fixed-top">
        <div className="container">
          <NavLink to={"/"} className="navbar-brand" href="#">
            shoppingCart <i class="fa-solid fa-cart-shopping"></i>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto  align-items-center  mb-2 mb-lg-0">
              <li className="nav-item me-2  text-white">
                <NavLink to={"/"} class="nav-link" href="#">
                  Products
                </NavLink>
              </li>
              <li className="nav-item me-2 text-white">
                <NavLink to={"/cart"} className="nav-link cart-link " href="#">
                  Cart <i className="fa-solid fa-cart-shopping"></i>
                  <span className="badge text-bg-primary">{totalQTY}</span>
                </NavLink>
              </li>
              <li className="nav-item me-2 text-white">
                <span className="total">
                  Total Price:
                  <span className="price ms-2">{`$${totalPrice.toFixed(
                    2
                  )}`}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
