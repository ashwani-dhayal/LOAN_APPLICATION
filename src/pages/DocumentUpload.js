import React, { useState, useRef } from 'react';
import { Box, Button, Typography, Container, Paper, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoan } from '../context/LoanContext';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [documentType, setDocumentType] = useState('aadhar'); // aadhar, pan, income
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  
  // Using the loan context
  const { addDocument, updateExtractedInfo } = useLoan();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setExtractedData(null);
    }
  };

  const handleCameraCapture = () => {
    // In a real implementation, we would open the camera
    alert("Camera functionality would open here");
  };

  const processDocument = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    // Simulate document processing with a timeout
    setTimeout(() => {
      // Mock extracted data based on document type
      const mockData = {
        aadhar: { name: "John Doe", dob: "01/01/1990", number: "XXXX-XXXX-1234" },
        pan: { name: "JOHN DOE", number: "ABCDE1234F" },
        income: { monthlyIncome: "₹45,000", employmentType: "Salaried" }
      };
      
      // Set the extracted data in the component state
      setExtractedData(mockData[documentType]);
      
      // Also update the context with the document and extracted info
      addDocument(documentType, selectedFile);
      updateExtractedInfo(mockData[documentType]);
      
      setIsUploading(false);
    }, 2000);
  };

  const handleNext = () => {
    navigate('/record-response');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Document Upload
        </Typography>
        
        <Box sx={{ my: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button 
                variant={documentType === 'aadhar' ? 'contained' : 'outlined'}
                fullWidth
                onClick={() => setDocumentType('aadhar')}
              >
                Aadhaar Card
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                variant={documentType === 'pan' ? 'contained' : 'outlined'}
                fullWidth
                onClick={() => setDocumentType('pan')}
              >
                PAN Card
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                variant={documentType === 'income' ? 'contained' : 'outlined'}
                fullWidth
                onClick={() => setDocumentType('income')}
              >
                Income Proof
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ my: 3, textAlign: 'center' }}>
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Document preview" 
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} 
            />
          ) : (
            <Box 
              sx={{ 
                height: '200px', 
                border: '2px dashed #ccc', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body1" color="textSecondary">
                No document selected
              </Typography>
            </Box>
          )}
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button 
              variant="outlined"
              fullWidth
              onClick={() => fileInputRef.current.click()}
            >
              Select File
            </Button>
            <input 
              type="file" 
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button 
              variant="outlined"
              fullWidth
              onClick={handleCameraCapture}
            >
              Use Camera
            </Button>
          </Grid>
        </Grid>
        
        {selectedFile && !extractedData && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              onClick={processDocument}
              disabled={isUploading}
            >
              {isUploading ? <CircularProgress size={24} /> : 'Process Document'}
            </Button>
          </Box>
        )}
        
        {extractedData && (
          <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom>
              Extracted Information
            </Typography>
            
            <Grid container spacing={2}>
              {Object.entries(extractedData).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                  <Typography variant="body1">
                    {value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ mt: 3, textAlign: 'right' }}>
              <Button 
                variant="contained" 
                onClick={handleNext}
              >
                Continue
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default DocumentUpload;