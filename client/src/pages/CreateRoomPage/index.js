import React, { useState, useContext } from "react";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";
import { createRoomHandler } from "../../handlers/createRoomHandler";
import "./style.css";

const CreateRoomPage = () => {
  const game = useContext(GameContext);
  const [selectDifficultyColor, setSelectDifficultyColor] = useState("EASY");

  const handleChange = (e) => {
    return;
    // switch (e.target.value) {
    //   case 'EASY':
    //     setSelectDifficultyColor('#ffffff');
    //     return;
    //   case 'MEDIUM':
    //     setSelectDifficultyColor('#ffffff');
    //     return;
    //   case 'HARD':
    //     setSelectDifficultyColor('#ffffff');
    //     return;
    // }
  };

  // useEffect(() => {
  // }, [selectDifficultyColor])

  const createRoomHandlerWrapper = (e) => {
    createRoomHandler(e);
    game.setState(GameStateTypes.WAITING_ROOM);
  }

  const goBack = () => {
    game.setState(GameStateTypes.HOME);
  }

  return (
    <div className="container p-nav">
      <button onClick={goBack} className="btn btn-warning">
        Cancel
      </button>
      <div className="w-100 d-flex justify-content-center">
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
      </div>
    </div>
  );
};

export default CreateRoomPage;
