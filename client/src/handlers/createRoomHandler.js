import { socket } from "../service/socket";

export const createRoomHandler = e => {
    const settings = e.target;
    const roomSettings = {
        admin: localStorage.getItem('username'),
        category: settings.category,
        difficulty: settings.difficulty
    }
    socket.emit('create room', roomSettings);
}