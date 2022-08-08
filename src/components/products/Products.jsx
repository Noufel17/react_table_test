import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { useMemo } from "react";
import "./style.css";
import Table from "./Table";
function Products() {
  const [products, setProducts] = useState([]);
  const fetchProductsData = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((error) => console.log(error));
    if (response) {
      const products = response.data;
      setProducts(products);
    }
  };
  // defining data and columns dinamicly from data brought in through the API
  const productsData = useMemo(() => [...products], [products]);
  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image") {
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img src={value} alt={key} />,
                  maxWidth: 30,
                };
              }
              if (key === "category") {
                return {
                  Header: key,
                  accessor: key,
                  filter: "equals",
                };
              }
              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  // activate data fetch on component load
  useEffect(() => {
    fetchProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="table_wrapper">
        <Table columns={productsColumns} data={productsData} />
      </div>
    </>
  );
}

export default Products;
