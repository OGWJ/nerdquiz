import React from "react";

const CreateRoomPage = () => {
  return (
    <>
      <form name='create-room-form'>
        <select id="category">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </form>
    </>
  );
};

export default CreateRoomPage;
