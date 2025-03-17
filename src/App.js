import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoanProvider } from './context/LoanContext';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import VirtualManager from './pages/VirtualManager';
import DocumentUpload from './pages/DocumentUpload';
import RecordResponse from './pages/RecordResponse';
import EligibilityCheck from './pages/EligibilityCheck';
import './App.css';

function App() {
  const appName = "LoanEase AI";

  return (
    <LoanProvider>
      <Router>
        <div className="App">
          <Navbar appName={appName} />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/virtual-manager" element={<VirtualManager />} />
            <Route path="/document-upload" element={<DocumentUpload />} />
            <Route path="/record-response" element={<RecordResponse />} />
            <Route path="/eligibility-check" element={<EligibilityCheck />} />
          </Routes>
        </div>
      </Router>
    </LoanProvider>
  );
}

export default App;