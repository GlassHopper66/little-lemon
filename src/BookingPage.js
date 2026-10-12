import BookingForm from './BookingForm';
import BookingsTable from './BookingsTable';
import useDocumentTitle from './useDocumentTitle';

function BookingPage({ availableTimes, dispatch, submitForm, bookingData = [], cancelBooking }) {
  useDocumentTitle('Reserve a table');
  return (
    <section className="booking" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a table</h1>
      <p className="lead">
        Choose a date, time and the number of guests. We will keep the table ready for you.
      </p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
      <p className="form-help">
        Need help or booking for more than 10 guests? Call us at{' '}
        <a href="tel:+13125550100">(312) 555-0100</a>.
      </p>
      <BookingsTable bookingData={bookingData} onCancel={cancelBooking} />
    </section>
  );
}

export default BookingPage;
