const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  date: { type: Date, required: true },
  seats: { type: Number, required: true },
  availableSeats: { type: Number, required: true }
});

module.exports = mongoose.model('Flight', flightSchema);