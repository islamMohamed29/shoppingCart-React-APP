import React from "react";
import { addItem } from "../../reducers/cartReducer";
import { useDispatch } from "react-redux";
export default function const Product ({ product }) {
  let dispatch = useDispatch();

  return (
    <div className="col-md-3">
      <div className="product">
        <div className="image">
          <img className="w-100" height="300" src={product.images[0]} alt="" />
        </div>
        <div className="title">{product.title}</div>
        <div className="price fs-5 fw-bold">{product.price}$</div>
        <div className="rating fst-italic text-end px-2">{product.rating}</div>
        <button
          onClick={() => {
            dispatch(addItem(product));
          }}
          className="btn btn-primary  w-100 text-white"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

