import { initializeTimes, updateTimes } from './Main';

test('initializeTimes returns the expected times', () => {
  expect(initializeTimes()).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
});

test('updateTimes returns the same value that is provided in the state', () => {
  const state = ['17:00', '18:00', '19:00'];
  const action = { type: 'UPDATE_TIMES', date: '2026-10-20' };
  expect(updateTimes(state, action)).toEqual(state);
});

test('updateTimes ignores unknown actions', () => {
  const state = initializeTimes();
  expect(updateTimes(state, { type: 'UNKNOWN' })).toBe(state);
});
