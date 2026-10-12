import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { formatDate } from './dates';

// The 20th of next month: fetchAPI seeds by day of month, so 18:00 is always free that day.
const bookingDate = (() => { const d = new Date(); d.setMonth(d.getMonth() + 1, 20); return formatDate(d); })();

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

test('renders the page landmarks', () => {
  renderAt('/');
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renders the homepage sections', () => {
  renderAt('/');
  expect(screen.getByRole('heading', { level: 1, name: 'Little Lemon' })).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(3);
});

test('renders the booking page', () => {
  renderAt('/booking');
  expect(screen.getByRole('heading', { level: 1, name: /reserve a table/i })).toBeInTheDocument();
});

beforeEach(() => {
  localStorage.clear();
});

function bookTable() {
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: bookingDate } });
  fireEvent.change(screen.getByLabelText('Choose time'), { target: { value: '18:00' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '4' } });
  fireEvent.change(screen.getByLabelText('Occasion'), { target: { value: 'Birthday' } });
  fireEvent.click(screen.getByRole('button', { name: 'Make Your reservation' }));
}

test('submitting the form shows the booking confirmation page', () => {
  renderAt('/booking');
  bookTable();
  expect(screen.getByRole('heading', { level: 1, name: 'Booking confirmed' })).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`${bookingDate} at 18:00`))).toBeInTheDocument();
});

test('a confirmed booking is saved and shown in the bookings table', () => {
  renderAt('/booking');
  expect(screen.getByText('No bookings yet.')).toBeInTheDocument();
  bookTable();
  expect(JSON.parse(localStorage.getItem('littleLemonBookings'))).toEqual([
    { date: bookingDate, time: '18:00', guests: 4, occasion: 'Birthday' },
  ]);
  fireEvent.click(screen.getByRole('link', { name: 'Make another reservation' }));
  const table = screen.getByRole('table');
  expect(table).toHaveTextContent(bookingDate);
  expect(table).toHaveTextContent('18:00');
});
