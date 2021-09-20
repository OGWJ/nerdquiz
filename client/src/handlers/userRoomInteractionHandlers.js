import { socket } from "../service/socket"

const userEntersRoomHandler = (roomId) => {
    socket.emit('user enter room', { 'username': localStorage.getItem('username'), 'roomId': roomId });
}

const userExitsRoomHandler = () => {
    socket.emit('user exit room', localStorage.getItem('username'));
}

module.exports = { userEntersRoomHandler, userExitsRoomHandler };