import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import SWProvider from '../context/SWProvider';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
          json: () => Promise.resolve(testData),
      })
  )
});

afterEach(() => {
  jest.resetAllMocks();
});

test('If the API is being called', async () => {
 render(<SWProvider><App /></SWProvider>)
 await waitFor(() => expect(fetch).toHaveBeenCalled());
 await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
 await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/'));
});

test('If filters are present', () => {
  render(<SWProvider><App /></SWProvider>)
  const filterByName = screen.getByTestId('name-filter');
  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');

  expect(filterByName).toBeInTheDocument();
  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
});

test('the buttons are present', () => {
  render(<SWProvider><App /></SWProvider>)
  const filterBtn = screen.getByTestId('button-filter');
  const deleteBtn = screen.getByTestId('button-remove-filters');
  
  expect(filterBtn).toBeDefined();
  expect(deleteBtn).toBeDefined();
});

test('number simulation', () => {
  render(<SWProvider><App /></SWProvider>)

  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const filterBtn = screen.getByTestId('button-filter');
  const deleteBtn = screen.getByTestId('button-remove-filters');

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '10000');
  userEvent.click(filterBtn);

  expect(screen.getByTestId('filter')).toBeInTheDocument();

  userEvent.selectOptions(columnFilter, 'diameter');
  userEvent.selectOptions(comparisonFilter, 'menor que');
  userEvent.type(valueFilter, '118000');
  userEvent.click(filterBtn);

  userEvent.selectOptions(columnFilter, 'orbital_period');
  userEvent.selectOptions(comparisonFilter, 'igual a');
  userEvent.type(valueFilter, '304');
  userEvent.click(filterBtn);
});

test('name simulation', () => {
  render(<SWProvider><App /></SWProvider>)

  const filterByName = screen.getByTestId('name-filter');
  const ooPlanet = 'Tatooine';

  userEvent.type(filterByName, 'o');
});

test('delete one simulation', () => {
  render(<SWProvider><App /></SWProvider>)

  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const filterBtn = screen.getByTestId('button-filter');
  const deleteBtn = screen.getByTestId('button-remove-filters');

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '10000');
  userEvent.click(filterBtn);

  expect(screen.getByRole('button', { name: /x/i })).toBeDefined();

  userEvent.click(screen.getByRole('button', { name: /x/i }));
});

test('delete all simulation', () => {
  render(<SWProvider><App /></SWProvider>)

  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const filterBtn = screen.getByTestId('button-filter');
  const deleteBtn = screen.getByTestId('button-remove-filters');

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '10000');
  userEvent.click(filterBtn);

  userEvent.click(deleteBtn);
});