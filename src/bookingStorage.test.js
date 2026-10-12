import { loadBookings, saveBookings, STORAGE_KEY } from './bookingStorage';

const booking = { date: '2026-10-20', time: '18:00', guests: 4, occasion: 'Birthday' };

beforeEach(() => {
  localStorage.clear();
});

test('saveBookings writes the bookings to localStorage as JSON', () => {
  saveBookings([booking]);
  expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify([booking]));
});

test('loadBookings reads the bookings from localStorage', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([booking]));
  expect(loadBookings()).toEqual([booking]);
});

test('saves and loads bookings', () => {
  saveBookings([booking]);
  expect(loadBookings()).toEqual([booking]);
});

test('returns an empty list when nothing is saved', () => {
  expect(loadBookings()).toEqual([]);
});

test('returns an empty list when the saved data is broken', () => {
  localStorage.setItem(STORAGE_KEY, '{not json');
  expect(loadBookings()).toEqual([]);
});

test('does not crash when localStorage refuses to write', () => {
  const fullStorage = { setItem: () => { throw new Error('QuotaExceededError'); } };
  expect(() => saveBookings([booking], fullStorage)).not.toThrow();
});
