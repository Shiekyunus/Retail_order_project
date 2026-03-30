import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const historicalOrders = JSON.parse(localStorage.getItem('ordersHistory')) || [];
    // Sort orders by most recent first
    historicalOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    setOrders(historicalOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="history-empty">
        <h2>No Order History Found</h2>
        <p>You haven't placed any orders yet.</p>
        <button className="btn-primary mt-4" onClick={() => navigate('/menu')}>Start Ordering</button>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h2>Your Order History</h2>

      <div className="history-list">
        {orders.map((order, index) => (
          <div key={index} className="history-card">
            <div className="history-header">
              <h3>Order {order.id}</h3>
              <span className="history-date">
                {new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            <div className="history-body">
              <div className="history-items">
                <h4>Items Ordered</h4>
                <ul>
                  {order.items.map(item => (
                    <li key={item.id}>
                      {item.quantity}x {item.name}{' '}
                      <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="history-summary">
                <h4>Order Summary</h4>
                <div className="summary-row">
                  <span>Total Amount:</span>
                  <span className="total-val">₹{order.totalAmount.toFixed(2)}</span>
                </div>
                {order.region && (
                  <div className="summary-row">
                    <span>Delivery Region:</span>
                    <span className="payment-val">{order.region}</span>
                  </div>
                )}
                {order.deliveryInfo?.paymentMode && (
                  <div className="summary-row">
                    <span>Payment Mode:</span>
                    <span className="payment-val">{order.deliveryInfo.paymentMode.toUpperCase()}</span>
                  </div>
                )}
                {order.deliveryInfo?.email && (
                  <div className="summary-row">
                    <span>Sent to:</span>
                    <span>{order.deliveryInfo.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
