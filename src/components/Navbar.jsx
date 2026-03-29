import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  
  // Calculate total items in cart for the badge
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">QuickBite</Link>
        </div>
        
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </li>
          <li><Link to="/login" className="btn-login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
