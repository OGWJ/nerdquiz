import React from "react";
import { userEntersRoomHandler } from '../../handlers/userRoomInteractionHandlers';

const getCardColors = difficulty => {
    // (OGWJ) TODO: should make difficulties and colors enums for robustness
    switch (difficulty) {
        case 'EASY':
            return { bg: '#2fa14b', fg: '#ffffff' }
        case 'MEDIUM':
            return { bg: '#1daadd', fg: '#ffffff' }
        case 'HARD':
            return { bg: '#4e4d83', fg: '#ffffff' }
    }
}

const RoomList = ({ rooms }) => {
    return (
        <ul className='container vw-100 row justify-content-center align-content-center'>
            <h3 className='mt-3'>Join a Room</h3>
            {rooms.map(room => {
                return (<li className='card text-center mb-3 p-3' style={{
                    backgroundColor: getCardColors('EASY').bg,
                    color: getCardColors('EASY').fg
                }} onClick={() => userEntersRoomHandler(room.admin)}>
                    <h3>{room.admin}'s Room</h3>
                    <span>{room.category}</span>
                    <span>{room.difficulty}</span>
                </li>
                )
            })}
        </ul>
    )
}

export default RoomList;