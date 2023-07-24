import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Card from './Card';

test('Card', async () => {
  render(<Card />);

  const button = await screen.findByRole('button', { name: 'green' });
  button.click();
  await screen.findByRole('button', { name: 'red' });
});
