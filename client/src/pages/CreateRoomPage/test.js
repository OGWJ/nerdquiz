import { MemoryRouter } from 'react';
import { screen } from '@testing-library/react';
import CreateRoomPage from '.';

describe('CreateRoomPage', () => {

    beforeAll(() => {
        render(<CreateRoomPage />, { wrapper: MemoryRouter })
    })

    test('Includes a form to create a room', () => {
        expect(screen.getByRole('form')).toBeInTheDocument();
    })

})