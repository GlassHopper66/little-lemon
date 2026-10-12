import { formatDisplayDate, formatDate, parseDate } from './dates';

test('formatDisplayDate shows a readable US date', () => {
  expect(formatDisplayDate('2026-10-20')).toBe('Tue, October 20, 2026');
});

test('formatDate and parseDate round-trip in local time', () => {
  expect(formatDate(parseDate('2026-10-20'))).toBe('2026-10-20');
});
