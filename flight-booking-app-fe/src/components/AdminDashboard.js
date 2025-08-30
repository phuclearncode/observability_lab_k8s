import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [flightNumber, setFlightNumber] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:5000/api/bookings');
    setBookings(res.data);
  };

  const createFlight = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/flights', { flightNumber, departure, arrival, date, seats });
      alert('Flight created');
    } catch (err) {
      alert('Create failed');
    }
  };

  const confirmBooking = async (bookingId) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/confirm`);
      fetchBookings();
    } catch (err) {
      alert('Confirm failed');
    }
  };

  return (
    <div>
      <h2>Create Flight</h2>
      <form onSubmit={createFlight}>
        <input value={flightNumber} onChange={e => setFlightNumber(e.target.value)} placeholder="Flight Number" />
        <input value={departure} onChange={e => setDeparture(e.target.value)} placeholder="Departure" />
        <input value={arrival} onChange={e => setArrival(e.target.value)} placeholder="Arrival" />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="number" value={seats} onChange={e => setSeats(e.target.value)} placeholder="Seats" />
        <button type="submit">Create</button>
      </form>
      <h2>All Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            User: {booking.user.email} - Flight: {booking.flight.flightNumber} - Status: {booking.status}
            {booking.status === 'pending' && <button onClick={() => confirmBooking(booking._id)}>Confirm</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;