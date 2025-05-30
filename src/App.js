import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar.js';
import "./components/navBar.css";
import { BackgroundBeamsDemo } from './components/aurora';
import PrivacyPolicy from './components/privacyPolicy/privacyPolicy';
import PageNotFound from './components/404Page/404Page';
import Placements from './components/placements/placements';
import Tests from './components/Tests Section/Frontend/testsFrontEnd';
import TestPage from './components/Tests Section/Frontend/TestPage/testPage';
import ResultPage from './components/Tests Section/Frontend/ResultPage/ResultPage';
import NammaCompilerMain from './components/NammaCompiler/main';


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
      <Route path="/tests" element={<Tests />} />
      <Route path="/nammaCompiler" element={<NammaCompilerMain />} />
      <Route path="/nammaCompiler/view/:code" element={<NammaCompilerMain />} />
      <Route path="/tests/:testID" element={<TestPage />} />
      <Route path='/tests/result' element={<ResultPage />} />
      <Route path="/home" element={<NavBar />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy />}></Route >
      <Route path="/placements" element={<Placements />}></Route>
      <Route path='*' element={<PageNotFound pathToNavigate={'/home'} />}></Route>
    </Routes >
  );
}

export default App;