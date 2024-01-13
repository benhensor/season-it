import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectMonth from './SelectMonth';

describe('SelectMonth Component', () => {
    const mockMonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', '' ];
  
    test('renders a select element with correct options', () => {
        render(<SelectMonth months={mockMonths} showMonthly={() => {}} />);

        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByText('Select a month')).toBeInTheDocument();

        // Filter out empty string and check if options are rendered
        mockMonths.filter(month => month !== '').forEach(month => {
                expect(screen.getByText(month)).toBeInTheDocument();

        });
    });

    test('calls showMonthly with correct value when a month is selected', () => {
        const showMonthlyMock = jest.fn();
        render(<SelectMonth months={mockMonths} showMonthly={showMonthlyMock} />);

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'January' } });
        expect(showMonthlyMock).toHaveBeenCalledWith('January');
    });
});