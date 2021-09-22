import React from "react";
import { userEntersRoomHandler } from '../../handlers/userRoomInteractionHandlers';

// TODO get one from list of predef colors
const getPlayerCardColor = () => '#4e4d83';

const PlayerList = ({ players }) => {
    let count = 0;
    return (
        <ul>
            <h3 key={0} className='pt-4'>Who's Playin'?</h3>
            {
                players.map(player => {
                    return (<li key={++count} className='card user-card text-center d-flex flex-column justify-content-center my-3'
                        style={{ backgroundColor: getPlayerCardColor, color: '#ffffff' }}>{player}</li>);
                })
            }
        </ul>
    )
}

export default PlayerList;