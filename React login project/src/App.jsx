// App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from './Register.jsx';
import Login from './login';
import Dashboard from './Dashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login  />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
