import { formatDate } from './dates';

export const OCCASIONS = ['Birthday', 'Anniversary'];
export const MIN_GUESTS = 1;
export const MAX_GUESTS = 10;

// Returns an object with one message per invalid field; an empty object means the booking is valid.
export function validateBooking({ date, time, guests, occasion }, availableTimes, today = new Date()) {
  const errors = {};

  if (!date) {
    errors.date = 'Please choose a date.';
  } else if (date < formatDate(today)) {
    errors.date = 'Please choose today or a later date.';
  }

  if (!time || !availableTimes.includes(time)) {
    errors.time = availableTimes.length === 0
      ? 'There are no free tables on this date. Please choose another date.'
      : 'Please choose one of the available times.';
  }

  const count = Number(guests);
  if (guests === '' || !Number.isInteger(count) || count < MIN_GUESTS) {
    errors.guests = `Please enter at least ${MIN_GUESTS} guest.`;
  } else if (count > MAX_GUESTS) {
    errors.guests = `We can seat up to ${MAX_GUESTS} guests online. Please call us for larger groups.`;
  }

  if (!OCCASIONS.includes(occasion)) {
    errors.occasion = 'Please choose an occasion.';
  }

  return errors;
}
