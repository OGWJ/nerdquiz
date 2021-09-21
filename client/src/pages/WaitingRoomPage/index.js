import React, { useState, useContext, useEffect } from "react";
import { socket } from "../../service/socket";
import { userStartsQuizHandler } from "../../handlers/userRoomInteractionHandlers";
import './style.css';
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";


const getPlayersInRoom = async () => {
  // return await fetch()
  return ['Bob', 'Sal', 'Phil'];
}

const WaitingRoomPage = () => {

  const game = useContext(GameContext);
  const [players, setPlayers] = useState(['']);
  useEffect(async () => {
    // temp
    // will be roomId = game.roomId;
    const roomId = 0;
    // const otherPlayers = await getPlayersInRoom(roomId)
    // setPlayers(otherPlayers + localStorage.getItem('username'));
    setPlayers(["fred", "phil"])
  }, [])

  // Listen for others entering room to update the state
  socket.on('user enter room', eventInfo => {
    setPlayers(prev => prev + eventInfo.player);
  })

  // Listen for other leaving room to update the state
  socket.on('user exits room', eventInfo => {
    setPlayers(prev => prev.filter(player => player != eventInfo.player));
  })

  // TODO create color generation stuff

  const isUsersRoom = () => {
    // get username
    // get admin username
    // compare
    // return
    return true
  };

  const getRoomAdmin = () => {
    // stub
    return 'jessica';
  }

  const handleStuff = () => {
    const roomId = getRoomAdmin();
    userStartsQuizHandler(roomId);
    // temp below
    game.setState(GameStateTypes.QUIZ);
  }

  const handleExitRoom = () => {
    // emit user exited room, then
    game.setState(GameStateTypes.HOME);
  }

  return (
    <div className='p-nav'>
      <button onClick={handleExitRoom}>Exit room</button>
      <h3 className='pt-4 px-4'>{game.roomAdmin}'s Room</h3>
      <h5 className='px-4'><small>Category is</small> <em>Video Games</em></h5>
      <h5 className='px-4'><small>Difficulty is</small> <em>Hard!</em></h5>
      <ul>
        {
          players.map(player => {
            return (<li className='card user-card text-center d-flex flex-column justify-content-center my-3'
              style={{ backgroundColor: '#4e4d83', color: '#ffffff' }}>{player}</li>);
          })
        }
      </ul>
      {isUsersRoom ? <button onClick={handleStuff}>Start Quiz</button> : null}
    </div >
  );
};

export default WaitingRoomPage;
