import { MemoryRouter } from 'react';
import { screen } from '@testing-library/react';
import LandingPage from '.';

describe('LandingPage', () => {

    beforeAll(() => {
        render(<LandingPage />, { wrapper: MemoryRouter })
    })

    test('Includes a single form and input for entering your username', () => {
        expect(screen.getByRole('form')).toBeInTheDocument();
        // then check for input of type text with empty value
    })

})