function BookingsTable({ bookingData }) {
  return (
    <section className="bookings" aria-labelledby="bookings-title">
      <h2 id="bookings-title">Your bookings</h2>
      {bookingData.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Guests</th>
                <th scope="col">Occasion</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((b) => (
                <tr key={`${b.date}-${b.time}`}>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.guests}</td>
                  <td>{b.occasion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default BookingsTable;
