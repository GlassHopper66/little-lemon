import BookingForm from './BookingForm';
import BookingsTable from './BookingsTable';
import useDocumentTitle from './useDocumentTitle';

function BookingPage({ availableTimes, dispatch, submitForm, bookingData = [] }) {
  useDocumentTitle('Reserve a table');
  return (
    <section className="booking" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a table</h1>
      <p className="lead">
        Choose a date, time and the number of guests. We will keep the table ready for you.
      </p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
      <BookingsTable bookingData={bookingData} />
    </section>
  );
}

export default BookingPage;
