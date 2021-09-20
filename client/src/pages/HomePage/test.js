import { MemoryRouter } from 'react';
import { screen } from '@testing-library/react';
import HomePage from '.';

describe('HomePage', () => {

    beforeAll(() => {
        render(<HomePage />, { wrapper: MemoryRouter })
    })

    test('Includes a list of available rooms', () => {
        expect(screen.getByRole('list')).toBeInTheDocument();
    })

})