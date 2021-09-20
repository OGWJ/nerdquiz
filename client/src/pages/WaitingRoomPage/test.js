import { MemoryRouter } from 'react';
import { screen } from '@testing-library/react';
import WaitingRoomPage from '.';

describe('WaitingRoomPage', () => {

    beforeAll(() => {
        render(<WaitingRoomPage />, { wrapper: MemoryRouter })
    })

    test('Includes a list of users in that room', () => {
        expect(screen.getByRole('list')).toBeInTheDocument();
    })

})