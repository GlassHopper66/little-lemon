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

test('every field is connected to its label with htmlFor and id', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  [['Choose date', 'res-date'], ['Choose time', 'res-time'], ['Number of guests', 'guests'], ['Occasion', 'occasion']]
    .forEach(([label, id]) => {
      expect(screen.getByText(label)).toHaveAttribute('for', id);
      expect(screen.getByLabelText(label)).toHaveAttribute('id', id);
    });
});

test('the guest limit is shown before the user types', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  expect(screen.getByText('From 1 to 10 guests.')).toBeInTheDocument();
  expect(screen.getByLabelText('Number of guests')).toHaveAttribute('aria-describedby', 'guests-hint');
});

test('fills the time options from availableTimes', () => {
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  const options = screen.getAllByRole('option').map((o) => o.textContent);
  expect(options).toEqual(expect.arrayContaining(times));
});

describe('HTML5 validation attributes', () => {
  beforeEach(() => {
    render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
  });

  test('date input is required and cannot be in the past', () => {
    const date = screen.getByLabelText('Choose date');
    expect(date).toHaveAttribute('type', 'date');
    expect(date).toHaveAttribute('required');
    expect(date).toHaveAttribute('min', inDays(0));
  });

  test('time select is required', () => {
    expect(screen.getByLabelText('Choose time')).toHaveAttribute('required');
  });

  test('guests input is a required whole number from 1 to 10', () => {
    const guests = screen.getByLabelText('Number of guests');
    expect(guests).toHaveAttribute('type', 'number');
    expect(guests).toHaveAttribute('required');
    expect(guests).toHaveAttribute('min', '1');
    expect(guests).toHaveAttribute('max', '10');
    expect(guests).toHaveAttribute('step', '1');
  });

  test('occasion select is required and starts without a choice', () => {
    const occasion = screen.getByLabelText('Occasion');
    expect(occasion).toHaveAttribute('required');
    expect(occasion).toHaveValue('');
  });
});

describe('JavaScript validation: valid and invalid states per field', () => {
  test.each([
    ['Choose date', inDays(-1), 'Please choose today or a later date.'],
    ['Choose date', '', 'Please choose a date.'],
    ['Number of guests', '0', 'Please enter at least 1 guest.'],
    ['Number of guests', '11', 'We can seat up to 10 guests online. Please call us for larger groups.'],
    ['Occasion', '', 'Please choose an occasion.'],
  ])('%s = "%s" is invalid', (label, value, message) => {
    render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
    const field = screen.getByLabelText(label);
    fireEvent.change(field, { target: { value } });
    fireEvent.blur(field);
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(field).toHaveAttribute('aria-invalid', 'true');
  });

  test.each([
    ['Choose date', inDays(0)],
    ['Choose date', inDays(30)],
    ['Number of guests', '1'],
    ['Number of guests', '10'],
    ['Occasion', 'Birthday'],
    ['Occasion', 'Anniversary'],
  ])('%s = "%s" is valid', (label, value) => {
    render(<BookingForm availableTimes={times} dispatch={jest.fn()} />);
    const field = screen.getByLabelText(label);
    fireEvent.change(field, { target: { value } });
    fireEvent.blur(field);
    expect(field).toHaveAttribute('aria-invalid', 'false');
    expect(field.getAttribute('aria-describedby') ?? '').not.toContain('-error');
  });

  test('time is invalid when no tables are free on that date', () => {
    render(<BookingForm availableTimes={[]} dispatch={jest.fn()} />);
    const time = screen.getByLabelText('Choose time');
    fireEvent.blur(time);
    expect(screen.getByText('There are no free tables on this date. Please choose another date.')).toBeInTheDocument();
    expect(time).toHaveAttribute('aria-invalid', 'true');
  });
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

test('does not submit when only one field is invalid', () => {
  const submitForm = jest.fn();
  render(<BookingForm availableTimes={times} dispatch={jest.fn()} submitForm={submitForm} />);
  fillValidForm();
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: inDays(-1) } });
  fireEvent.submit(screen.getByRole('button', { name: 'Make Your reservation' }).closest('form'));
  expect(submitForm).not.toHaveBeenCalled();
  expect(screen.getByText('Please choose today or a later date.')).toBeInTheDocument();
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
