import { socket } from "../service/socket"

export const userEntersRoomHandler = (roomId) => {
    socket.emit('user enter room', { 'username': localStorage.getItem('username'), 'roomId': roomId });
}

export const userExitsRoomHandler = () => {
    socket.emit('user exit room', localStorage.getItem('username'));
}