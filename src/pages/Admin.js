import React, { useState, useRef, useEffect } from 'react';
import './Admin.css';

function Admin({ adminName, onLogout, visitorLog }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <nav className="admin-navbar">
        <span className="admin-navbar-title">Admin Dashboard</span>
        <div className="admin-navbar-profile" ref={dropdownRef}>
          <span
            className="admin-navbar-user"
            onClick={() => setDropdownOpen((open) => !open)}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            Welcome, {adminName} &#x25BC;
          </span>
          {dropdownOpen && (
            <div className="admin-dropdown">
              <button className="admin-dropdown-item">Profile</button>
              <button
                className="admin-dropdown-item"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="admin-content">
        <h2>Visitor Log</h2>
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
            {visitorLog.map((entry, idx) => (
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
      </div>
    </div>
  );
}

export default Admin;