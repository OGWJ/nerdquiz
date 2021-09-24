import io from "socket.io-client";
const SOCKET_URL = "https://something-stupid-api.herokuapp.com/";
export const socket = io.connect(SOCKET_URL, { transports: ['websocket', 'polling'] });
