import { validateBooking } from './validateBooking';

const today = new Date(2026, 9, 12);
const times = ['17:00', '18:00'];
const valid = { date: '2026-10-20', time: '18:00', guests: '4', occasion: 'Birthday' };

test('a complete booking has no errors', () => {
  expect(validateBooking(valid, times, today)).toEqual({});
});

test('an empty form has an error for every field', () => {
  const errors = validateBooking({ date: '', time: '', guests: '', occasion: '' }, times, today);
  expect(Object.keys(errors).sort()).toEqual(['date', 'guests', 'occasion', 'time']);
});

test('a date in the past is rejected, today is accepted', () => {
  expect(validateBooking({ ...valid, date: '2026-10-11' }, times, today).date)
    .toBe('Please choose today or a later date.');
  expect(validateBooking({ ...valid, date: '2026-10-12' }, times, today).date).toBeUndefined();
});

test('the time must be one of the available times', () => {
  expect(validateBooking({ ...valid, time: '20:00' }, times, today).time)
    .toBe('Please choose one of the available times.');
  expect(validateBooking({ ...valid, time: '' }, [], today).time)
    .toBe('There are no free tables on this date. Please choose another date.');
});

test('the number of guests must be a whole number from 1 to 10', () => {
  expect(validateBooking({ ...valid, guests: '0' }, times, today).guests).toBe('Please enter at least 1 guest.');
  expect(validateBooking({ ...valid, guests: '2.5' }, times, today).guests).toBe('Please enter at least 1 guest.');
  expect(validateBooking({ ...valid, guests: '11' }, times, today).guests)
    .toBe('We can seat up to 10 guests online. Please call us for larger groups.');
  expect(validateBooking({ ...valid, guests: '10' }, times, today).guests).toBeUndefined();
});

test('the occasion must be selected', () => {
  expect(validateBooking({ ...valid, occasion: '' }, times, today).occasion).toBe('Please choose an occasion.');
});
