
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';

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
      alert(response.data.message); 
      navigate('/login'); 
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Registration failed!';
      alert(errorMessage); 
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
          <form onSubmit={handleRegister}>
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
              Register
            </Typography>

            <TextField
              label="Username"
              variant="outlined"
              size="small"
              type="text"
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
                }}
              >
                Register
              </Button>
            </motion.div>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Register;
