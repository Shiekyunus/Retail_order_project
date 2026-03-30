import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';
import { initialProducts } from '../data/mockDatabase';

function Menu() {
  const [filter, setFilter] = useState('All');
  const [products] = useState(initialProducts);
  
  const location = useLocation();
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryQuery = params.get('category');
    
    if (categoryQuery && ['Pizza', 'Cold Drinks', 'Breads'].includes(categoryQuery)) {
      setFilter(categoryQuery);
    } else {
      setFilter('All');
    }
  }, [location.search]);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('Please login first to add items to the cart!');
      navigate('/login');
      return;
    }

    if (cartContext && cartContext.addToCart) {
      cartContext.addToCart({ ...product, quantity: 1 });
    } else {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      existingCart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(existingCart));
    }
    
    alert(`${product.name} added to cart!`);
  };

  const setCategoryFilter = (category) => {
    setFilter(category);
    if (category === 'All') {
      navigate(`/menu`, { replace: true });
    } else {
      navigate(`/menu?category=${category}`, { replace: true });
    }
  }

  return (
    <div>
      <h2 className="text-center" style={{ marginBottom: '20px' }}>Global Indian Menu</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {['All', 'Pizza', 'Cold Drinks', 'Breads'].map(category => (
          <button 
            key={category} 
            className="btn" 
            style={{ backgroundColor: filter === category ? '#1D3557' : '#E63946' }}
            onClick={() => setCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredProducts.map(product => (
           <ProductCard 
             key={product.id} 
             product={product} 
             onAddToCart={handleAddToCart} 
           />
        ))}
      </div>
    </div>
  );
}

export default Menu;
