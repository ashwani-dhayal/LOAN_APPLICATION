import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Container, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VirtualManager = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const videoRef = useRef(null);

  // For demo purposes, we'll use placeholders for videos
  // In a real implementation, you would have actual video files
  const managerVideos = [
    "https://media.w3.org/2010/05/sintel/trailer_hd.mp4", // Placeholder video
    "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  ];

  const stepTitles = [
    "Introduction",
    "Personal Information",
    "Document Upload"
  ];

  const stepDescriptions = [
    "Welcome to our virtual branch. I'll help you with your loan application today.",
    "Let's gather some basic information about you to get started.",
    "Now we need to verify your identity and income. Please upload the required documents."
  ];

  useEffect(() => {
    // Load and play the current step's video
    if (videoRef.current) {
      videoRef.current.src = managerVideos[currentStep];
      videoRef.current.play().catch(e => console.log("Video play error:", e));
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < managerVideos.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/document-upload');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {stepTitles[currentStep]}
        </Typography>
        
        <Box sx={{ my: 3 }}>
          <video 
            ref={videoRef}
            width="100%" 
            height="auto"
            controls
            style={{ borderRadius: '8px' }}
          >
            Your browser does not support the video tag.
          </video>
        </Box>
        
        <Typography variant="body1" paragraph>
          {stepDescriptions[currentStep]}
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </Button>
          <Button 
            variant="contained"
            onClick={handleNext}
          >
            {currentStep < managerVideos.length - 1 ? 'Next' : 'Continue to Documents'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VirtualManager;