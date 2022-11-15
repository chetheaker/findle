import React from 'react';
import logo from '../../assets/trinity.png';
import './style.css';

const Navbar = () => (
  <div className="navbar">
    <img className="navbar_logo" src={logo} alt="netflix logo" />
    <h1>Trinity.Ai</h1>
  </div>
);

export default Navbar;
