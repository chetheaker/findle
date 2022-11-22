import { render, screen } from '@testing-library/react';
import Timer from './Timer'

test('renders Timer', () => {
  render(<Timer />);
  const element = screen.getByText('Next Contest in 0 hours 0 minutes 0 seconds')
  expect(element).toBeInTheDocument();
});