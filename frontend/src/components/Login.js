// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';

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
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >

      <motion.div
        style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)',
          top: '10%',
          left: '15%',
          opacity: 0.7,
        }}
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #fbc2eb, #a6c1ee)',
          bottom: '15%',
          right: '20%',
          opacity: 0.7,
        }}
        animate={{ y: [0, 15, 0], rotate: [0, 90, 180] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: '40px',
            borderRadius: '15px',
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <form onSubmit={handleLogin}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 3,
              }}
            >
              Login
            </Typography>

            <TextField
              label="Email"
              variant="outlined"
              size="small"
              type="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                  color: '#fff',
                  fontWeight: 'bold',
                  '&:hover': { background: '#4a00e0' },
                  mb: 2,
                }}
              >
                Login
              </Button>
            </motion.div>

            <Typography variant="body1">
              Don't have an account?{' '}
              <Link style={{ color: '#2575fc', fontWeight: 'bold' }} to="/register">
                Register here
              </Link>
            </Typography>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
