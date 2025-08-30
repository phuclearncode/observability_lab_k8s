import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchFlights();
    fetchBookings();
  }, []);

  const fetchFlights = async () => {
    const res = await axios.get('http://localhost:5000/api/flights');
    setFlights(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:5000/api/bookings/my');
    setBookings(res.data);
  };

  const bookFlight = async (flightId) => {
    try {
      await axios.post('http://localhost:5000/api/bookings', { flightId });
      fetchBookings();
      fetchFlights();
    } catch (err) {
      alert('Booking failed');
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/cancel`);
      fetchBookings();
      fetchFlights();
    } catch (err) {
      alert('Cancel failed');
    }
  };

  return (
    <div>
      <h2>Available Flights</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight._id}>
            {flight.flightNumber} - {flight.departure} to {flight.arrival} - Seats: {flight.availableSeats}
            <button onClick={() => bookFlight(flight._id)}>Book</button>
          </li>
        ))}
      </ul>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            Flight: {booking.flight.flightNumber} - Status: {booking.status}
            {booking.status === 'pending' && <button onClick={() => cancelBooking(booking._id)}>Cancel</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;