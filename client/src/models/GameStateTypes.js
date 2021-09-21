import { createContext } from "react";

export const GameStateTypes = {
    LANDING: 'LANDING',
    HOME: 'HOME', CREATE_ROOM: 'CREATE_ROOM', WAITING_ROOM: 'WAITING_ROOM', QUIZ: 'QUIZ', QUIZ_FINISHED: 'QUIZ_FINISHED'
}

export const GameContext = createContext(null);