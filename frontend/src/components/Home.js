// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';



const Home = () => (
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px'}}>
    <Paper elevation={3} style={{padding: '20px', display: 'flex', flexDirection: 'column'}}>
    <Typography variant="h2">Welcome to Meal Buddy</Typography>
    <Typography variant="body1">Meal Buddy is a web application that tracks your eating habits and makes reccomendations on how you can improve.<br/><br/>  To get started you can register <Link style={{ color: 'teal', fontWeight: 'bold'}} to="/register">here</Link>.<br/><br/>  If you already have an account click <Link style={{ color: 'teal', fontWeight: 'bold'}} to='/login'>here</Link>.</Typography>
  </Paper>
  </div>
);

export default Home;
