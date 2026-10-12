import { useState } from 'react';

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0] ?? '');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  // If the slots for a new date no longer contain the chosen time, fall back to the first one.
  const selectedTime = availableTimes.includes(time) ? time : availableTimes[0] ?? '';

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatch({ type: 'UPDATE_TIMES', date: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm?.({ date, time: selectedTime, guests, occasion });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={handleDateChange}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <select id="res-time" value={selectedTime} onChange={(e) => setTime(e.target.value)}>
        {availableTimes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <input type="submit" className="btn" value="Make Your reservation" />
    </form>
  );
}

export default BookingForm;
