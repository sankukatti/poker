import React from 'react';
import { render, screen } from '@testing-library/react';
import { Poker } from './pokerGame';


describe(('Poker Game'), () => {
  test('Renders Deal button', () => {
    render(<Poker />);
    const dealButton = screen.getByText(/Deal/i);
    expect(dealButton).toBeInTheDocument();
  });
  test('Renders 52 cards in the deck', () => {
    const {container} = render(<Poker />);
    expect(container.getElementsByClassName('card').length).toBe(52);
    expect(container.getElementsByClassName('player').length).toBe(5);
  });
  test('Renders 76 cards after deal', async () => {
    const {container} = render(<Poker />);
    const dealButton = screen.getByText(/Deal/i);
    await dealButton.click();
    expect(container.getElementsByClassName('card').length).toBe(52 + 25);
    expect(container.getElementsByClassName('player').length).toBe(5);
  });
});
