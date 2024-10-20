// src/components/DailyNutritionalData.js
import React, { useState } from 'react';
import axios from '../utils/axiosInstance';

const DailyNutritionalData = () => {
  const [formData, setFormData] = useState({
    date: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/add-daily-data', formData);
      alert(response.data.message); // Show success message
    } catch (error) {
      alert('Error updating nutritional data: ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Daily Nutritional Data</h2>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="calories"
        placeholder="Calories"
        value={formData.calories}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="protein"
        placeholder="Protein (g)"
        value={formData.protein}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="carbs"
        placeholder="Carbs (g)"
        value={formData.carbs}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="fats"
        placeholder="Fats (g)"
        value={formData.fats}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit Nutritional Data</button>
    </form>
  );
};

export default DailyNutritionalData;
