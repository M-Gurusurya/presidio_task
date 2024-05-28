import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; 
import './styles.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('buyer'); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    try {
      await axios.post('http://localhost:5000/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password,
        role,
      });
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="form-container"> {/* Apply form-container class */}
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {/* Form Inputs */}
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="role-select-container">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
            </select>
        </div>

        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>
      {/* Link to Login */}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
    </div>
  );
}

export default Register;
