import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center', background: 'white' }}>
      <div style={{ height: '150px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px', backgroundColor: '#f4f4f4' }}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span>{product.name} Image</span>
        )}
      </div>
      <h3>{product.name}</h3>
      <p style={{ color: '#E63946', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
      <button className="btn" onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
