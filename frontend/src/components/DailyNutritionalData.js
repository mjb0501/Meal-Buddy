// src/components/DailyNutritionalData.js
import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

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
    <Paper
      elevation={4} // Adjust the elevation for shadow effect
      sx={{
        maxWidth: 500,
        mx: 'auto',
        p: 4,
        mt: 5,
        borderRadius: 3, // Rounded corners
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Daily Nutritional Data
        </Typography>

        <TextField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }} // Keeps label above the date field
          required
          fullWidth
        />

        <TextField
          label="Calories"
          type="number"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Protein (g)"
          type="number"
          name="protein"
          value={formData.protein}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Carbs (g)"
          type="number"
          name="carbs"
          value={formData.carbs}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Fats (g)"
          type="number"
          name="fats"
          value={formData.fats}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Submit Nutritional Data
        </Button>
      </Box>
    </Paper>
  );
};

export default DailyNutritionalData;
