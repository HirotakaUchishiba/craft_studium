import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizCreation from './components/QuizCreation';
import SelfIntroduction from './components/SelfIntroduction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizCreation/>} />
        <Route path="/self-introduction" element={<SelfIntroduction />} />
      </Routes>
    </Router>
  );
}

export default App;