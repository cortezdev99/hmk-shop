import React from 'react';
import '../Styles/main.scss';
import Navbar from './Nav/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewArrivals from './New-Arrivals/NewArrivals';
import BestSellers from './Best-Sellers/BestSellers';
import AllApparel from './All-Apparel/AllApparel'
import Cart from './Cart/Cart';
import Account from './Account/Account';
import Icons from './Utilities/Icons';

function App() {
  Icons()
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="app-container">
          <Switch>
            <Route exact path='/' component={NewArrivals} />
            <Route exact path='/best-sellers' component={BestSellers} />
            <Route exact path='/all-apparel' component={AllApparel} />
            <Route exact path='/account' component={Account} />
            <Route exact path='/cart' component={Cart} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
