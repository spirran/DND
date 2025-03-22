import userEvent from '@testing-library/user-event';
import React from 'react'
import { it, expect } from 'vitest'
import FrontPageButton from './MainFront'
import { MemoryRouter, useLocation } from 'react-router-dom';
import { screen, render } from '@testing-library/react';

function CurrentLocation() {
    const location = useLocation();

    return <div data-testid='location'>{location.pathname}</div>
}

it("when button clicked it navigates to the correct url", async()=>{
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <FrontPageButton />
            <CurrentLocation />
        </MemoryRouter>
    );

    const button = screen.getByText("Dice Roller");
    await user.click(button);

    expect(screen.getByTestId('location')).toHaveTextContent("/DiceRoller");

})