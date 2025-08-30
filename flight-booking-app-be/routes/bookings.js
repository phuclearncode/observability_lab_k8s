const express = require('express');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// User đặt vé
router.post('/', authMiddleware('user'), async (req, res) => {
  const { flightId } = req.body;
  const userId = req.user.id;
  const flight = await Flight.findById(flightId);
  if (!flight || flight.availableSeats <= 0) return res.status(400).json({ error: 'No seats available' });
  const booking = new Booking({ user: userId, flight: flightId });
  await booking.save();
  flight.availableSeats -= 1;
  await flight.save();
  res.status(201).json(booking);
});

// User hủy vé
router.put('/:id/cancel', authMiddleware('user'), async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking || booking.user.toString() !== req.user.id || booking.status !== 'pending') {
    return res.status(400).json({ error: 'Cannot cancel' });
  }
  booking.status = 'cancelled';
  await booking.save();
  const flight = await Flight.findById(booking.flight);
  flight.availableSeats += 1;
  await flight.save();
  res.json(booking);
});

// User xem vé của mình
router.get('/my', authMiddleware('user'), async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('flight');
  res.json(bookings);
});

// Admin xem tất cả vé
router.get('/', authMiddleware('admin'), async (req, res) => {
  const bookings = await Booking.find().populate('user').populate('flight');
  res.json(bookings);
});

// Admin xác nhận vé
router.put('/:id/confirm', authMiddleware('admin'), async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking || booking.status !== 'pending') return res.status(400).json({ error: 'Cannot confirm' });
  booking.status = 'confirmed';
  await booking.save();
  res.json(booking);
});

module.exports = router;