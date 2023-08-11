import React, { useEffect, useState } from "react";
import CartContext from "../Contexts/CartContext";

const CartProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("productsInCart")).length > 0 &&
      products.length === 0
    ) {
      setProducts(JSON.parse(localStorage.getItem("productsInCart")));
    } else if (products) {
      localStorage.setItem("productsInCart", JSON.stringify(products));
    }
  }, [products]);

  const state = {
    isCartOpen,
    setIsCartOpen,
    products,
    setProducts,
  };

  return (
    <CartContext.Provider value={state}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
