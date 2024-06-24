// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Accounts from './pages/Accounts';
import SignUp from './components/SignUp';
import Feedback from './components/Feedback';
import ExtraItems from './components/Extras.jsx';
import ComplaintPage from './pages/Complaint/Complaint.jsx';
import WeeklyMenu from './pages/MessMenu/MessMenu.jsx';
import Rebate from './components/Rebate.jsx';
import FeedbackList from './pages/feedbacklist/feedbacklist.jsx';
import Complaintlist from './pages/complaintlist/complaintlist.jsx'
// import { AuthProvider } from "../src/contexts/Authcontext.jsx";

function App() {
  const menuItems = [
    // ... your menu items
  ];

  return (

      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/mess-menu" element={<WeeklyMenu menuItems={menuItems} />} />
            <Route path="/complaint" element={<ComplaintPage />} />
            <Route path="/extras" element={<ExtraItems />} />
            <Route path="/rebate" element={<Rebate />} />
            <Route path="/feedbacklist" element={<FeedbackList />} />
            <Route path="/complaintlist" element={< Complaintlist/>} />
          </Routes>
        </div>
      </Router>
    // </AuthProvider>
  );
}

export default App;
