import { useEffect, useReducer, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './Homepage';
import Chicago from './Chicago';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import ComingSoon from './ComingSoon';
import { fetchAPI, submitAPI } from './api';
import { loadBookings, saveBookings } from './bookingStorage';
import { parseDate, formatDate } from './dates';

export { parseDate, formatDate };

// A time is free when nobody has booked it on that date and, for today, it has not already passed.
const freeTimes = (times, date, bookings = [], now = new Date()) => {
  const taken = bookings.filter((b) => b.date === date).map((b) => b.time);
  const isToday = date === formatDate(now);
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const toMinutes = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  return times.filter((t) => !taken.includes(t) && !(isToday && toMinutes(t) <= minutesNow));
};

// Initial state: the available times for today, without times that are already booked or already passed.
export function initializeTimes(today = new Date(), bookings = []) {
  return freeTimes(fetchAPI(today), formatDate(today), bookings, today);
}

// Reducer for the available times.
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return freeTimes(fetchAPI(parseDate(action.date)), action.date, action.bookings, action.now);
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
  // Remember the date the form last asked for, so a cancellation can refresh its times.
  const lastDate = useRef(formatDate(new Date()));

  const dispatchWithBookings = (action) => {
    if (action.date) lastDate.current = action.date;
    dispatch({ ...action, bookings: bookingData });
  };

  const cancelBooking = (booking) => {
    const next = bookingData.filter((b) => !(b.date === booking.date && b.time === booking.time));
    setBookingData(next);
    dispatch({ type: 'UPDATE_TIMES', date: lastDate.current, bookings: next });
  };

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      setBookingData((prev) => [...prev, formData]);
      dispatch({ type: 'BOOK_TIME', time: formData.time });
      navigate('/confirmed', { state: { booking: formData } });
    }
  };

  return (
    <main id="main" tabIndex={-1}>
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
              cancelBooking={cancelBooking}
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
