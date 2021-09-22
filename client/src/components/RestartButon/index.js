import React, { useContext } from 'react';
// import Button from 'react-bootstrap/Button';
import { GameContext, GameStateTypes } from '../../models/GameStateTypes';

const RestartButton = () => {

    const game = useContext(GameContext);

    const handleClick = () => {
        game.setState(GameStateTypes.HOME)
    }

    return (
        <button
            onClick={handleClick}
            className='btn btn-success'>
            Play Again?
        </button>
    )
}

export default RestartButton;