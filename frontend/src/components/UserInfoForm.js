import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';

const UserInfoForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    heightFeet: '',
    heightInches: '',
    weight: '',
    age: '',
    gender: '',
    activityLevel: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.heightFeet || isNaN(formData.heightFeet) || formData.heightFeet <= 0) {
      newErrors.heightFeet = 'Feet must be a positive number.';
    }
    if (isNaN(formData.heightInches) || formData.heightInches < 0 || formData.heightInches >= 12) {
      newErrors.heightInches = 'Inches must be between 0 and 11.';
    }
    if (!formData.weight || isNaN(formData.weight) || formData.weight <= 0) {
      newErrors.weight = 'Weight must be a positive number.';
    }
    if (!formData.age || isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Age must be a positive number.';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required.';
    }
    if (!formData.activityLevel) {
      newErrors.activityLevel = 'Activity level is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      alert('Please correct the errors before submitting.');
      return;
    }

    const totalHeight = parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches);

    try {
      await axios.post('/update-info', {
        ...formData,
        height: totalHeight,
      });
      alert('User information updated successfully!');
      navigate('/add-daily-data');
    } catch (error) {
      alert('Error updating information: ' + (error.response ? error.response.data.message : error.message));
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
            variant="h4"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 3,
            }}
          >
            Update User Info
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                name="heightFeet"
                label="Height (Feet)"
                type="number"
                value={formData.heightFeet}
                onChange={handleChange}
                error={!!errors.heightFeet}
                helperText={errors.heightFeet}
                fullWidth
              />
              <TextField
                name="heightInches"
                label="Height (Inches)"
                type="number"
                value={formData.heightInches}
                onChange={handleChange}
                error={!!errors.heightInches}
                helperText={errors.heightInches}
                fullWidth
              />
            </Box>

            <TextField
              name="weight"
              label="Weight (lbs)"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              error={!!errors.weight}
              helperText={errors.weight}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              name="age"
              label="Age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 2,
              }}
            >
              Gender:
            </Typography>

            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
            {errors.gender && <Typography color="error">{errors.gender}</Typography>}

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="activity-level-label">Activity Level</InputLabel>
              <Select
                labelId="activity-level-label"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                error={!!errors.activityLevel}
              >
                <MenuItem value="">
                  <em>Select Activity Level</em>
                </MenuItem>
                <MenuItem value="Sedentary">Sedentary</MenuItem>
                <MenuItem value="Lightly active">Lightly active</MenuItem>
                <MenuItem value="Moderately active">Moderately active</MenuItem>
                <MenuItem value="Very active">Very active</MenuItem>
                <MenuItem value="Super active">Super active</MenuItem>
              </Select>
              {errors.activityLevel && <Typography color="error">{errors.activityLevel}</Typography>}
            </FormControl>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  '&:hover': { background: '#4a00e0' },
                }}
              >
                Update Info
              </Button>
            </motion.div>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default UserInfoForm;
