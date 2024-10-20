import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';

const DailyNutritionalData = () => {
  const [formData, setFormData] = useState({
    date: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    sodium: '',
    sugar: '',
  });

  // Set the current date when the component mounts
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Format to YYYY-MM-DD
    setFormData((prev) => ({ ...prev, date: currentDate }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensures the input is not negative
    if (value >= 0) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/add-daily-data', formData);
      alert(response.data.message);
    } catch (error) {
      alert('Error updating nutritional data: ' + error.response.data.message);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      <motion.div
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)',
          top: '10%',
          left: '15%',
          opacity: 0.7,
        }}
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #a1c4fd, #c2e9fb)',
          bottom: '20%',
          right: '20%',
          opacity: 0.7,
        }}
        animate={{ y: [0, -30, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: '40px',
            borderRadius: '15px',
            background: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 3,
            }}
          >
            Add Information About Your Meal
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '1.25rem',
              lineHeight: 1.8,
              color: '#333',
              mb: 4,
            }}
          >
            Fill out the following about your last meal.
            This data will add to your daily nutritional data, which can be viewed
            under User Info.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Calories"
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              required
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Protein (g)"
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              required
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Carbs (g)"
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              required
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }} 
            />

            <TextField
              label="Fats (g)"
              type="number"
              name="fats"
              value={formData.fats}
              onChange={handleChange}
              required
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Sodium (mg)"
              type="number"
              name="sodium"
              value={formData.sodium}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }} 
            />

            <TextField
              label="Sugar (g)"
              type="number"
              name="sugar"
              value={formData.sugar}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }} 
            />

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  '&:hover': { background: '#4a00e0' },
                  mt: 2,
                }}
              >
                Submit Nutritional Data
              </Button>
            </motion.div>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default DailyNutritionalData;
