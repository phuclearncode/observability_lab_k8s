const express = require('express');
const Flight = require('../models/Flight');
const authMiddleware = require('../middleware/auth'); // Tạo sau

const router = express.Router();

// Xem tất cả chuyến bay
router.get('/', async (req, res) => {
  const flights = await Flight.find();
  res.json(flights);
});

// Admin tạo chuyến bay
router.post('/', authMiddleware('admin'), async (req, res) => {
  const { flightNumber, departure, arrival, date, seats } = req.body;
  const flight = new Flight({ flightNumber, departure, arrival, date, seats, availableSeats: seats });
  await flight.save();
  res.status(201).json(flight);
});

module.exports = router;