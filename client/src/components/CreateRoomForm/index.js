import React, { useState, useContext } from "react";
import { createRoomHandler } from "../../handlers/createRoomHandler";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";

const createRoomHandlerWrapper = (e) => {
    createRoomHandler(e);
    game.setState(GameStateTypes.WAITING_ROOM);
}

const CreateRoomForm = () => {
    const game = useContext(GameContext);
    const [selectDifficultyColor, setSelectDifficultyColor] = useState("EASY");
    return (
        <form name="create-room-form" onSubmit={createRoomHandlerWrapper}>
            <select id="category-select" className="form-select my-4 text-center">
                <option value="15">Video Games</option>
                <option value="16">Board Games</option>
                <option value="29">Comics</option>
            </select>
            <select
                id="select-difficulty"
                className="form-select my-4 text-center"
                style={{ backgroundColor: selectDifficultyColor }}
            >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
            </select>
            <button type="submit" className="btn btn-success">
                Create the Room!
            </button>
        </form>
    )
}

export default CreateRoomForm;