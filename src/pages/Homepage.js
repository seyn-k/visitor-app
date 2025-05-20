import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Admin from './Admin';
import './Homepage.css';

function LogTable({ log, onBack }) {
  return (
    <div className="log-table-container">
      <h2>Visitor Entry Details</h2>
      <table className="log-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Apartment Number</th>
            <th>Vehicle Type</th>
            <th>Vehicle Number</th>
            <th>Purpose of Visit</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {log.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.username}</td>
              <td>{entry.apartmentNumber}</td>
              <td>{entry.vehicleType}</td>
              <td>{entry.vehicleNumber}</td>
              <td>{entry.purposeOfVisit}</td>
              <td>{entry.durationOfVisit}</td>
              <td>{entry.dateOfVisit}</td>
              <td>{entry.timeOfVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-btn" onClick={onBack}>Back to Home</button>
    </div>
  );
}

function Homepage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [visitorLog, setVisitorLog] = useState([]);
  const [showLogTable, setShowLogTable] = useState(false);

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setShowLogin(false);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAdmin(false);
    setShowLogin(true);
  };

  // Handle successful signup
  const handleSignupSuccess = (formData) => {
    setVisitorLog([...visitorLog, formData]);
    setShowSignup(false);
    setShowLogTable(true);
  };

  if (isAdmin) {
    return <Admin adminName="admin" onLogout={handleLogout} visitorLog={visitorLog} />;
  }

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />;
  }

  if (showSignup) {
    return <Signup onBack={() => setShowSignup(false)} onSignupSuccess={handleSignupSuccess} />;
  }

  if (showLogTable) {
    return <LogTable log={visitorLog.slice(-1)} onBack={() => setShowLogTable(false)} />;
  }

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to the Visitor Entry Tracking App</h1>
      <div className="homepage-buttons">
        <button className="homepage-btn login-btn" onClick={() => setShowLogin(true)}>Login</button>
        <button className="homepage-btn signup-btn" onClick={() => setShowSignup(true)}>Sign Up</button>
      </div>
    </div>
  );
}

export default Homepage;