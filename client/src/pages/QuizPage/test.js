import { MemoryRouter } from 'react';
import { screen } from '@testing-library/react';
import QuizPage from '.';

describe('QuizPage', () => {

    beforeAll(() => {
        render(<QuizPage />, { wrapper: MemoryRouter })
    })

    test('Includes a message that tells the user their question or asks them to wait for their turn', () => {
        expect(screen.getByRole('heading')).toBeInTheDocument();
        // then check value of heading
    })

})