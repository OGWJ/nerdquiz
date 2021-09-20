import { socket } from "../service/socket";

export const userAnsweredQuestionHandler = e => {
    username = localStorage.getItem('username');
    question = localStorage.getItem('question');
    answer = e.target.value;
    socket.emit('user answer', { username, question, answer });
}