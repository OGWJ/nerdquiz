import { socket } from "../service/socket"

export const quizEndedHandler = roomId => {
    socket.emit('quiz ended', roomId)
}