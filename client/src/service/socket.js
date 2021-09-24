import io from "socket.io-client";
//const SOCKET_URL = "https://something-stupid-api.herokuapp.com/";
const SOCKET_URL ="http://localhost:5001"
export const socket = io.connect(SOCKET_URL, { transports: ['polling'] });
