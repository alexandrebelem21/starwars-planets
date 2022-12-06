import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

describe('Testa o HOME', () => { 
  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData)
  }))


  test('se renderiza', async () => {
    render(<App/>)
    const name = screen.getByTestId('name-filter')
    const column = screen.getByTestId('column-filter');
    const comparision = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const columnSort = screen.getByTestId('column-sort');
    const columnSortBtn = screen.getByTestId('column-sort-button');

    expect(name).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparision).toBeInTheDocument();
    expect(columnSort).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(columnSortBtn).toBeInTheDocument();
  })

  test('filtra pelo nome ', async () => {
    render(<App />);
    const name = screen.getByTestId('name-filter')
    userEvent.type(name, 'aa')

    const alderaan = await screen.findByText('Alderaan')
    const planets = await screen.findAllByTestId('planet-name')
    expect(alderaan).toBeInTheDocument();
    expect(planets).toHaveLength(1);

    userEvent.clear(name)

    const allPlanets = screen.getAllByRole('row')
    expect(allPlanets).toHaveLength(11)
  })

  test('exclui filtros', async () => {
    render(<App />);
    await screen.findByText('Alderaan')
    const getBtnFilter = screen.getByTestId('button-filter')
    userEvent.click(getBtnFilter)
    expect(screen.getAllByRole('row')).toHaveLength(9)

    const btnRemoveFilter = screen.getByTestId('button-remove-filters');
    userEvent.click(btnRemoveFilter);
    expect(screen.getAllByRole('row')).toHaveLength(11)
  })

  test('order ASC', async () => {
    render(<App />);
    await screen.findByText('Alderaan')

    const asc =  screen.getByTestId('column-sort-input-asc');
    userEvent.click(asc)

    const orderBtn = screen.getByTestId('column-sort-button');
    userEvent.click(orderBtn);

    const allPlanets = screen.getAllByTestId('planet-name')
    expect(allPlanets[0]).toHaveTextContent('Yavin')
  })


  test('order DESC', async () => {
    render(<App />);
    await screen.findByText('Alderaan')
    userEvent.selectOptions(screen.getByTestId('column-sort'), 'diameter')

    const desc =  screen.getByTestId('column-sort-input-desc');
    userEvent.click(desc)
   
    const orderBtn = screen.getByTestId('column-sort-button');
    userEvent.click(orderBtn);
   
    const allPlanets = screen.getAllByTestId('planet-name')
    expect(allPlanets[0]).toHaveTextContent('Bespin')
  })

  test('maior que', async () => {
    render(<App />);
    await screen.findByText('Alderaan')
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que')
  
    const inputNumber = screen.getByTestId(/value-filter/i)
    userEvent.type(inputNumber, '2000000000')
  
    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);
  
    const allPlanets = screen.getAllByTestId('planet-name')
    expect(allPlanets[0]).toHaveTextContent('Naboo')
  })

  test('menor que', async () => {
    render(<App />);
    await screen.findByText('Alderaan')
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que')
  
    const inputNumber = screen.getByTestId(/value-filter/i)
    userEvent.type(inputNumber, '2000000000')
  
    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);
  
    const allPlanets = screen.getAllByTestId('planet-name')
    expect(allPlanets[0]).toHaveTextContent('Tatooine')
  })

  test('igual a', async () => {
    render(<App />);
    await screen.findByText('Alderaan')
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a')
  
    const inputNumber = screen.getByTestId(/value-filter/i)
    userEvent.type(inputNumber, '30000000')
  
    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);
  
    const allPlanets = screen.getAllByTestId('planet-name')
    expect(allPlanets[0]).toHaveTextContent('Endor')
  })

})
