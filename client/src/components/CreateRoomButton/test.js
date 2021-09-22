import { screen, render } from "@testing-library/react"
import CreateRoomButton from "."

describe('CreateRoomButton', () => {

    beforeAll(() => {
        render(<CreateRoomButton />)
    })

    test('is a button with text', () => {
        const btn = screen.getByRole('button');
        expect(btn.textContent).toBe('Create a Room')
    })
})