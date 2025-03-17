import React from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to LoanEase AI
        </Typography>
        <Typography variant="body1" paragraph>
          Our virtual branch manager will guide you through the loan application process.
          You'll interact through video, upload documents, and get instant eligibility decisions.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/virtual-manager')}
          >
            Start Loan Application
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Welcome;