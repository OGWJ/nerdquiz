import React, { useState, useContext, useEffect } from "react";
import { socket } from "../../service/socket";
import { userStartsQuizHandler } from "../../handlers/userRoomInteractionHandlers";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";
import './style.css';
import { PlayerList } from "../../components";

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
    <div className='container row vw-100 p-nav d-flex justify-content-center'>
      <div className='container col-sm'>
        <h3 className='pt-4'>{game.roomAdmin}'s Room</h3>
        <h5 className=''><small>Category is</small> <em>Video Games</em></h5>
        <h5 className=''><small>Difficulty is</small> <em>Hard!</em></h5>
        <div className='container d-flex justify-content-center'>
          {isUsersRoom ? <button onClick={handleStuff} className='btn btn-success m-3'>Start Quiz</button> : null}
          <button onClick={handleExitRoom} className='btn btn-danger m-3'>Exit room</button>
        </div>
      </div>
      <div className='col-sm'>
        <PlayerList players={players} />
      </div>
    </div>
  );
};

export default WaitingRoomPage;
