// This is just an example, not for frontend use!
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // your MySQL username
  password: '12345', // your MySQL password
  database: 'visitor_db'// your database name
});

app.post('/api/send-signup-email', async (req, res) => {
  const { username, email, apartmentNumber, vehicleType, vehicleNumber, purposeOfVisit, durationOfVisit, dateOfVisit, timeOfVisit } = req.body;

  // Insert into MySQL
  const sql = `INSERT INTO Visitors (username, email, apartment_number, vehicle_type, vehicle_number, purpose_of_visit, duration_of_visit, date_of_visit, time_of_visit)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [username, email, apartmentNumber, vehicleType, vehicleNumber, purposeOfVisit, durationOfVisit, dateOfVisit, timeOfVisit],
    async (err, result) => {
      if (err) {
        console.error('MySQL Error:', err);
        return res.status(500).send('Database error');
      }

      // Send email after successful DB insert
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'senthil.tech.dev@gmail.com',
          pass: 'iwtv csau ulxc jnzv'
        }
      });

      let mailOptions = {
        from: 'senthil.tech.dev@gmail.com',
        to: email,
        subject: 'New Visitor Signup',
        text: `
          Username: ${username}
          Email: ${email}
          Apartment Number: ${apartmentNumber}
          Vehicle Type: ${vehicleType}
          Vehicle Number: ${vehicleNumber}
          Purpose of Visit: ${purposeOfVisit}
          Duration of Visit: ${durationOfVisit}
          Date of Visit: ${dateOfVisit}
          Time of Visit: ${timeOfVisit}
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent and data saved');
      } catch (err) {
        res.status(500).send('Error sending email');
      }
    }
  );
});

app.post('/api/admin-login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM Admins WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(401).send('Invalid credentials');
    const admin = results[0];
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) return res.status(500).send('Server error');
      if (!isMatch) return res.status(401).send('Invalid credentials');
      res.status(200).send('Login successful');
    });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
