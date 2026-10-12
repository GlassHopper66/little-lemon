import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

const times = ['17:00', '18:00', '19:00'];

test('renders every form field with its label', () => {
  render(<BookingForm availableTimes={times} />);
  expect(screen.getByLabelText('Choose date')).toBeInTheDocument();
  expect(screen.getByLabelText('Choose time')).toBeInTheDocument();
  expect(screen.getByLabelText('Number of guests')).toBeInTheDocument();
  expect(screen.getByLabelText('Occasion')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Make Your reservation' })).toBeInTheDocument();
});

test('fills the time options from availableTimes', () => {
  render(<BookingForm availableTimes={times} />);
  const options = screen.getAllByRole('option').map((o) => o.textContent);
  expect(options).toEqual(expect.arrayContaining(times));
});

test('submits the controlled values', () => {
  const onSubmit = jest.fn();
  render(<BookingForm availableTimes={times} onSubmit={onSubmit} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-10-20' } });
  fireEvent.change(screen.getByLabelText('Choose time'), { target: { value: '19:00' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '4' } });
  fireEvent.change(screen.getByLabelText('Occasion'), { target: { value: 'Anniversary' } });
  fireEvent.click(screen.getByRole('button', { name: 'Make Your reservation' }));
  expect(onSubmit).toHaveBeenCalledWith({
    date: '2026-10-20', time: '19:00', guests: 4, occasion: 'Anniversary',
  });
});
