import BookingForm from './BookingForm';
import BookingsTable from './BookingsTable';

function BookingPage({ availableTimes, dispatch, onSubmit, bookingData = [] }) {
  return (
    <section className="booking" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a table</h1>
      <p className="lead">
        Choose a date, time and the number of guests. We will keep the table ready for you.
      </p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} onSubmit={onSubmit} />
      <BookingsTable bookingData={bookingData} />
    </section>
  );
}

export default BookingPage;
