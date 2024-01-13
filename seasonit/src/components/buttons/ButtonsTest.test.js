import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Buttons from './Buttons';

describe('Buttons Component', () => {

  test('calls showCurrent when the current button is clicked', () => {
    const showCurrent = jest.fn();
    render(<Buttons showCurrent={showCurrent} />);
    
    fireEvent.click(screen.getByText('View Current'));
    expect(showCurrent).toHaveBeenCalled();
  });

  test('calls showShoppingList when the shopping list button is clicked', () => {
    const showShoppingList = jest.fn();
    render(<Buttons showShoppingList={showShoppingList} />);
    
    fireEvent.click(screen.getByText('Shopping List'));
    expect(showShoppingList).toHaveBeenCalled();
  });

  test('calls clearList when the clear button is clicked', () => {
    const clearList = jest.fn();
    render(<Buttons clearList={clearList} />);
    
    fireEvent.click(screen.getByText('Clear'));
    expect(clearList).toHaveBeenCalled();
  });

});