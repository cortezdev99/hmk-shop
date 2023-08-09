import React, { useEffect, useState } from "react";
import "../Styles/main.scss";
import Navbar from "./Nav/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewArrivals from "./New-Arrivals/NewArrivals";
import BestSellers from "./Best-Sellers/BestSellers";
import AllApparel from "./All-Apparel/AllApparel";
import Cart from "./Cart/Cart";
import Sale from "./Sale/Sale";
import Icons from "./Utilities/Icons";
import ProductDetails from "./Products/ProductDetails";
import CartProvider from "../Providers/CartProvider";
import Checkout from "./Checkout/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CreateAccount from "./Checkout/CreateAccount";
import TotalsLogicProvider from "../Providers/TotalsLogicProvider";
import MobileSideNav from "./Nav/MobileSideNav";
import MobileSideNavProvider from "../Providers/MobileSideNavProvider";
import { auth } from "../Config/firebase";

function App() {
  Icons();
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
  const [user, setUser] = useState(false);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CartProvider>
          <TotalsLogicProvider>
            <MobileSideNavProvider>
              <Router>
                <Navbar />
                <MobileSideNav />
                <Cart />
                <div className="app-container" id="app-container">
                  <Routes>
                    <Route exact path="/" element={<NewArrivals />} />
                    <Route
                      exact
                      path="/best-sellers"
                      element={<BestSellers />}
                    />
                    <Route exact path="/all-apparel" element={<AllApparel />} />
                    <Route exact path="/sale" element={<Sale />} />
                    <Route
                      exact
                      path="/products/:slug"
                      element={<ProductDetails />}
                    />
                    <Route exact path="/checkout" element={<Checkout />} />
                    <Route
                      exact
                      path="/create-account"
                      element={<CreateAccount />}
                    />
                  </Routes>
                </div>
              </Router>
            </MobileSideNavProvider>
          </TotalsLogicProvider>
        </CartProvider>
      </Elements>
    </div>
  );
}

export default App;
