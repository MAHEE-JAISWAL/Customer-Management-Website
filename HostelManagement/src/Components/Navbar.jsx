// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink exact to="/" activeClassName="active">Home</NavLink>
      <NavLink to="/available-rooms" activeClassName="active">Available Rooms</NavLink>
      <NavLink to="/customer-details" activeClassName="active">Customer Details</NavLink>
      <NavLink to="/add-customer" activeClassName="active">Add Customer</NavLink>
    </nav>
  );
};

export default Navbar;
