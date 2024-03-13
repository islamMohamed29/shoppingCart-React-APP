import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchTerm } from "../../reducers/cartReducer";

export default function Search() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.cart.searchTerm);

  const handleSearchChange = (event) => {
    dispatch(updateSearchTerm(event.target.value));
  };

  return (
    <div className="search-input pt-2 pb-5">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-50 m-auto  mt-5 form-control"
      />
    </div>
  );
}
