// src/components/UserInfoDisplay.js
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext'; // Ensure this is the correct path
import { Paper, Typography, Box } from '@mui/material';

const UserInfoDisplay = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth(); // Assuming you have user context to check authentication

  // Function to format height from inches to feet and inches (e.g., 6'2")
  const formatHeight = (heightInInches) => {
    const feet = Math.floor(heightInInches / 12);
    const inches = heightInInches % 12;
    return `${feet}'${inches}"`;
  };

  // Function to format the date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Removes the time component
  };

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

  return (
    <Paper
      elevation={4} // Adds shadow effect
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
        <Typography><strong>Calorie Intake:</strong> {userInfo.nutrientIntake} kcal</Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Daily Nutritional Data
      </Typography>

      {userInfo.dailyData.length > 0 ? (
        <Box component="ul" sx={{ padding: 0, listStyleType: 'none' }}>
          {userInfo.dailyData.map((data, index) => (
            <Box component="li" key={index} sx={{ mb: 1 }}>
              <Typography>
                <strong>Date:</strong> {formatDate(data.date)}
              </Typography>
              <Typography>
                <strong>Calories:</strong> {data.calories} kcal, 
                <strong> Protein:</strong> {data.protein}g, 
                <strong> Carbs:</strong> {data.carbs}g, 
                <strong> Fats:</strong> {data.fats}g
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>No daily nutritional data available.</Typography>
      )}
    </Paper>
  );
};

export default UserInfoDisplay;
