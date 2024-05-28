import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/seller" element={<SellerDashboard />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
