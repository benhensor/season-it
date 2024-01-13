import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom matchers
import NavBar from './NavBar';

jest.mock('../buttons/Buttons', () => (props) => (
  <div>
    <button onClick={props.showCurrent}>View Current</button>
    <button onClick={props.showShoppingList}>Shopping List</button>
    <button onClick={props.clearList}>Clear</button>
  </div>
));
jest.mock('../selectmonth/SelectMonth', () => (props) => (<div>mock-SelectMonth</div>));

describe('NavBar Component', () => {
  test('renders Buttons and SelectMonth with correct props', () => {
    const mockProps = {
      months: ['January', 'February', 'March'], // Example months array
      showCurrent: jest.fn(),
      showShoppingList: jest.fn(),
      clearList: jest.fn(),
      showMonthly: jest.fn(),
    };

    render(<NavBar {...mockProps} />);

    // Check if Buttons component is rendered with correct text
    expect(screen.getByText('View Current')).toBeInTheDocument();
    expect(screen.getByText('Shopping List')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('mock-SelectMonth')).toBeInTheDocument();
  });

  test('interaction with Buttons component', () => {
    const showCurrentMock = jest.fn();
    const showShoppingListMock = jest.fn();
    const clearListMock = jest.fn();

    render(
      <NavBar 
        showCurrent={showCurrentMock} 
        showShoppingList={showShoppingListMock} 
        clearList={clearListMock} 
        months={[]} 
        showMonthly={() => {}} 
      />
    );

    fireEvent.click(screen.getByText('View Current'));
    expect(showCurrentMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Shopping List'));
    expect(showShoppingListMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Clear'));
    expect(clearListMock).toHaveBeenCalled();
  });

    test('interaction with SelectMonth component', () => {
        const showMonthlyMock = jest.fn();
        render(
            <NavBar 
                showCurrent={() => {}} 
                showShoppingList={() => {}} 
                clearList={() => {}} 
                months={[]} 
                showMonthly={showMonthlyMock} 
            />
        );
    });
});