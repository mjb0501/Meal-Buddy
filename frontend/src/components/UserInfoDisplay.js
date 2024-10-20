import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { Paper, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserInfoDisplay = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Assuming you have user context to check authentication

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get('/user-info');
        setUserInfo(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching user info');
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading user information...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!userInfo) {
    return <Typography>No user information available.</Typography>;
  }

  // Function to convert height in inches to feet and inches format
  const formatHeight = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  };

  // Convert height to cm and weight to kg for BMR calculation
  const heightInCm = userInfo.height * 2.54; // 1 inch = 2.54 cm
  const weightInKg = userInfo.weight * 0.453592; // 1 lb = 0.453592 kg

  // Calculate BMR using the Mifflin-St Jeor Equation
  const calculateBMR = (weight, height, age, gender) => {
    return gender === 'Male'
      ? 10 * weight + 6.25 * height - 5 * age + 5 // BMR formula for men
      : 10 * weight + 6.25 * height - 5 * age - 161; // BMR formula for women
  };

  const bmr = calculateBMR(weightInKg, heightInCm, userInfo.age, userInfo.gender);

  // Generate labels for the past 7 days
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  });

  // Function to fill missing days with 0 values
  const fillMissingData = (nutrient) => {
    const dataMap = userInfo.dailyData.reduce((map, data) => {
      map[data.date.split('T')[0]] = data[nutrient]; // Create a map of date -> nutrient value
      return map;
    }, {});

    return labels.map(label => dataMap[label] || 0);
  };

  // Chart data configurations for each nutrient
  const createChartData = (nutrient) => ({
    labels,
    datasets: [{
      label: `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} Intake`,
      data: fillMissingData(nutrient),
      backgroundColor: nutrient === 'calories' ? '#FF6384' : 
                       nutrient === 'protein' ? '#36A2EB' : 
                       nutrient === 'carbs' ? '#FFCE56' : 
                       nutrient === 'fats' ? '#4BC0C0' :
                       nutrient === 'sodium' ? '#FF9F40' : 
                       '#9966FF', // Add distinct colors for sodium and sugar
    }],
  });

  const options = (title) => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Amount' },
      },
      x: {
        title: { display: true, text: 'Date' },
      },
    },
  });

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        mt: 5,
        borderRadius: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        User Information
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography><strong>Username:</strong> {userInfo.username}</Typography>
        <Typography><strong>Email:</strong> {userInfo.email}</Typography>
        <Typography><strong>Age:</strong> {userInfo.age}</Typography>
        <Typography><strong>Height:</strong> {formatHeight(userInfo.height)}</Typography>
        <Typography><strong>Weight:</strong> {userInfo.weight} lbs</Typography>
        <Typography><strong>Gender:</strong> {userInfo.gender}</Typography>
        <Typography><strong>BMR (Basal Metabolic Rate):</strong> {Math.round(bmr)} kcal/day</Typography>
        <Typography><strong>Activity Level:</strong> {userInfo.activityLevel || 'Not specified'}</Typography> {/* Display activity level */}
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Past 7 Days Nutritional Data
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Bar data={createChartData('calories')} options={options('Calories Intake (Last 7 Days)')} />
        </Grid>
        <Grid item xs={12}>
          <Bar data={createChartData('protein')} options={options('Protein Intake (Last 7 Days)')} />
        </Grid>
        <Grid item xs={12}>
          <Bar data={createChartData('carbs')} options={options('Carbs Intake (Last 7 Days)')} />
        </Grid>
        <Grid item xs={12}>
          <Bar data={createChartData('fats')} options={options('Fats Intake (Last 7 Days)')} />
        </Grid>
        <Grid item xs={12}>
          <Bar data={createChartData('sodium')} options={options('Sodium Intake (Last 7 Days)')} />
        </Grid>
        <Grid item xs={12}>
          <Bar data={createChartData('sugar')} options={options('Sugar Intake (Last 7 Days)')} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserInfoDisplay;
