import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const buttonArrayTitle = [
  { role: 'button', name: 'start'},
  { role: 'button', name: 'stop'},
  { role: 'button', name: 'reset'}
]

test('renders Clock header title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Clock/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Button title', () => {
  render(<App />);
  const inputTitle = screen.getByLabelText('Type minutes');
  const clockTitle = screen.getByTestId('clock-id');
  buttonArrayTitle.forEach((item) => {
    const buttonTitle = screen.getByRole(item.role, {name: item.name})
    expect(buttonTitle).toBeInTheDocument();
  })
  expect(inputTitle).toBeInTheDocument();
  expect(clockTitle).toBeInTheDocument();
});

test('input second to show Time', () => {
  render(<App />);
  const minutesInput = screen.getByLabelText(/type minutes/gi);
  fireEvent.change(minutesInput, { target: { value: '3752' } })
  const clockTitle = screen.getByTestId('clock-id');
  expect(minutesInput).toHaveDisplayValue('3752')
  expect(clockTitle.textContent).toBe('1: 02: 32')
});
test('input second to show positive Time', () => {
  render(<App />);
  const minutesInput = screen.getByLabelText(/type minutes/gi);
  fireEvent.change(minutesInput, { target: { value: '-3752' } })
  const clockTitle = screen.getByTestId('clock-id');
  expect(minutesInput).toHaveDisplayValue('-3752')
  expect(clockTitle.textContent).toBe('1: 02: 32')
});

test('start button counting and then stop', () => {
  jest.useFakeTimers();
  render(<App />);
  const clockTitle = screen.getByTestId('clock-id');
  const startButton = screen.getByRole('button', { name: /start/i });
  const stopButton = screen.getByRole('button', { name: /stop/i });
  fireEvent.click(startButton);
  act(() => {
    jest.advanceTimersByTime(3720 * 1000);
  })
  fireEvent.click(stopButton)
  expect(clockTitle.textContent).toBe('1: 02: 00')
});

test('click reset button', () => {
  jest.useFakeTimers();
  render(<App />);
  const clockTitle = screen.getByTestId('clock-id');
  const resetButton = screen.getByRole('button', { name: /reset/i });
  fireEvent.click(resetButton);
  expect(clockTitle.textContent).toBe('0: 00: 00')
});
