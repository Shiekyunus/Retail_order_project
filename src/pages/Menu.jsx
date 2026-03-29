import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const initialProducts = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&q=80' },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80' },
  { id: 3, name: 'Veggie Supreme', category: 'Pizza', price: 13.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
  { id: 4, name: 'Cola', category: 'Cold Drinks', price: 2.99, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
  { id: 5, name: 'Lemonade', category: 'Cold Drinks', price: 3.49, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80' },
  { id: 6, name: 'Iced Tea', category: 'Cold Drinks', price: 2.49, image: 'https://images.unsplash.com/photo-1499638472904-ea5c6178a300?w=400&q=80' },
  { id: 7, name: 'Garlic Bread', category: 'Breads', price: 4.99, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&q=80' },
  { id: 8, name: 'Cheese Breadsticks', category: 'Breads', price: 5.99, image: 'https://images.unsplash.com/photo-1548085202-b2d9a6021f45?w=400&q=80' },
  { id: 9, name: 'Baguette', category: 'Breads', price: 3.99, image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400&q=80' },
];

function Menu() {
  const [filter, setFilter] = useState('All');
  const [products] = useState(initialProducts);
  const location = useLocation();
  const navigate = useNavigate();

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

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert(`${product.name} added to cart!`);
  };

  const setCategoryFilter = (category) => {
    setFilter(category);
    if (category === 'All') {
      navigate('/menu', { replace: true });
    } else {
      navigate(`/menu?category=${category}`, { replace: true });
    }
  }

  return (
    <div>
      <h2 className="text-center">Our Menu</h2>
      
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
