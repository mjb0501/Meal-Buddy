// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this is the correct path to your auth context

const PrivateRoute = ({ element }) => {
  const { user } = useAuth(); // Assuming your context provides a 'user' object when logged in

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
