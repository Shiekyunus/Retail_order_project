import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    alert('Logged out successfully');
    navigate('/login');
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" className="navbar-logo">QuickBite</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order-history">Order History</Link></li>
        <li>
          <Link to="/cart" className="cart-link" style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
            Cart
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </li>
        {isLoggedIn ? (
          <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
        ) : (
          <li><Link to="/login" className="btn-login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
