import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProduceCard from './ProduceCard';

describe('ProduceCard Component', () => {
  const produce = {
    name: 'Apples',
    img: '/img/apples.jpeg',
  };

  it('renders the component with the correct content', () => {
    render(<ProduceCard produce={produce} selectItem={() => {}} selectedItem={[]} />);

    const produceName = screen.getByText('Apples');
    const addToListButton = screen.getByText('Add to List');
    const produceImage = screen.getByAltText('Apples');

    expect(produceName).toBeInTheDocument();
    expect(addToListButton).toBeInTheDocument();
    expect(produceImage).toBeInTheDocument();
  });

  it('calls the selectItem function when clicked', () => {
    const selectItemMock = jest.fn();

    render(<ProduceCard produce={produce} selectItem={selectItemMock} selectedItem={[]} />);

    const addToListButton = screen.getByText('Add to List');

    fireEvent.click(addToListButton);

    expect(selectItemMock).toHaveBeenCalledWith(produce);
  });

  it('displays "Added to List" when the item is selected', () => {
    const selectedItem = ['Apples'];

    render(<ProduceCard produce={produce} selectItem={() => {}} selectedItem={selectedItem} />);

    const addToListButton = screen.getByText('Added to List');

    expect(addToListButton).toBeInTheDocument();
  });

  it('displays "Add to List" when the item is not selected', () => {
    const selectedItem = ['Bananas'];

    render(<ProduceCard produce={produce} selectItem={() => {}} selectedItem={selectedItem} />);

    const addToListButton = screen.getByText('Add to List');

    expect(addToListButton).toBeInTheDocument();
  });
});
