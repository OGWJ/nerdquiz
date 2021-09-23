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
    let settings = createRoomHandler(e);
   
    game.setGameSettings(settings)
    game.setState(GameStateTypes.WAITING_ROOM);
  }

  const goBack = () => {
    game.setState(GameStateTypes.HOME);
  }

  return (
    <div className="p-nav w-100 d-flex justify-content-center">
      <button onClick={goBack} className="btn btn-warning">
        Cancel
      </button>
      <form name="create-room-form" onSubmit={createRoomHandlerWrapper}>
        <select id="category-select" className="form-select my-4 text-center">
          <option value="Video Games">Video Games</option>
          <option value="Board Games">Board Games</option>
          <option value="Comics">Comics</option>
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
  );
};

export default CreateRoomPage;
