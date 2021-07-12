import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
    render(<App />);

    // find an element with a role of button and text of 'Change to Midnight Blue'
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });

    // expect the background color to be Medium Violet Red
    expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

    // click button
    fireEvent.click(colorButton);

    // expect the background color to be Midnight Blue
    expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });

    // expect the button text to be 'Change to Medium Violet Red'
    expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
    render(<App />);

    // check that the button starts out enabled
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    expect(colorButton).toBeEnabled();

    // check that the checkbox starts out unchecked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
});

test('Checkbox disables button on first click and enables on second click', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
});

test('Disabled button has gray background and reverts to MediumVioletRed', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

    // disable button
    fireEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'gray' });

    // re-enable button
    fireEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});

test('Clicked disabled button has gray background and reverts to Midnight Blue', () => {
    render(<App />);
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

    // change button to MidnightBlue
    fireEvent.click(colorButton);

    // disable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

    // re-enable button
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('spaces before camel-case capital letters', () => {
    test('Works for no inner capital letters', () => {
        expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
    });
    test('Works for one inner capital letter', () => {
        expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
    });
    test('Works for multiple inner capital letters', () => {
        expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
    });
});
