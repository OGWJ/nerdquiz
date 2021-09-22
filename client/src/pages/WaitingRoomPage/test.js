import React from 'react';
import { MemoryRouter } from 'react';
import { screen } from '@testing-library/react';
import WaitingRoomPage from '.';
import { GameContext } from '../../models/GameStateTypes';

describe('WaitingRoomPage', () => {

    beforeAll(() => {
        const roomAdmin = 'Test';
        const wrapper = ({ children }) => <GameContext.Provider value={{ roomAdmin: roomAdmin }}>{children}</GameContext.Provider>
        render(<WaitingRoomPage />, { wrapper: wrapper })
    })

    test('Includes a list of users in that room', () => {
        expect(screen.getByRole('list')).toBeInTheDocument();
    })

})