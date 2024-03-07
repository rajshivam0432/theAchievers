// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import PropTypes from 'prop-types'; 
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Accounts from './pages/Accounts';
import SignUp from './components/SignUp';
import Feedback from './components/Feedback';
import ExtraItems from './components/Extras.jsx';
import ComplaintPage from './pages/Complaint/Complaint.jsx';
import WeeklyMenu from './pages/MessMenu/MessMenu.jsx';
import Rebate from './components/Rebate.jsx';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  

  const ProtectedRoute = ({ element, ...rest }) => {
    return authenticated ? (
      element
    ) : (
      <Navigate to="/login" replace state={{ from: rest.location }} />
    );
  };
  ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };

  const menuItems = [
    // ... your menu items
  ];

  return (
    // Wrap your entire application with the Router component
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/Feedback"
            element={<ProtectedRoute element={<Feedback.jsx />} />}
          />
          <Route path="/" element={<Home />} />
          <Route
            path="/accounts"
            element={<ProtectedRoute element={<Accounts />} />}
          />
          <Route
            path="/mess-menu"
            element={
              <ProtectedRoute element={<WeeklyMenu menuItems={menuItems} />} />
            }
          />
          <Route
            path="/complaint"
            element={<ProtectedRoute element={<ComplaintPage />} />}
          />
          <Route
            path="/extras"
            element={<ProtectedRoute element={<ExtraItems />} />}
          />
          <Route
            path="/rebate"
            element={<ProtectedRoute element={<Rebate />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
