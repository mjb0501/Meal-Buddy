import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const DailyNutritionalData = () => {
  const [formData, setFormData] = useState({
    date: '', // Keep this field but it will be set automatically
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    sodium: '', // Added sodium field
    sugar: '',  // Added sugar field
  });

  // Set the current date when the component mounts
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Format to YYYY-MM-DD
    setFormData((prev) => ({ ...prev, date: currentDate }));
  }, []);

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
          Add Information About Your Meal
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Fill out the following about your last meal.  
          This data will add to your daily nutritional data which can be viewed
          under User Info.
        </Typography>

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

        <TextField
          label="Sodium (mg)" // New input for sodium
          type="number"
          name="sodium"
          value={formData.sodium}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Sugar (g)" // New input for sugar
          type="number"
          name="sugar"
          value={formData.sugar}
          onChange={handleChange}
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
