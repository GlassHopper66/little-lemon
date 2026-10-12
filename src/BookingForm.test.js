import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';
import { formatDate } from './dates';

const times = ['17:00', '18:00', '19:00'];
const inDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return formatDate(d); };

function fillValidForm() {
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: inDays(7) } });
  fireEvent.change(screen.getByLabelText('Choose time'), { target: { value: '19:00' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '4' } });
  fireEvent.change(screen.getByLabelText('Occasion'), { target: { value: 'Anniversary' } });
}

test('Renders the BookingForm static text', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  const labelElement = screen.getByText('Choose date');
  expect(labelElement).toBeInTheDocument();
});

test('renders every form field with its label', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  expect(screen.getByLabelText('Choose date')).toBeInTheDocument();
  expect(screen.getByLabelText('Choose time')).toBeInTheDocument();
  expect(screen.getByLabelText('Number of guests')).toBeInTheDocument();
  expect(screen.getByLabelText('Occasion')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Make Your reservation' })).toBeInTheDocument();
});

test('fills the time options from availableTimes', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  const options = screen.getAllByRole('option').map((o) => o.textContent);
  expect(options).toEqual(expect.arrayContaining(times));
});

test('applies HTML5 validation attributes', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  const date = screen.getByLabelText('Choose date');
  expect(date).toHaveAttribute('required');
  expect(date).toHaveAttribute('min', inDays(0));
  expect(screen.getByLabelText('Choose time')).toHaveAttribute('required');
  const guests = screen.getByLabelText('Number of guests');
  expect(guests).toHaveAttribute('required');
  expect(guests).toHaveAttribute('min', '1');
  expect(guests).toHaveAttribute('max', '10');
  expect(screen.getByLabelText('Occasion')).toHaveAttribute('required');
});

test('the submit button is disabled until the form is valid', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  const button = screen.getByRole('button', { name: 'Make Your reservation' });
  expect(button).toBeDisabled();
  fillValidForm();
  expect(button).toBeEnabled();
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '0' } });
  expect(button).toBeDisabled();
});

test('shows an accessible error after leaving an invalid field', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  const date = screen.getByLabelText('Choose date');
  expect(screen.queryByText('Please choose a date.')).not.toBeInTheDocument();
  fireEvent.blur(date);
  expect(screen.getByText('Please choose a date.')).toBeInTheDocument();
  expect(date).toHaveAttribute('aria-invalid', 'true');
  expect(date).toHaveAttribute('aria-describedby', 'date-error');
});

test('rejects a date in the past', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  const date = screen.getByLabelText('Choose date');
  fireEvent.change(date, { target: { value: inDays(-1) } });
  fireEvent.blur(date);
  expect(screen.getByText('Please choose today or a later date.')).toBeInTheDocument();
});

test('submits the controlled values', () => {
  const submitForm = jest.fn();
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} submitForm={submitForm} />);
  fillValidForm();
  fireEvent.click(screen.getByRole('button', { name: 'Make Your reservation' }));
  expect(submitForm).toHaveBeenCalledWith({
    date: inDays(7), time: '19:00', guests: 4, occasion: 'Anniversary',
  });
});

test('does not submit an invalid form', () => {
  const submitForm = jest.fn();
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} submitForm={submitForm} />);
  fireEvent.submit(screen.getByRole('button', { name: 'Make Your reservation' }).closest('form'));
  expect(submitForm).not.toHaveBeenCalled();
  expect(screen.getByText('Please choose a date.')).toBeInTheDocument();
});

test('dispatches the selected date when the date changes', () => {
  const dispatch = jest.fn();
  render(<BookingForm availableTimes={times} dispatch={dispatch} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-10-20' } });
  expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', date: '2026-10-20' });
});
