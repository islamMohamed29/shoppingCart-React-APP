import React from "react";
import { useSelector } from "react-redux";
import {
  removeItem,
  decreaseQuantity,
  addItem,
} from "../../reducers/cartReducer";
import { connect, useDispatch } from "react-redux";
const Cart = () => {
  let cartItems = useSelector((state) => state.cart.cartItems);
  let dispatch = useDispatch();

  return (
    <>
      <div className="py-5 container">
        <h2>Cart Items</h2>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">image</th>
              <th scope="col">QTY</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.length === 0 ? (
              <h5 className="mt-3">Cart is empty</h5>
            ) : (
              ""
            )}
            {cartItems.map((item, index) => {
              return (
                <>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <img
                        className="w-50 cart-image mr-3"
                        height="50px"
                        src={item.images[0]}
                        alt={item.title}
                      />
                    </td>
                    <td>
                      <div className="totalQTY">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            dispatch(addItem(item));
                          }}
                        >
                          +
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            dispatch(decreaseQuantity(item));
                          }}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-dark ms-2"
                        onClick={() => {
                          dispatch(removeItem(item));
                        }}
                      >
                        Delete <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default connect(null, { removeItem })(Cart);
