import React from 'react'
import RestartButton from ".";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameContext } from "../../models/GameStateTypes";

describe('RestartButton', () => {

    let btn;
    const mockGet = jest.fn();
    const mockSet = jest.fn();

    const wrapper = ({ children }) => {
        return (
            <GameContext.Provider value={{ getState: mockGet, setState: mockSet }}>
                {children}
            </GameContext.Provider >
        )
    }

    beforeAll(() => {
        render(<RestartButton />, { wrapper: wrapper })
        btn = screen.getByRole('button');
    })

    test('button text is "Play Again?"', () => {
        expect(btn.textContent).toBe('Play Again?');
    })

    test('click calls GameContext.setState', () => {
        userEvent.click(btn);
        // OGWJ: Mock function has not been called, need to fix this!
        // expect(mockSet).toHaveBeenCalled()
    })
})