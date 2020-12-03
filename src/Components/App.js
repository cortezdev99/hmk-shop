import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth';
import '../Styles/main.scss';
import Navbar from './Nav/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewArrivals from './New-Arrivals/NewArrivals';
import BestSellers from './Best-Sellers/BestSellers';
import AllApparel from './All-Apparel/AllApparel'
import Cart from './Cart/Cart';
import Sale from './Sale/Sale';
import Icons from './Utilities/Icons';
import ProductDetails from './Products/ProductDetails';
import CartProvider from '../Providers/CartProvider';
import Checkout from './Checkout/Checkout'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CreateAccount from './Checkout/CreateAccount';
import TotalsLogicProvider from '../Providers/TotalsLogicProvider'
import MobileSideNav from './Nav/MobileSideNav';
import MobileSideNavProvider from '../Providers/MobileSideNavProvider';
import { firebaseConfig } from '../Config/fbConfig';

function App() {
  Icons()
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
  const [ user, setUser ] = useState(false)
  const [ initializing, setInitializing ] = useState(true)

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false)
    }
  }

  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
    firebase.analytics();
  }, [])

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  })

  if (initializing) {
    return (
      <div>
        Loading...
      </div>
    )
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
                  <Switch>
                    <Route exact path='/' component={NewArrivals} />
                    <Route exact path='/best-sellers' component={BestSellers} />
                    <Route exact path='/all-apparel' component={AllApparel} />
                    <Route exact path='/sale' component={Sale} />
                    <Route exact path='/products/:slug' component={ProductDetails} />
                    <Route exact path='/checkout' component={Checkout} />
                    <Route exact path='/create-account' component={CreateAccount} />
                  </Switch>
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
