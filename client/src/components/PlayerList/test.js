import { screen, render } from "@testing-library/react"
import PlayerList from "."

describe('Create Room Button', () => {

    beforeAll(() => {
        let players = [];
        render(<PlayerList players={players} />)
    })

    test('has a heading with text "Who\'s Playin\'?"', () => {
        expect(screen.getByRole('heading').textContent).toBe('Who\'s Playin\'?');
    })
})