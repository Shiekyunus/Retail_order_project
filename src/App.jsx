import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

// Member 2 Pages
import Cart from './pages/Cart';
import Order from './pages/Order';
import Confirmation from './pages/Confirmation';

// Placeholders for Member 1 Pages
const HomePlaceholder = () => (
  <div className="placeholder-page">
    <h1>Home Page</h1>
    <p>Frontend Member 1 will build this page. It should showcase featured items and promotions.</p>
  </div>
);

const MenuPlaceholder = () => (
  <div className="placeholder-page">
    <h1>Menu Page</h1>
    <p>Frontend Member 1 will build this page. It needs to call <code>addToCart(product)</code> from the CartContext.</p>
  </div>
);

const LoginPlaceholder = () => (
  <div className="placeholder-page">
    <h1>Login Page</h1>
    <p>Frontend Member 1 will build this page.</p>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Member 1 Routes */}
            <Route path="/" element={<HomePlaceholder />} />
            <Route path="/menu" element={<MenuPlaceholder />} />
            <Route path="/login" element={<LoginPlaceholder />} />
            
            {/* Member 2 Routes (Your Work) */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
