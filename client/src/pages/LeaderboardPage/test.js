import { MemoryRouter } from 'react';
import { screen } from '@testing-library/react';
import LeaderboardPage from '.';

describe('LeaderboardPage', () => {

    beforeAll(() => {
        render(<LeaderboardPage />, { wrapper: MemoryRouter })
    })

    test('Includes a table of highscores', () => {
        expect(screen.getByRole('table')).toBeInTheDocument();
    })

})