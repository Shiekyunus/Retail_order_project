import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import '../styles/Confirmation.css';

const Confirmation = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({filename: 'quickbite-receipt.pdf'});

  // Generate a fake Order ID
  const generateOrderID = () => {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    return `#QB-2024-${randomHex.padStart(6, '0')}`;
  };

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="confirmation-container no-order">
        <h2>No Recent Orders Found</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const { deliveryInfo, items, totalAmount } = order;

  return (
    <div className="confirmation-container">
      <div className="success-message">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for shopping with QuickBite.</p>
        <h2 className="order-id">Order ID: {generateOrderID()}</h2>
      </div>

      <div className="receipt-invoice" ref={targetRef}>
        <div className="receipt-header">
          <h2>QuickBite Invoice</h2>
          <p>Order ID: {generateOrderID()}</p>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
        </div>

        <div className="receipt-customer">
          <div className="customer-info-box">
            <h4>Billed To:</h4>
            <p><strong>{deliveryInfo.name}</strong></p>
            <p>{deliveryInfo.phone}</p>
            {deliveryInfo.email && <p>{deliveryInfo.email}</p>}
          </div>
          <div className="customer-delivery-box">
            <h4>Delivery Info:</h4>
            {order.region && <p><strong>Region:</strong> {order.region}</p>}
            <p>{deliveryInfo.address}</p>
            <p>{deliveryInfo.city} - {deliveryInfo.pincode}</p>
          </div>
        </div>

        <table className="receipt-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="receipt-summary">
          <div className="summary-payment">
            <h4>Payment</h4>
            {deliveryInfo.paymentMode && (
              <>
                <p><strong>Mode:</strong> {deliveryInfo.paymentMode.toUpperCase()}</p>
                {deliveryInfo.paymentDetails && (
                  <p><strong>Details:</strong> {deliveryInfo.paymentMode === 'credit' ? `**** **** **** ${deliveryInfo.paymentDetails.slice(-4)}` : deliveryInfo.paymentDetails}</p>
                )}
              </>
            )}
          </div>
          <div className="summary-totals-box">
            <div className="totals-row">
              <span>Subtotal:</span>
              <span>₹{(totalAmount / 1.05).toFixed(2)}</span>
            </div>
            <div className="totals-row">
              <span>Tax (5%):</span>
              <span>₹{(totalAmount - (totalAmount / 1.05)).toFixed(2)}</span>
            </div>
            <div className="totals-row grand-total">
              <span>Total Paid:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="receipt-footer">
          <p>Thank you for choosing QuickBite!</p>
        </div>
      </div>

      {deliveryInfo.email && (
        <div className="email-alert">
          <p>📧 A detailed confirmation email has been sent to <strong>{deliveryInfo.email}</strong>.</p>
        </div>
      )}

      <div className="confirmation-actions">
        <button className="btn-secondary" onClick={() => toPDF()}>
          📄 Download Receipt (PDF)
        </button>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
