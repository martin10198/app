import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">History</Link>
	  <Link to="/map">Map</Link>
      <Link to="/add" className="add-button">+ Add</Link>
    </nav>
  );
}

export default Navigation; 