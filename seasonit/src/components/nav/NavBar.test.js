import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom matchers
import NavBar from './NavBar';

jest.mock('../buttons/Buttons', () => (props) => (
  <div>
    <button onClick={props.showCurrent}>View Current</button>
    <button onClick={props.showShoppingList}>Shopping List</button>
    <button onClick={props.reset}>Reset</button>
  </div>
));
jest.mock('../selectmonth/SelectMonth', () => (props) => (<div>mock-SelectMonth</div>));

describe('NavBar Component', () => {
  test('renders Buttons and SelectMonth with correct props', () => {
    const mockProps = {
      months: ['January', 'February', 'March'], // Example months array
      showCurrent: jest.fn(),
      showShoppingList: jest.fn(),
      reset: jest.fn(),
      showMonthly: jest.fn(),
    };

    render(<NavBar {...mockProps} />);

    // Check if Buttons component is rendered with correct text
    expect(screen.getByText('View Current')).toBeInTheDocument();
    expect(screen.getByText('Shopping List')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('mock-SelectMonth')).toBeInTheDocument();
  });

  test('interaction with Buttons component', () => {
    const showCurrentMock = jest.fn();
    const showShoppingListMock = jest.fn();
    const resetMock = jest.fn();

    render(
      <NavBar 
        showCurrent={showCurrentMock} 
        showShoppingList={showShoppingListMock} 
        reset={resetMock} 
        months={[]} 
        showMonthly={() => {}} 
      />
    );

    fireEvent.click(screen.getByText('View Current'));
    expect(showCurrentMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Shopping List'));
    expect(showShoppingListMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Reset'));
    expect(resetMock).toHaveBeenCalled();
  });

    test('interaction with SelectMonth component', () => {
        const showMonthlyMock = jest.fn();
        render(
            <NavBar 
                showCurrent={() => {}} 
                showShoppingList={() => {}} 
                reset={() => {}} 
                months={[]} 
                showMonthly={showMonthlyMock} 
            />
        );
    });
});