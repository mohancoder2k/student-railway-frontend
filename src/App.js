import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddStudent from './AddStudent';
import ListStudents from './ListStudents';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddStudent />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/list" element={<ListStudents />} />
      </Routes>
    </Router>
  );
};

export default App;
