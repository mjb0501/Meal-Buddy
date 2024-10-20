import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
      });
      alert(response.data.message); // Show success message
      navigate('/login'); // Redirect to login page
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Registration failed!';
      alert(errorMessage); // Show error message
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px'}}>
      <Paper elevation={3} style={{padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <form onSubmit={handleRegister}>
          <Typography variant="h4" sx={{ mb: 2 }}>Register</Typography>

          <TextField
            label="Username"
            variant="outlined"
            size="small"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Email"
            variant="outlined"
            size="small"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />

          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
