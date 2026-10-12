import { useEffect, useReducer, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './Homepage';
import Chicago from './Chicago';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import ComingSoon from './ComingSoon';
import { fetchAPI, submitAPI } from './api';
import { loadBookings, saveBookings } from './bookingStorage';

// "2026-10-20" -> local midnight. new Date("2026-10-20") would be UTC midnight,
// which is still the 19th in Chicago and would fetch the wrong day's times.
export function parseDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Local date -> "2026-10-20", the same format the date input uses.
export function formatDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const freeTimes = (times, date, bookings = []) => {
  const taken = bookings.filter((b) => b.date === date).map((b) => b.time);
  return times.filter((t) => !taken.includes(t));
};

// Initial state: the available times for today, without times that are already booked.
export function initializeTimes(today = new Date(), bookings = []) {
  return freeTimes(fetchAPI(today), formatDate(today), bookings);
}

// Reducer for the available times.
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return freeTimes(fetchAPI(parseDate(action.date)), action.date, action.bookings);
    case 'BOOK_TIME':
      return state.filter((t) => t !== action.time);
    default:
      return state;
  }
}

function Main() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(loadBookings);
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    bookingData,
    (bookings) => initializeTimes(new Date(), bookings)
  );

  useEffect(() => {
    saveBookings(bookingData);
  }, [bookingData]);

  // The form only knows the date; Main adds the bookings so taken times stay hidden.
  const dispatchWithBookings = (action) => dispatch({ ...action, bookings: bookingData });

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      setBookingData((prev) => [...prev, formData]);
      dispatch({ type: 'BOOK_TIME', time: formData.time });
      navigate('/confirmed', { state: { booking: formData } });
    }
  };

  return (
    <main id="main">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Chicago />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatchWithBookings}
              submitForm={submitForm}
              bookingData={bookingData}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
        <Route path="/menu" element={<ComingSoon title="Menu" />} />
        <Route path="/order" element={<ComingSoon title="Order online" />} />
        <Route path="/login" element={<ComingSoon title="Login" />} />
        <Route path="*" element={<ComingSoon title="Page not found" />} />
      </Routes>
    </main>
  );
}

export default Main;
