import { loadBookings, saveBookings, STORAGE_KEY } from './bookingStorage';

beforeEach(() => {
  localStorage.clear();
});

test('saves and loads bookings', () => {
  const bookings = [{ date: '2026-10-20', time: '18:00', guests: 4, occasion: 'Birthday' }];
  saveBookings(bookings);
  expect(loadBookings()).toEqual(bookings);
});

test('returns an empty list when nothing is saved', () => {
  expect(loadBookings()).toEqual([]);
});

test('returns an empty list when the saved data is broken', () => {
  localStorage.setItem(STORAGE_KEY, '{not json');
  expect(loadBookings()).toEqual([]);
});
