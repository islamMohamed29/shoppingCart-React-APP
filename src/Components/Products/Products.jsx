import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import { connect, useSelector } from "react-redux";
import { updateSearchTerm } from "../../reducers/cartReducer";
import Search from "../Search/Search";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const searchTerm = useSelector((state) => state.cart.searchTerm);
  const [sort, setSort] = useState("");

  const handleSortChange = (getSort) => {
    setSort(getSort);
  };
  const getAllProducts = async () => {
    await axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
        console.log(res.data.products);
      })
      .catch((err) => {
        setError("لا يوجد منتجات في الوقت الحالي");
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "lowestPrice") {
      return a.price - b.price;
    } else if (sort === "HighestPrice") {
      return b.price - a.price;
    } else if (sort === "LowestRating") {
      return a.rating - b.rating;
    } else if (sort === "HighestRating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="container py-5">
        <Search />
        {error && <h2>{error}</h2>}
        {products.length === 0 ? <h2>{error}</h2> : ""}
        {loading ? (
          <div className="loading">
            <div class="loader"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div>{`No result for search "${searchTerm}"`}</div>
        ) : (
          <>
            <div className="sort-box py-2 mb-3">
              <label className="me-2" htmlFor="sort">
                Sort by:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option defaultValue="lowestPrice">no sorting</option>
                <option value="lowestPrice">Lowest Price</option>
                <option value="HighestPrice">Highest Price</option>
                <option value="LowestRating">Lowest rating</option>
                <option value="HighestRating">Highest rating</option>
              </select>
            </div>
            <div className="row g-5 text-center">
              {filteredProducts.map((ele) => {
                return <Product key={ele.id} product={ele} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  searchTerm: state.cart.searchTerm,
  loading: state.cart.loading,
});
export default connect(mapStateToProps, { updateSearchTerm })(Products);
