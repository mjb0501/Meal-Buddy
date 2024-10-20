import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, Box, Container } from '@mui/material';
import { motion } from 'framer-motion'; 

const Home = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden', // Hide shapes that move outside the container
      }}
    >

      <motion.div
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
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
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #a1c4fd, #c2e9fb)',
          bottom: '20%',
          right: '20%',
          opacity: 0.7,
        }}
        animate={{ y: [0, -30, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #fbc2eb, #a6c1ee)',
          top: '40%',
          right: '25%',
          opacity: 0.7,
        }}
        animate={{ y: [0, 15, 0], rotate: [0, 90, 180] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #fad0c4, #ffd1ff)',
          bottom: '10%',
          left: '30%',
          opacity: 0.7,
        }}
        animate={{ y: [0, -10, 0], rotate: [0, 180, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
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
            background: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >

          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: '2.8rem',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Welcome to Meal Buddy!
          </Typography>
          <Typography
            variant="h2"
            component="span"
            sx={{
              fontSize: '2.8rem',
              ml: 1, 
            }}
          >
            🍽️🍔🍕🥗
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '1.25rem',
              lineHeight: 1.8,
              color: '#333',
              mb: 4,
            }}
          >
            Meal Buddy helps you track your eating habits and gives personalized recommendations for improvement.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  '&:hover': { background: '#4a00e0' },
                }}
              >
                Register
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  borderColor: '#2575fc',
                  color: '#2575fc',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  '&:hover': { borderColor: '#4a00e0', color: '#4a00e0' },
                }}
              >
                Login
              </Button>
            </motion.div>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Home;
