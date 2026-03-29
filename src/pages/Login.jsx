import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Fields must not be empty');
      return;
    }
    setError('');
    
    // Verify user exists using registeredUsers array
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userMatch = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (userMatch) {
      // Login success
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUser', JSON.stringify({ name: userMatch.name, email: userMatch.email }));
      alert(`Welcome back, ${userMatch.name}!`);
      navigate('/menu');
      window.location.reload(); 
    } else {
      // Login failed
      setError('Invalid email or password. Have you registered yet?');
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">Login to QuickBite</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
      </form>
      <div className="text-center mt-2">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
