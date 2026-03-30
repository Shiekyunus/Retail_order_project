import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Order.css';

const Order = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total amount
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMode: 'credit', // 'credit', 'upi', 'netbanking'
    paymentDetails: '' // To hold fake card/upi ID
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      formErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.address.trim()) formErrors.address = 'Address is required';
    if (!formData.city.trim()) formErrors.city = 'City is required';
    if (!formData.pincode.trim()) formErrors.pincode = 'Pincode is required';
    
    if (formData.paymentMode === 'credit' && !formData.paymentDetails.trim()) {
      formErrors.paymentDetails = 'Card Number is required';
    } else if (formData.paymentMode === 'upi' && !formData.paymentDetails.trim()) {
      formErrors.paymentDetails = 'UPI ID is required';
    } else if (formData.paymentMode === 'netbanking' && !formData.paymentDetails.trim()) {
      formErrors.paymentDetails = 'Please select a bank';
    }

    return formErrors;
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert('Please check the form for errors and fill in all required fields.');
      return;
    }

    // Generate ID for history
    const orderId = `#QB-2024-${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`;

    // Save "lastOrder" to localStorage
    const orderDetails = {
      id: orderId,
      items: cart,
      deliveryInfo: formData,
      totalAmount: total,
      date: new Date().toISOString()
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    // Append to "ordersHistory"
    const existingHistory = JSON.parse(localStorage.getItem('ordersHistory')) || [];
    existingHistory.push(orderDetails);
    localStorage.setItem('ordersHistory', JSON.stringify(existingHistory));

    // Clear cart and redirect
    clearCart();
    navigate('/confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className="order-empty">
        <h2>Your cart is empty.</h2>
        <button className="btn-primary" onClick={() => navigate('/menu')}>Back to Menu</button>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h2>Checkout</h2>
      
      <div className="checkout-content">
        <form className="delivery-form" onSubmit={handleConfirmOrder}>
          <h3>Delivery Details</h3>
          
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="For order confirmation"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input 
                type="text" 
                name="pincode" 
                value={formData.pincode} 
                onChange={handleChange} 
              />
              {errors.pincode && <span className="error">{errors.pincode}</span>}
            </div>
          </div>

          <h3 className="section-title">Payment Mode</h3>
          <div className="payment-options">
            <label className="payment-radio">
              <input 
                type="radio" 
                name="paymentMode" 
                value="credit" 
                checked={formData.paymentMode === 'credit'} 
                onChange={(e) => setFormData(prev => ({...prev, paymentMode: e.target.value, paymentDetails: ''}))} 
              />
              Credit / Debit Card
            </label>
            <label className="payment-radio">
              <input 
                type="radio" 
                name="paymentMode" 
                value="upi" 
                checked={formData.paymentMode === 'upi'} 
                onChange={(e) => setFormData(prev => ({...prev, paymentMode: e.target.value, paymentDetails: ''}))} 
              />
              UPI
            </label>
            <label className="payment-radio">
              <input 
                type="radio" 
                name="paymentMode" 
                value="netbanking" 
                checked={formData.paymentMode === 'netbanking'} 
                onChange={(e) => setFormData(prev => ({...prev, paymentMode: e.target.value, paymentDetails: ''}))} 
              />
              Netbanking
            </label>
          </div>

          <div className="payment-details-box form-group">
            {formData.paymentMode === 'credit' && (
              <>
                <label>Card Number</label>
                <input 
                  type="text" 
                  name="paymentDetails" 
                  value={formData.paymentDetails} 
                  onChange={handleChange} 
                  placeholder="xxxx xxxx xxxx xxxx"
                />
              </>
            )}
            {formData.paymentMode === 'upi' && (
              <>
                <label>UPI ID</label>
                <input 
                  type="text" 
                  name="paymentDetails" 
                  value={formData.paymentDetails} 
                  onChange={handleChange} 
                  placeholder="example@upi"
                />
              </>
            )}
            {formData.paymentMode === 'netbanking' && (
              <>
                <label>Select Bank</label>
                <select name="paymentDetails" value={formData.paymentDetails} onChange={handleChange}>
                  <option value="">-- Choose your bank --</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                </select>
              </>
            )}
            {errors.paymentDetails && <span className="error">{errors.paymentDetails}</span>}
          </div>

          <button type="submit" className="btn-primary confirm-btn">
            Confirm Order
          </button>
          {/* TODO: POST /api/orders — send order to backend */}
        </form>

        <div className="order-summary-box">
          <h3>Your Order Summary</h3>
          <ul className="readonly-cart">
            {cart.map(item => (
              <li key={item.id} className="summary-item">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-totals">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Tax: ₹{tax.toFixed(2)}</p>
            <h3 className="final-total">Total: ₹{total.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
