import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext';

const ResponsiveAppBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logout } = useAuth();

  // Toggle Drawer
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  // Pages based on user authentication
  const pages = user
    ? ['Home', 'Add Meal', 'User Info', { name: 'Logout', action: logout }]
    : ['Home', 'Login', 'Register'];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'lightgrey', color: 'teal' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Hamburger button */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={toggleDrawer}
                sx={{ color: 'inherit' }}
                aria-label="open menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Fullscreen Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => {
                const pageName = typeof page === 'object' ? page.name : page;
                return (
                  <Link
                    to={pageName === 'Home' ? '/' : `/${pageName.replace(/\s+/g, '-').toLowerCase()}`}
                    key={pageName}
                    style={{ textDecoration: 'none' }}
                    onClick={typeof page === 'object' ? page.action : undefined}
                  >
                    <Button
                      sx={{
                        my: 2,
                        color: 'teal',
                        display: 'block',
                        '&:hover': { background: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' },
                      }}
                    >
                      {pageName}
                    </Button>
                  </Link>
                );
              })}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar (Drawer) for smaller screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#f3f4f6',
            width: 250,
            paddingTop: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
          },
        }}
      >
        {/* Close Button inside Drawer (on the left side) */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <IconButton onClick={toggleDrawer} sx={{ color: 'turquoise' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {pages.map((page) => {
          const pageName = typeof page === 'object' ? page.name : page;
          return (
            <Link
              to={pageName === 'Home' ? '/' : `/${pageName.replace(/\s+/g, '-').toLowerCase()}`}
              key={pageName}
              style={{ textDecoration: 'none' }}
              onClick={typeof page === 'object' ? page.action : undefined}
            >
              <Button
                onClick={toggleDrawer}
                sx={{
                  my: 2,
                  width: '100%',
                  color: 'white',
                  background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #4a00e0, #8e2de2)',
                  },
                }}
              >
                {pageName}
              </Button>
            </Link>
          );
        })}
      </Drawer>
    </>
  );
};

export default ResponsiveAppBar;
