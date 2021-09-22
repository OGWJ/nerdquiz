import { screen, render } from "@testing-library/react";
import LandingPageForm from ".";

describe('LandingPageForm', () => {

    beforeAll(() => {
        render(<LandingPageForm />)
    })

    test('contains a form with a single text input and a submit button', () => {
        expect(screen.getAllByRole('textbox').length).toBe(1);
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    // TODO test updates username

})