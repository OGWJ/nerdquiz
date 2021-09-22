import { screen, render } from "@testing-library/react"
import RoomList from "."

describe('Create Room Button', () => {

    beforeAll(() => {
        let rooms = [];
        render(<RoomList rooms={rooms} />)
    })

    test('has a heading with text "Join a Room"', () => {
        expect(screen.getByRole('heading').textContent).toBe('Join a Room');
    })
})