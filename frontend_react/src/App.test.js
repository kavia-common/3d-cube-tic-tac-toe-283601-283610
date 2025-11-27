import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('allows placing a mark after explode', () => {
  render(<App />);

  // Click Explode
  const explodeBtn = screen.getByRole('button', { name: /explode/i });
  fireEvent.click(explodeBtn);

  // Find first gridcell (cell-0-0) and click it
  const firstCell = screen.getByTestId('cell-0-0');
  fireEvent.click(firstCell);

  // Expect an X appears (we render visually hidden text too)
  expect(firstCell).toHaveTextContent('X');
});
