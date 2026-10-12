import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

test('renders the page landmarks', () => {
  renderAt('/');
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renders the homepage sections', () => {
  renderAt('/');
  expect(screen.getByRole('heading', { level: 1, name: 'Little Lemon' })).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(3);
});

test('renders the booking page', () => {
  renderAt('/booking');
  expect(screen.getByRole('heading', { level: 1, name: /reserve a table/i })).toBeInTheDocument();
});

test('shows a submitted booking in the bookings table', () => {
  renderAt('/booking');
  expect(screen.getByText('No bookings yet.')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-10-20' } });
  fireEvent.change(screen.getByLabelText('Choose time'), { target: { value: '18:00' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '4' } });
  fireEvent.click(screen.getByRole('button', { name: 'Make Your reservation' }));
  const table = screen.getByRole('table');
  expect(table).toHaveTextContent('2026-10-20');
  expect(table).toHaveTextContent('18:00');
  expect(screen.queryByRole('option', { name: '18:00' })).not.toBeInTheDocument();
});
