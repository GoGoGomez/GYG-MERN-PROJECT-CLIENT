import React from 'react';
import { NavLink } from 'react-router-dom';
// import Nav from '../styles/component/header.css'
import store from '../store'

const Header = () => (
  <header className="Header">
      <div className="Header-title">GyG Kawana</div>
    <div className="Header-links">
      <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
      <NavLink to="/menu" activeClassName="is-active" exact={true}>Menu</NavLink>
      <NavLink to="/checkout" activeClassName="is-active" exact={true}>Checkout{store.getState().order.length !== 0 && `(${store.getState().order.length})`} </NavLink>
    </div>
  </header>
);

export default Header;