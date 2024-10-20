// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import UserInfoForm from './components/UserInfoForm';
import UserInfoDisplay from './components/UserInfoDisplay';
import Home from './components/Home';
import DailyNutritionalData from './components/DailyNutritionalData';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-user-info" element={<PrivateRoute element={<UserInfoForm />} />} />
          <Route path="/add-daily-data" element={<PrivateRoute element={<DailyNutritionalData />} />} />
          <Route path="/user-info" element={<PrivateRoute element={<UserInfoDisplay />} />} />
        </Routes>
      </Router>
  );
}

export default App;
