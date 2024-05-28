import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuyerDashboard() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    area: '',
    bedrooms: '',
    bathrooms: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/rental-properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = async () => {
    try {
      const response = await axios.get('/rental-properties', { params: filters });
      setProperties(response.data);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  const handleInterest = async (propertyId) => {
    try {
      // Implement logic to express interest in property using propertyId
      // For example:
      // const response = await axios.post(`/interested-properties/${propertyId}`);
      // Handle success or failure accordingly
    } catch (error) {
      console.error('Error expressing interest:', error);
    }
  };

  return (
    <div>
      <h1>Buyer Dashboard</h1>
      <h2>Rental Properties</h2>
      <div>
        <label>Area:</label>
        <input type="text" name="area" value={filters.area} onChange={handleFilterChange} />
        <label>Bedrooms:</label>
        <input type="text" name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange} />
        <label>Bathrooms:</label>
        <input type="text" name="bathrooms" value={filters.bathrooms} onChange={handleFilterChange} />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            <p>Name: {property.property_name}</p>
            <p>Area: {property.area}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <button onClick={() => handleInterest(property.id)}>I'm Interested</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuyerDashboard;
