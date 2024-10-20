// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, logout } = useAuth(); // Access user state and logout function

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Determine the pages to display based on authentication status
  const pages = user 
    ? [
        'Home', 
        'Update Info', 
        'Add Meal', 
        'User Info', 
        { name: 'Logout', action: logout }
      ]
    : [
        'Home', 
        'Login', 
        'Register'
      ];

  return (
    <AppBar position="static" sx={{ backgroundColor: 'lightgrey', color: 'teal' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => {
                const pageName = typeof page === 'object' ? page.name : page; // Safely get the name
                return (
                  <MenuItem key={pageName} onClick={handleCloseNavMenu}>
                    <Link
                      to={pageName === 'Home' ? '/' : `/${pageName.replace(/\s+/g, '-').toLowerCase()}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={typeof page === 'object' ? page.action : undefined} // Call the action if it exists (for logout)
                    >
                      <Typography sx={{ textAlign: 'center' }}>{pageName}</Typography>
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              const pageName = typeof page === 'object' ? page.name : page; // Safely get the name
              return (
                <Link
                  to={pageName === 'Home' ? '/' : `/${pageName.replace(/\s+/g, '-').toLowerCase()}`}
                  key={pageName}
                  style={{ textDecoration: 'none' }}
                  onClick={typeof page === 'object' ? page.action : undefined} // Call the action if it exists (for logout)
                >
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'teal', display: 'block' }}>
                    {pageName}
                  </Button>
                </Link>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
