import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import CheckoutPage from '../components/CheckoutPage'
import MenuPage from '../components/MenuPage'
import Item from '../components/Item'


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/menu" component={MenuPage} exact={true} />
        <Route path="/menu/:id" component={Item} />
        <Route path="/checkout" component={CheckoutPage} exact={true} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;