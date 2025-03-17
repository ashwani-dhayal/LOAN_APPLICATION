import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Paper, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

import { useLoan } from '../context/LoanContext';



const RecordResponse = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { addResponse } = useLoan();

  
  const questions = [
    "Please introduce yourself and explain why you need this loan.",
    "What is your current employment status and monthly income?",
    "Do you have any existing loans or credit card debt?"
  ];

  const handleStartCapture = () => {
    setCapturing(true);
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startRecording();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = () => {
    if (webcamRef.current && webcamRef.current.video) {
      const stream = webcamRef.current.video.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm"
      });
      
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
      
      // Stop recording after 30 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          handleStopCapture();
        }
      }, 30000);
    }
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => [...prev, data]);
    }
  };

  const handleStopCapture = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setCapturing(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setRecordedChunks([]);
      setVideoURL(null);
    } else {
      navigate('/eligibility-check');
    }
  };

  useEffect(() => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    }
  }, [recordedChunks]);
  
  const handleRetake = () => {
    setRecordedChunks([]);
    setVideoURL(null);
  };
  
  const blob = new Blob(recordedChunks, { type: "video/webm" });
  addResponse(questions[currentQuestionIndex], blob);



  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Video Response
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          {questions[currentQuestionIndex]}
        </Typography>
        
        <Box sx={{ my: 3 }}>
          {videoURL ? (
            <video 
              src={videoURL} 
              controls 
              width="100%" 
              height="auto"
            />
          ) : (
            <Webcam
              audio={true}
              ref={webcamRef}
              width="100%"
              height="auto"
            />
          )}
        </Box>
        
        {countdown !== null && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Typography variant="h2">{countdown}</Typography>
          </Box>
        )}
        
        <Grid container spacing={2} justifyContent="center">
          {videoURL ? (
            <>
              <Grid item>
                <Button 
                  variant="outlined" 
                  onClick={handleRetake}
                >
                  Retake
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit'}
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item>
              <Button 
                variant="contained"
                color="primary"
                onClick={capturing ? handleStopCapture : handleStartCapture}
                disabled={countdown !== null}
              >
                {capturing ? 'Stop Recording' : 'Start Recording'}
              </Button>
              {capturing && (
                <CircularProgress 
                  size={24} 
                  sx={{ ml: 2 }} 
                />
              )}
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
  };
  
  export default RecordResponse;