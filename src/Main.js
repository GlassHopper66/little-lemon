import { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Chicago from './Chicago';
import BookingPage from './BookingPage';
import ComingSoon from './ComingSoon';

// Initial state for the reducer: every slot of the evening.
export function initializeTimes() {
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

// Reducer: (current state, action) -> next state.
// For now every date has the same slots, so the state is returned unchanged.
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return state;
    default:
      return state;
  }
}

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);

  return (
    <main id="main">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Chicago />} />
        <Route
          path="/booking"
          element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} />}
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
