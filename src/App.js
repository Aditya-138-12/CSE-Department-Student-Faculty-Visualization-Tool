import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navBar.js';
import "./components/navBar.css";
import { BackgroundBeamsDemo } from './components/aurora';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';

function App() {
  const [show, setShow] = useState(true);

  function showFun() {
    setShow(!show);
  }

  return (
    <Routes>
      <Route path="/" element={
        <>
          {show && <BackgroundBeamsDemo onClose={showFun} />}
          {!show && <Navigate to="/home" />}
        </>
      } />
      <Route path="/home" element={<NavBar />} />
    </Routes>
  );
}

export default App;