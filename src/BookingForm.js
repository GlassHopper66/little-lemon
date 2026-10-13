import { useState } from 'react';
import { formatDate } from './dates';
import { validateBooking, OCCASIONS, MIN_GUESTS, MAX_GUESTS } from './validateBooking';
import { validateDetails } from './validateDetails';

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0] ?? '');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // If the slots for a new date no longer contain the chosen time, fall back to the first one.
  const selectedTime = availableTimes.includes(time) ? time : availableTimes[0] ?? '';

  const errors = {
    ...validateBooking({ date, time: selectedTime, guests, occasion }, availableTimes),
    ...validateDetails({ firstName, lastName, email, phone }),
  };
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
    if (!isValid) return; // HTML5 validation can be switched off; check again here
    submitForm?.({
      date,
      time: selectedTime,
      guests: Number(guests),
      occasion,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <p className="form-note">Fields marked with <span className="required-mark" aria-hidden="true">*</span> are required.</p>

      <fieldset>
        <legend>Your table</legend>

        <label htmlFor="res-date" className="required">Choose date</label>
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

        <label htmlFor="res-time" className="required">Choose time</label>
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

        <label htmlFor="guests" className="required">Number of guests</label>
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

        <label htmlFor="occasion" className="required">Occasion</label>
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
      </fieldset>

      <fieldset>
        <legend>Your details</legend>

        <label htmlFor="first-name" className="required">First name</label>
        <input
          type="text"
          id="first-name"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          {...fieldProps('firstName')}
        />
        {errorText('firstName')}

        <label htmlFor="last-name" className="required">Last name</label>
        <input
          type="text"
          id="last-name"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          {...fieldProps('lastName')}
        />
        {errorText('lastName')}

        <label htmlFor="email" className="required">Email</label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          {...fieldProps('email', 'email-hint')}
        />
        <p id="email-hint" className="form-hint">We use it only for this reservation.</p>
        {errorText('email')}

        <label htmlFor="phone">Phone (optional)</label>
        <input
          type="tel"
          id="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          {...fieldProps('phone', 'phone-hint')}
        />
        <p id="phone-hint" className="form-hint">We call only if something changes with your table.</p>
        {errorText('phone')}
      </fieldset>

      <input
        type="submit"
        className="btn"
        value="Make Your reservation"
        disabled={!isValid}
        aria-describedby={isValid ? undefined : 'submit-hint'}
      />
      {!isValid && (
        <p id="submit-hint" className="form-hint">
          Fill in the date, time, number of guests, occasion, your name and email to make your reservation.
        </p>
      )}
    </form>
  );
}

export default BookingForm;
