import React, { useState, useEffect } from "react";
import Products from "../Products/Products";
import FilterProducts from "../Utilities/FilterProducts";
import Data from "../Utilities/Data";
import ModalImage from "../../Images/Homepage/skin-care-modal-one.jpg";

export default () => {
  const [data, setData] = useState(Data);
  const [products, setProducts] = useState(data);

  const handleFilterClick = (categorie) => {
    if (categorie === "all") {
      return setProducts(data);
    }

    const filteredProducts = data.filter(
      (product) => product.categorie === categorie
    );

    setProducts(filteredProducts);
  };

  useEffect(() => {
    const rootElement = document.getElementById("root");
    rootElement.scrollIntoView(
      {
        behavior: "auto",
        block: "start",
      },
      500
    );
  }, []);

  return (
    <div className="new-arrivals-container">
      <div className="new-arrivals-image-wrapper">
        <img
          className="new-arrivals-image"
          src={ModalImage}
          alt="placeholder"
        />
      </div>

      <FilterProducts
        handleFilterClick={(product) => handleFilterClick(product)}
      />

      <div className="new-arrivals-products-container">
        <Products products={products} />
      </div>
    </div>
  );
};
