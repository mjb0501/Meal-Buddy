import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'
import { Paper, Typography, Box, Grid, CircularProgress, Alert, Container } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { motion } from 'framer-motion';

// Register chart.js components and annotation plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, annotationPlugin);

const UserInfoDisplay = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/user-info');
        setUserInfo(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching user info');
      } finally {
        setLoading(false);
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
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading user information...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!userInfo) {
    return <Typography>No user information available.</Typography>;
  }

  const formatHeight = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  };

  const heightInCm = userInfo.height * 2.54;
  const weightInKg = userInfo.weight * 0.453592;

  const calculateBMR = (weight, height, age, gender) => {
    return gender === 'Male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  };

  const bmr = calculateBMR(weightInKg, heightInCm, userInfo.age, userInfo.gender);

  const tdee = bmr * (userInfo.activityLevel === 'Sedentary' ? 1.2 : userInfo.activityLevel === 'Lightly active' ? 1.375 : userInfo.activityLevel === "Moderately active" ? 1.55 : userInfo.activityLevel === "Very active" ? 1.725 : 1.9);

  const recommendedIntake = {
    calories: tdee,
    protein: weightInKg * 1.8, // Recommended daily protein in grams
    carbs: tdee * 0.5 / 4, // Recommended daily carbs in grams
    fats: tdee * 0.25 / 9, // Recommended daily fats in grams
    sodium: 2300, // Recommended daily sodium in mg
    sugar: userInfo.gender === "Male" ? 36 : 25, // Recommended daily sugar in grams
  };

  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const fillMissingData = (nutrient) => {
    const dataMap = userInfo.dailyData.reduce((map, data) => {
      map[data.date.split('T')[0]] = data[nutrient];
      return map;
    }, {});

    return labels.map((label) => dataMap[label] || 0);
  };

  const createChartData = (nutrient) => {
    const data = fillMissingData(nutrient);

    return {
      labels,
      datasets: [
        {
          label: `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} Intake`,
          data: data,
          backgroundColor: '#36A2EB', // Original color for all bars
        },
      ],
    };
  };

  const options = (title, nutrient) => {
    const recommended = recommendedIntake[nutrient];
  
    const yAxisLabel = nutrient === 'calories' ? 'Calories (kcal)' :
                       nutrient === 'protein' || nutrient === 'carbs' || nutrient === 'fats' || nutrient === 'sugar' ? 'Grams (g)' :
                       'Milligrams (mg)'; // For sodium
  
    return {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: title },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: recommended,
              yMax: recommended,
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 2,
              label: {
                enabled: true,
                content: `Recommended: ${recommended}`,
                position: 'center',
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
              },
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: yAxisLabel },
        },
        x: {
          title: { display: true, text: 'Date' },
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
          },
        },
      },
    };
  };

  return (
    <Container
      maxWidth="md"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', overflowY: 'auto', position: 'relative' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #FDC830, #F37335)',
          top: '10%',
          left: '10%',
          opacity: 0.3,
          zIndex: -1,
        }}
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #a1c4fd, #c2e9fb)',
          bottom: '15%',
          right: '10%',
          opacity: 0.3,
          zIndex: -1,
        }}
        animate={{ y: [0, 15, 0], rotate: [0, 90, 180] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <Paper
          elevation={4}
          sx={{
            maxWidth: 600,
            mx: 'auto',
            p: 3,
            mt: 5,
            borderRadius: 3,
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            User Information
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography>
              <strong>Username:</strong> {userInfo.username}
            </Typography>
            <Typography>
              <strong>Email:</strong> {userInfo.email}
            </Typography>
            <Typography>
              <strong>Age:</strong> {userInfo.age}
            </Typography>
            <Typography>
              <strong>Height:</strong> {formatHeight(userInfo.height)}
            </Typography>
            <Typography>
              <strong>Weight:</strong> {userInfo.weight} lbs
            </Typography>
            <Typography>
              <strong>Gender:</strong> {userInfo.gender}
            </Typography>
            <Typography>
              <strong>BMR (Basal Metabolic Rate):</strong> {Math.round(bmr)} kcal/day
            </Typography>
            <Typography>
              <strong>Activity Level:</strong> {userInfo.activityLevel || 'Not specified'}
            </Typography>
          </Box>

          <Typography variant="body1">
              Need to update your Information?{' '}
              <Link style={{ color: '#2575fc', fontWeight: 'bold' }} to="/update-info">
                Update it here
              </Link>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Past 7 Days Nutritional Data
          </Typography>
          <br/>
          <br/>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Bar data={createChartData('calories')} options={options('Calories Intake (Last 7 Days)', 'calories')} />
            </Grid>
            <Grid item xs={12}>
              <Bar data={createChartData('protein')} options={options('Protein Intake (Last 7 Days)', 'protein')} />
            </Grid>
            <Grid item xs={12}>
              <Bar data={createChartData('carbs')} options={options('Carbs Intake (Last 7 Days)', 'carbs')} />
            </Grid>
            <Grid item xs={12}>
              <Bar data={createChartData('fats')} options={options('Fats Intake (Last 7 Days)', 'fats')} />
            </Grid>
            <Grid item xs={12}>
              <Bar data={createChartData('sodium')} options={options('Sodium Intake (Last 7 Days)', 'sodium')} />
            </Grid>
            <Grid item xs={12}>
              <Bar data={createChartData('sugar')} options={options('Sugar Intake (Last 7 Days)', 'sugar')} />
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default UserInfoDisplay;

