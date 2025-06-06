'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState(1);
  const [availableTimes, setAvailable] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to format a local date string (avoids UTC shift)
  const toLocalISODate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (!selectedDate) return;
    const fetchTimes = async () => {
      const dateStr = toLocalISODate(selectedDate);
      const res = await fetch(`/api/bookings/available?date=${dateStr}`);
      const data = await res.json();
      setAvailable(data.availableTimes || []);
    };
    fetchTimes();
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time.');
      return;
    }

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: toLocalISODate(selectedDate),
        time: selectedTime,
        name,
        email,
        phone,
        people,
      }),
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      setError('Failed to book. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="alert alert-success text-center">
        <h4 className="mb-3">Booking Confirmed!</h4>
        <p>We’ve saved your session. You’ll receive an email shortly.</p>
        <a href="/" className="btn btn-outline-light mt-3">Back to Home</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Select a Date</label> &nbsp;&nbsp;
        <DatePicker
          selected={selectedDate ?? undefined}
          onChange={date => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="form-control"
          placeholderText="Select a date"
        />
      </div>

      {selectedDate && (
        <div className="mb-3">
          <label className="form-label">Available Time Slots</label>
          {availableTimes.length > 0 ? (
            <select
              className="form-select"
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
              required
            >
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          ) : (
            <p className="text-warning">No slots available for this date.</p>
          )}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Number of People (1-6)</label>
        <input
          type="number"
          min={1}
          max={6}
          value={people}
          onChange={e => setPeople(parseInt(e.target.value))}
          className="form-control"
          required
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-success w-100">Confirm Booking</button>
    </form>
  );
}
