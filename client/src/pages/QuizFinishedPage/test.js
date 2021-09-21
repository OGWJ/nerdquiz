import { MemoryRouter } from 'react';
import { screen } from '@testing-library/react';
import QuizFinishedPage from '.';

describe('QuizFinishedPage', () => {

    beforeAll(() => {
        render(<QuizFinishedPage />, { wrapper: MemoryRouter })
    })

    test('Includes a table of highscores', () => {
        expect(screen.getByRole('table')).toBeInTheDocument();
    })

})