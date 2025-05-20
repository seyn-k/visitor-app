import React, { useState } from 'react';
import './Signup.css';

function Signup({ onBack, onSignupSuccess }) {
  const [form, setForm] = useState({
    username: '',
    email: '', // <-- Add this line
    apartmentNumber: '',
    vehicleType: '',
    vehicleNumber: '',
    purposeOfVisit: '',
    durationOfVisit: '',
    dateOfVisit: '',
    timeOfVisit: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (
      !form.username ||
      !form.email || // <-- Add this line
      !form.apartmentNumber ||
      !form.vehicleType ||
      !form.vehicleNumber ||
      !form.purposeOfVisit ||
      !form.durationOfVisit ||
      !form.dateOfVisit ||
      !form.timeOfVisit
    ) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    // Send data to backend for email
    try {
      const response = await fetch('http://localhost:5000/api/send-signup-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        if (onSignupSuccess) onSignupSuccess(form);
      } else {
        setError('Failed to send email.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            className="signup-input"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="email" // <-- Change this line
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="text"
            name="apartmentNumber"
            placeholder="Apartment Number"
            value={form.apartmentNumber}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type"
            value={form.vehicleType}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={form.vehicleNumber}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="text"
            name="purposeOfVisit"
            placeholder="Purpose of Visit"
            value={form.purposeOfVisit}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="number"
            name="durationOfVisit"
            placeholder="Duration of Visit (minutes)"
            value={form.durationOfVisit}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="date"
            name="dateOfVisit"
            value={form.dateOfVisit}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="time"
            name="timeOfVisit"
            value={form.timeOfVisit}
            onChange={handleChange}
            required
          />
          <button className="signup-btn" type="submit">Submit</button>
        </form>
        {error && <div className="signup-error">{error}</div>}
        <button className="back-btn" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

export default Signup;