import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>GyG</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink to="/menu" activeClassName="is-active" exact={true}>Menu</NavLink>
    <NavLink to="/checkout" activeClassName="is-active" exact={true}>Checkout</NavLink>
  </header>
);

export default Header;