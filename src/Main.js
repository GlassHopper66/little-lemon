import { useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Chicago from './Chicago';
import BookingPage from './BookingPage';
import ComingSoon from './ComingSoon';
import { fetchAPI, submitAPI } from './api';

// "2026-10-20" -> local midnight. new Date("2026-10-20") would be UTC midnight,
// which is still the 19th in Chicago and would fetch the wrong day's times.
export function parseDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Initial state: the available times for today.
export function initializeTimes(today = new Date()) {
  return fetchAPI(today);
}

// Reducer for the available times.
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES': {
      const taken = (action.bookings ?? [])
        .filter((b) => b.date === action.date)
        .map((b) => b.time);
      return fetchAPI(parseDate(action.date)).filter((t) => !taken.includes(t));
    }
    case 'BOOK_TIME':
      return state.filter((t) => t !== action.time);
    default:
      return state;
  }
}

function Main() {
  const [bookingData, setBookingData] = useState([]);
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);

  // The form only knows the date; Main adds the bookings so taken times stay hidden.
  const dispatchWithBookings = (action) => dispatch({ ...action, bookings: bookingData });

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      setBookingData((prev) => [...prev, formData]);
      dispatch({ type: 'BOOK_TIME', time: formData.time });
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
              onSubmit={submitForm}
              bookingData={bookingData}
            />
          }
        />
        <Route path="/menu" element={<ComingSoon title="Menu" />} />
        <Route path="/order" element={<ComingSoon title="Order online" />} />
        <Route path="/login" element={<ComingSoon title="Login" />} />
        <Route path="*" element={<ComingSoon title="Page not found" />} />
      </Routes>
    </main>
  );
}

export default Main;
