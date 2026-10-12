import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

function ConfirmedBooking() {
  const booking = useLocation().state?.booking;
  const headingRef = useRef(null);

  // Move focus to the heading so screen reader users hear the confirmation.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="confirmed" aria-labelledby="confirmed-title">
      <h1 id="confirmed-title" ref={headingRef} tabIndex={-1}>Booking confirmed</h1>
      {booking ? (
        <p className="lead">
          Thank you! Your table for {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'} on{' '}
          {booking.date} at {booking.time} ({booking.occasion}) is reserved.
        </p>
      ) : (
        <p className="lead">Your booking has been confirmed.</p>
      )}
      <p className="confirmed-actions">
        <Link to="/" className="btn">Back to the homepage</Link>
        <Link to="/booking">Make another reservation</Link>
      </p>
    </section>
  );
}

export default ConfirmedBooking;
