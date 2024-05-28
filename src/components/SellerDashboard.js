import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [propertyData, setPropertyData] = useState({
    property_name: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    hospitals_nearby: '',
    colleges_nearby: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/properties');
      setProperties(response.data);
    } catch (error) {
      setError('Failed to fetch properties');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/properties', propertyData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProperties([...properties, response.data]);
      setPropertyData({
        property_name: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        hospitals_nearby: '',
        colleges_nearby: ''
      });
    } catch (error) {
      setError('Failed to add property');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProperties(properties.filter(property => property.id !== id));
    } catch (error) {
      setError('Failed to delete property');
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Seller Dashboard</h1>
      <h2 className="dashboard-subheading">My Properties</h2>
      {error && <div className="error">{error}</div>}
      <ul className="property-list">
        {properties.map(property => (
          <li key={property.id} className="property-item">
            <p>Name: {property.property_name}</p>
            <p>Area: {property.area}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Hospitals Nearby: {property.hospitals_nearby}</p>
            <p>Colleges Nearby: {property.colleges_nearby}</p>
            <button onClick={() => handleDelete(property.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2 className="dashboard-subheading">Add New Property</h2>
      <form className="add-property-form" onSubmit={handleSubmit}>
        <label>Property Name:</label>
        <input type="text" name="property_name" value={propertyData.property_name} onChange={handleInputChange} required />
        <input type="text" name="area" placeholder="Area" value={propertyData.area} onChange={handleInputChange} />
        <input type="text" name="bedrooms" placeholder="Bedrooms" value={propertyData.bedrooms} onChange={handleInputChange} />
        <input type="text" name="bathrooms" placeholder="Bathrooms" value={propertyData.bathrooms} onChange={handleInputChange} />
        <input type="text" name="hospitals_nearby" placeholder="Hospitals Nearby" value={propertyData.hospitals_nearby} onChange={handleInputChange} />
        <input type="text" name="colleges_nearby" placeholder="Colleges Nearby" value={propertyData.colleges_nearby} onChange={handleInputChange} />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default SellerDashboard;
