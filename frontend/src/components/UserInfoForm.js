import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Typography, Box, Paper } from '@mui/material';

const UserInfoForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    heightFeet: '',
    heightInches: '',
    weight: '',
    age: '',
    gender: '',
    nutrientIntake: '',
  });

  const [errors, setErrors] = useState({}); // State for input errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Reset error for the specific field on change
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
    if (!formData.nutrientIntake || isNaN(formData.nutrientIntake) || formData.nutrientIntake <= 0) {
      newErrors.nutrientIntake = 'Nutrient intake must be a positive number.';
    }

    setErrors(newErrors); // Update the errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      alert('Please correct the errors before submitting.');
      return; // Prevent form submission if there are validation errors
    }

    const totalHeight = parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches); // Convert height to inches

    try {
      await axios.post('/update-info', { ...formData, height: totalHeight });
      alert('User information updated successfully!');
      navigate('/add-daily-data');
    } catch (error) {
      alert('Error updating information: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 500, mx: 'auto', p: 4, mt: 5, borderRadius: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
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
          label="Weight (lbs)"  // Updated label to indicate weight is in pounds
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

        <Typography variant="h6" sx={{ mb: 1 }}>
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

        <TextField
          name="nutrientIntake"
          label="Nutrient Intake (Calories)"
          type="number"
          value={formData.nutrientIntake}
          onChange={handleChange}
          error={!!errors.nutrientIntake}
          helperText={errors.nutrientIntake}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Update Info
        </Button>
      </form>
    </Paper>
  );
};

export default UserInfoForm;
