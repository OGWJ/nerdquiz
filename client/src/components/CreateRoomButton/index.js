import React from "react";

const handleCreateRoom = () => {
    // stub
    game.setState(GameStateTypes.CREATE_ROOM)
}

const CreateRoomButton = () => <button className='btn btn-secondary' onClick={handleCreateRoom}>Create a Room</button>

export default CreateRoomButton;