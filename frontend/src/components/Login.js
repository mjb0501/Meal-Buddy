// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      login(response.data.token);
      navigate('/user-info');
    } catch (error) {
      alert('Login failed: ' + error.response.data.message);
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px'}}>
      <Paper elevation={3} style={{padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column-reverse'}}>
        <form onSubmit={handleLogin}>
          <Typography variant="h4">Login</Typography>
          <br/>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br/>
          <br/>
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br/>
          <br/>
          <Button variant="contained" type="submit">Login</Button>
          <Button>Register</Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
