import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HospitalForm from './components/CreateHospital';
import HospitalList from './components/HospitalList';
import UpdateHospital from './components/HospitalUpdate';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/create" element={<HospitalForm />} />
        <Route path="/hospitals" element={<HospitalList />} />
        <Route path="/update/:id" element={<UpdateHospital />} /> 
        <Route path="/" element={<HospitalList />} />
      </Routes>
    </Router>
  );
}

export default App;