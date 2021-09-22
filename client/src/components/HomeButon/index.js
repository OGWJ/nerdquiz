import React, { useContext } from 'react';
import { GameContext, GameStateTypes } from '../../models/GameStateTypes';

const HomeButton = ({ text }) => {

    const game = useContext(GameContext);

    const handleClick = () => {
        game.setState(GameStateTypes.HOME)
    }

    return (
        <button
            onClick={handleClick}
            className='btn btn-success'>
            {text}
        </button>
    )
}

export default HomeButton;