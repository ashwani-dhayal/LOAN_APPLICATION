import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = ({ appName }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {appName || "AI Loan Manager"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;