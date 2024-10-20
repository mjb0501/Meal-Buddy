// src/components/UserInfoDisplay.js
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext'; // Ensure this is the correct path

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
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!userInfo) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Age:</strong> {userInfo.age}</p>
      <p><strong>Height:</strong> {userInfo.height}</p>
      <p><strong>Weight:</strong> {userInfo.weight}</p>
      <p><strong>Gender:</strong> {userInfo.gender}</p>
      <p><strong>Nutrient Intake:</strong> {userInfo.nutrientIntake}</p>
      {/* Display daily data if needed */}
      <h3>Daily Nutritional Data</h3>
      {userInfo.dailyData.length > 0 ? (
        <ul>
          {userInfo.dailyData.map((data, index) => (
            <li key={index}>
              Date: {data.date} - Calories: {data.calories}, Protein: {data.protein}, Carbs: {data.carbs}, Fats: {data.fats}
            </li>
          ))}
        </ul>
      ) : (
        <p>No daily nutritional data available.</p>
      )}
    </div>
  );
};

export default UserInfoDisplay;
