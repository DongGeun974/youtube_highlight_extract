import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Save from './pages/Save'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/save" element={<Save />} />
    </Routes>
  );
};

export default App;
