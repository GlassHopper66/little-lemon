import { render, screen } from '@testing-library/react';
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
