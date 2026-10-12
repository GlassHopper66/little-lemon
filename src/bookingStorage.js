// Bookings are kept in localStorage so they survive a page reload.
export const STORAGE_KEY = 'littleLemonBookings';

export function loadBookings(storage = window.localStorage) {
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];          // no storage, blocked storage or broken JSON
  }
}

export function saveBookings(bookings, storage = window.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // storage full or blocked: the app keeps working with the in-memory list
  }
}
