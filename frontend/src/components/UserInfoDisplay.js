import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext'; // Ensure this is the correct path
import { Paper, Typography, Box, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserInfoDisplay = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth(); // Assuming you have user context to check authentication

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/user-info');
        setUserInfo(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching user info');
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!userInfo) {
    return <Typography>Loading user information...</Typography>;
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
    if (gender === 'Male') {
      return 10 * weight + 6.25 * height - 5 * age + 5; // BMR formula for men
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161; // BMR formula for women
    }
  };

  const bmr = calculateBMR(weightInKg, heightInCm, userInfo.age, userInfo.gender);

  // Generate labels for the past 7 days (use available data or fill with blank labels)
  const today = new Date();
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
  }

  // Function to fill missing days with 0 values
  const fillMissingData = (nutrient) => {
    const dataMap = userInfo.dailyData.reduce((map, data) => {
      map[data.date.split('T')[0]] = data[nutrient]; // Create a map of date -> nutrient value
      return map;
    }, {});

    // Return the value for each day, or 0 if the day is not in the dataset
    return labels.map(label => dataMap[label] || 0);
  };

  // Chart data configurations for each nutrient
  const createChartData = (nutrient) => ({
    labels,
    datasets: [
      {
        label: `${nutrient} Intake`,
        data: fillMissingData(nutrient),
        backgroundColor: nutrient === 'calories' ? '#FF6384' : nutrient === 'protein' ? '#36A2EB' : nutrient === 'carbs' ? '#FFCE56' : '#4BC0C0',
      },
    ],
  });

  const options = (title) => ({
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend for a cleaner look
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure the Y-axis starts from zero
        title: {
          display: true,
          text: 'Amount',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
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
        <Typography><strong>Height:</strong> {formatHeight(userInfo.height)}</Typography> {/* Display in feet and inches */}
        <Typography><strong>Weight:</strong> {userInfo.weight} lbs</Typography>
        <Typography><strong>Gender:</strong> {userInfo.gender}</Typography>
        <Typography><strong>BMR (Basal Metabolic Rate):</strong> {Math.round(bmr)} kcal/day</Typography> {/* Updated BMR display */}
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
      </Grid>
    </Paper>
  );
};

export default UserInfoDisplay;
