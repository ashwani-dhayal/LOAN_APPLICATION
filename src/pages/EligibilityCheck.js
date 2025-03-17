import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Paper, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EligibilityCheck = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    // Simulate eligibility check
    const timer = setTimeout(() => {
      // Mock decision logic
      const decisions = [
        { status: 'approved', message: 'Congratulations! Your loan has been pre-approved.', details: 'You are eligible for a loan of up to ₹200,000 with an interest rate of 12% per annum.' },
        { status: 'rejected', message: 'We cannot approve your loan at this time.', details: 'Reason: Insufficient income documentation. Your monthly income does not meet our minimum requirement.' },
        { status: 'more-info', message: 'We need additional information.', details: 'Please provide your latest 3 months bank statements to proceed with your application.' }
      ];
      
      // For demo purposes, randomly select a decision
      const randomDecision = decisions[Math.floor(Math.random() * decisions.length)];
      setResult(randomDecision);
      setIsChecking(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getStatusColor = () => {
    if (!result) return 'primary';
    
    switch (result.status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'more-info':
        return 'warning';
      default:
        return 'primary';
    }
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Loan Eligibility Check
        </Typography>
        
        {isChecking ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 8 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 3 }}>
              Checking your eligibility...
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              We're analyzing your documents and responses to determine your loan eligibility.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ my: 4 }}>
            <Box 
              sx={{ 
                p: 3, 
                bgcolor: `${getStatusColor()}.lighter`, 
                borderRadius: 2,
                border: 1,
                borderColor: `${getStatusColor()}.main`
              }}
            >
              <Typography variant="h5" sx={{ color: `${getStatusColor()}.main` }}>
                {result?.message}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {result?.details}
              </Typography>
            </Box>
            
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => navigate('/')}
                >
                  Start New Application
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {result?.status === 'approved' ? (
                  <Button 
                    variant="contained" 
                    color="success"
                    fullWidth
                  >
                    Complete Application
                  </Button>
                ) : result?.status === 'more-info' ? (
                  <Button 
                    variant="contained" 
                    color="warning"
                    fullWidth
                  >
                    Upload Additional Documents
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => navigate('/')}
                  >
                    Return to Home
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default EligibilityCheck;