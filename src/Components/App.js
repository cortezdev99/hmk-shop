import React from 'react';
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
import Payment from './Checkout/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Test1 from './Checkout/CreateAccount';
import CreateAccount from './Checkout/CreateAccount';

function App() {
  Icons()
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

  return (
    <div className="App">
      <Elements stripe={stripePromise}> 
        <CartProvider>
          <Router>
            <Navbar />
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
        </CartProvider>
      </Elements>
    </div>
  );
}

export default App;
