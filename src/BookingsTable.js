import { useRef, useState } from 'react';
import { formatDisplayDate } from './dates';

function BookingsTable({ bookingData, onCancel }) {
  const [pending, setPending] = useState(null);
  const [status, setStatus] = useState('');
  const headingRef = useRef(null);

  const confirmCancel = (booking) => {
    onCancel?.(booking);
    setPending(null);
    setStatus(`Your booking on ${formatDisplayDate(booking.date)} at ${booking.time} was cancelled.`);
    headingRef.current?.focus();     // the row is gone, so focus moves to the section heading
  };

  return (
    <section className="bookings" aria-labelledby="bookings-title">
      <h2 id="bookings-title" ref={headingRef} tabIndex={-1}>Your bookings</h2>
      <p role="status" className="form-hint">{status}</p>
      {bookingData.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="table-scroll">
          <table aria-labelledby="bookings-title">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Guests</th>
                <th scope="col">Occasion</th>
                <th scope="col"><span className="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((b) => {
                const key = `${b.date}-${b.time}`;
                const when = `${formatDisplayDate(b.date)} at ${b.time}`;
                return (
                  <tr key={key}>
                    <td><time dateTime={b.date}>{formatDisplayDate(b.date)}</time></td>
                    <td>{b.time}</td>
                    <td>{b.guests}</td>
                    <td>{b.occasion}</td>
                    <td className="row-actions">
                      {pending === key ? (
                        <>
                          <button type="button" className="small-btn danger" onClick={() => confirmCancel(b)}
                            aria-label={`Yes, cancel booking on ${when}`}>Yes, cancel</button>
                          <button type="button" className="small-btn" onClick={() => setPending(null)}
                            aria-label={`Keep booking on ${when}`}>Keep</button>
                        </>
                      ) : (
                        <button type="button" className="small-btn" onClick={() => setPending(key)}
                          aria-label={`Cancel booking on ${when}`}>Cancel</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default BookingsTable;
