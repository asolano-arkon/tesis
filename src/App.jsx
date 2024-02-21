import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/auth/Login';
import { ToastContainer } from 'react-toastify'; // Assuming you have installed react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the CSS for react-toastify

const App = () => {
  return (
    <Router>
      <>
        <ToastContainer theme="colored" position="bottom-right" autoClose={5000} closeOnClick={false} />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
