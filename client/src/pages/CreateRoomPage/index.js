import React from "react";
import { useState } from "react";
import { createRoomHandler } from "../../handlers/createRoomHandler";
import "./style.css";

const CreateRoomPage = () => {
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

  return (
    <div className="p-nav w-100 d-flex justify-content-center">
      <form name="create-room-form" onSubmit={createRoomHandler}>
        <select id="category-select" className="form-select my-4 text-center">
          <option value="A">Video Games</option>
          <option value="B">Board Games</option>
          <option value="C">Comics</option>
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
