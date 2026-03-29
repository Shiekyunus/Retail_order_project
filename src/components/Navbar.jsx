<<<<<<< HEAD
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
=======
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    alert('You have logged out successfully.');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">QuickBite</Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        {!isLoggedIn ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li><button onClick={handleLogout} className="btn" style={{padding: '5px 10px', fontSize: '0.9rem'}}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
}
>>>>>>> 600a81f2 (add at frontend member1 pages)

export default Navbar;
