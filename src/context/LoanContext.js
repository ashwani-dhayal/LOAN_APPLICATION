// src/context/LoanContext.js
import React, { createContext, useState, useContext } from 'react';

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [userDocs, setUserDocs] = useState({
    aadhar: null,
    pan: null,
    income: null
  });
  
  const [userResponses, setUserResponses] = useState([]);
  
  const [extractedInfo, setExtractedInfo] = useState({});
  
  const addDocument = (type, data) => {
    setUserDocs(prev => ({
      ...prev,
      [type]: data
    }));
  };
  
  const addResponse = (question, videoBlob) => {
    setUserResponses(prev => [...prev, { question, videoBlob }]);
  };
  
  const updateExtractedInfo = (info) => {
    setExtractedInfo(prev => ({
      ...prev,
      ...info
    }));
  };
  
  return (
    <LoanContext.Provider 
      value={{ 
        userDocs, 
        addDocument, 
        userResponses, 
        addResponse,
        extractedInfo,
        updateExtractedInfo
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => useContext(LoanContext);