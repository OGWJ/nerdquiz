import React, { useState, useEffect, useContext } from "react";
import { socket } from "../../service/socket";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";

import './style.css'
import { RoomList, CreateRoomButton } from "../../components";


const HomePage = () => {

  const game = useContext(GameContext);

  // Get all rooms on mount
  const [rooms, setRooms] = useState([]);
  useEffect(async () => {
    let allRoomsOnMount = [{ admin: 'jessica', category: 'Board Games', difficulty: 'Hard' }] //await fetch(`${apiUrl}${allRoomsEndPoint}`)
    setRooms(allRoomsOnMount);
  }, [])

  // Update rooms when they are created in real-time
  socket.on('create room', newRoom => {
    setRooms(prev => prev + newRoom);
  })

  const joinRoom = roomAdmin => {
    console.log('joined room')
    socket.emit('joined room', {
      username: localStorage.getItem('username'),
      roomAdmin: roomAdmin
    })

    // NOTE: Line below for temporary for development without socket
    game.setState(GameStateTypes.WAITING_ROOM)
  }

  socket.on('user enter room', () => {
    game.setState(GameStateTypes.WAITING_ROOM)
  })

  return (
    <div className='container mt-4 p-nav text-center'>
      <h3 className='mt-3'>Welcome {localStorage.getItem('username')}</h3>
      <div className='container d-flex justify-content-center'>
        <CreateRoomButton />
      </div>
      <ul className='container vw-100 row justify-content-center align-content-center'>
        <h3 className='mt-3'>Join a Room</h3>
        <RoomList rooms={rooms} />
      </ul>
    </div>
  )
};

export default HomePage;
