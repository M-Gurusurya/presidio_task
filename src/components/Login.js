import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Navbar from './Navbar'; 
import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.getItem('email', email);
    localStorage.getItem('password', password);
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password
      });
      if (response.status === 200) {
        const data = response.data;
        const role = data.role;
        localStorage.setItem('role', role);
        console.log("hello",role);
        console.log(localStorage.getItem('role'));
        if (role === "buyer") {
            navigate('/buyer');
          } else if (role === "seller"){
            navigate('/seller');
          }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
    </div>
  );
}

export default Login;
