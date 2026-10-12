import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Chicago from './Chicago';
import BookingPage from './BookingPage';
import ComingSoon from './ComingSoon';

function Main() {
  const [availableTimes] = useState(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);

  return (
    <main id="main">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Chicago />} />
        <Route path="/booking" element={<BookingPage availableTimes={availableTimes} />} />
        <Route path="/menu" element={<ComingSoon title="Menu" />} />
        <Route path="/order" element={<ComingSoon title="Order online" />} />
        <Route path="/login" element={<ComingSoon title="Login" />} />
        <Route path="*" element={<ComingSoon title="Page not found" />} />
      </Routes>
    </main>
  );
}

export default Main;
