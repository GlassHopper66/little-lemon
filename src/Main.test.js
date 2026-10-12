import { initializeTimes, updateTimes, parseDate } from './Main';
import { fetchAPI } from './api';

test('initializeTimes returns the times from fetchAPI for today', () => {
  const times = initializeTimes();
  expect(times).toEqual(fetchAPI(new Date()));
  expect(times.length).toBeGreaterThan(0);
  times.forEach((t) => expect(t).toMatch(/^\d{2}:\d{2}$/));
});

test('initializeTimes returns the expected times for a fixed date', () => {
  expect(initializeTimes(new Date(2026, 9, 20))).toEqual(
    ['17:00', '17:30', '18:00', '19:00', '21:00', '22:00', '23:00']
  );
});

test('updateTimes fetches the times for the selected date', () => {
  const state = initializeTimes(new Date(2026, 9, 20));
  const next = updateTimes(state, { type: 'UPDATE_TIMES', date: '2026-10-19' });
  expect(next).toEqual(['17:00', '17:30', '18:30', '19:30', '20:30', '21:00', '22:00', '23:00']);
});

test('updateTimes hides times that are already booked for that date', () => {
  const bookings = [{ date: '2026-10-19', time: '18:30', guests: 2, occasion: 'Birthday' }];
  const next = updateTimes([], { type: 'UPDATE_TIMES', date: '2026-10-19', bookings });
  expect(next).not.toContain('18:30');
  expect(next).toContain('19:30');
});

test('updateTimes removes a time when it is booked', () => {
  expect(updateTimes(['17:00', '18:00'], { type: 'BOOK_TIME', time: '17:00' })).toEqual(['18:00']);
});

test('updateTimes returns the same state for unknown actions', () => {
  const state = ['17:00'];
  expect(updateTimes(state, { type: 'UNKNOWN' })).toBe(state);
});

test('parseDate reads the date in local time', () => {
  const d = parseDate('2026-10-20');
  expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2026, 9, 20]);
});
