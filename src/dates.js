// "2026-10-20" -> local midnight. new Date("2026-10-20") would be UTC midnight,
// which is still the 19th in Chicago and would fetch the wrong day's times.
export function parseDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Local date -> "2026-10-20", the same format the date input uses.
export function formatDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// "2026-10-20" -> "Tue, October 20, 2026" for people (ISO stays in <time dateTime>).
export function formatDisplayDate(value) {
  return parseDate(value).toLocaleDateString('en-US', {
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
  });
}
