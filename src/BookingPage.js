import BookingForm from './BookingForm';

function BookingPage({ availableTimes, onSubmit }) {
  return (
    <section className="booking" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a table</h1>
      <p className="lead">
        Choose a date, time and the number of guests. We will keep the table ready for you.
      </p>
      <BookingForm availableTimes={availableTimes} onSubmit={onSubmit} />
    </section>
  );
}

export default BookingPage;
