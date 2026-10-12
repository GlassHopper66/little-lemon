import { useState } from 'react';
import { formatDate } from './dates';
import { validateBooking, OCCASIONS, MIN_GUESTS, MAX_GUESTS } from './validateBooking';

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0] ?? '');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('');
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // If the slots for a new date no longer contain the chosen time, fall back to the first one.
  const selectedTime = availableTimes.includes(time) ? time : availableTimes[0] ?? '';

  const values = { date, time: selectedTime, guests, occasion };
  const errors = validateBooking(values, availableTimes);
  const isValid = Object.keys(errors).length === 0;

  // Show a field's error only after the user has left the field or tried to submit.
  const showError = (field) => (touched[field] || submitted) && errors[field];
  const touch = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));
  const fieldProps = (field, hintId) => ({
    'aria-invalid': showError(field) ? 'true' : 'false',
    'aria-describedby': [hintId, showError(field) && `${field}-error`].filter(Boolean).join(' ') || undefined,
    onBlur: touch(field),
  });
  const errorText = (field) =>
    showError(field) ? (
      <p id={`${field}-error`} className="field-error">{errors[field]}</p>
    ) : null;

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatch({ type: 'UPDATE_TIMES', date: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;           // HTML5 validation can be switched off; check again here
    submitForm?.({ date, time: selectedTime, guests: Number(guests), occasion });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        min={formatDate(new Date())}
        onChange={handleDateChange}
        required
        {...fieldProps('date')}
      />
      {errorText('date')}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={selectedTime}
        onChange={(e) => setTime(e.target.value)}
        required
        {...fieldProps('time')}
      >
        {availableTimes.length === 0 && <option value="">No times available</option>}
        {availableTimes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      {errorText('time')}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min={MIN_GUESTS}
        max={MAX_GUESTS}
        step="1"
        inputMode="numeric"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        required
        {...fieldProps('guests', 'guests-hint')}
      />
      <p id="guests-hint" className="form-hint">From {MIN_GUESTS} to {MAX_GUESTS} guests.</p>
      {errorText('guests')}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
        required
        {...fieldProps('occasion')}
      >
        <option value="" disabled>Select an occasion</option>
        {OCCASIONS.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {errorText('occasion')}

      <input
        type="submit"
        className="btn"
        value="Make Your reservation"
        disabled={!isValid}
        aria-describedby={isValid ? undefined : 'submit-hint'}
      />
      {!isValid && (
        <p id="submit-hint" className="form-hint">
          Fill in a date, time, number of guests and occasion to make your reservation.
        </p>
      )}
    </form>
  );
}

export default BookingForm;
