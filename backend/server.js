const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'darshansp1', // Replace with your MySQL password
  database: 'flight_reservation'
});

// Middleware to parse JSON bodies
app.use(express.json());

// Use the cors middleware with default options
app.use(cors());

// Define route for fetching available flights
app.get('/api/flights', (req, res) => {
  // Query the database to get the available flights
  pool.query('SELECT * FROM flight', (error, results) => {
    if (error) {
      console.error('Error fetching flights:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Send the retrieved flights as a JSON response
    res.json(results);
  });
});

// Define route for user registration
app.post('/api/register', (req, res) => {
  const { username, password, name, email, phone /* other form data */ } = req.body;

  // For testing purposes, allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Insert user data into the database
  pool.query('INSERT INTO User (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)', [username, password, name, email, phone], (error, results) => {
    if (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // User registered successfully
    res.json({ message: 'User registered successfully' });
  });
});

// Define route for booking a flight
app.post('/api/book-flight', (req, res) => {
  const { userID, flightID, seatNumber, reservationDate /* other form data */ } = req.body;

  // For testing purposes, allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Insert booking data into the database
  pool.query('INSERT INTO Ticket (UserID, FlightID, SeatNumber, ReservationDate) VALUES (?, ?, ?, ?)', [userID, flightID, seatNumber, reservationDate], (error, results) => {
    if (error) {
      console.error('Error booking flight:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Update payment table dynamically (replace this with your actual logic)
    // For demonstration, let's assume the payment is successful and update the payment table
    const paymentMethod = 'Credit Card'; // Example payment method
    const amountPaid = 300.00; // Example amount paid
    const paymentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current date and time

    // Insert payment data into the database
    pool.query('INSERT INTO Payment (UserID, PaymentMethod, AmountPaid, PaymentDate) VALUES (?, ?, ?, ?)', [userID, paymentMethod, amountPaid, paymentDate], (paymentError, paymentResults) => {
      if (paymentError) {
        console.error('Error updating payment:', paymentError);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Flight booked and payment updated successfully
      res.json({ message: 'Flight booked successfully', ticketID: results.insertId });
    });
  });
});

// Define route for the root URL (GET request)
app.get('/', (req, res) => {
  res.send('Welcome to the Flight Reservation API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
