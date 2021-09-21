import React, { useState, useContext, useEffect } from "react";
import { socket } from "../../service/socket";
import { userStartsQuizHandler } from "../../handlers/userRoomInteractionHandlers";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";
import Container from "react-bootstrap/Container";
import './style.css';

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
    <Container className='p-nav d-flex justify-content-center'>
      <Container className='row vw-100'>
        <Container className='col-md'>
          <h3 className='pt-4'>{game.roomAdmin}'s Room</h3>
          <h5 className=''><small>Category is</small> <em>Video Games</em></h5>
          <h5 className=''><small>Difficulty is</small> <em>Hard!</em></h5>
          <Container className='d-flex justify-content-center'>
            {isUsersRoom ? <button onClick={handleStuff} className='m-3'>Start Quiz</button> : null}
            <button onClick={handleExitRoom} className='m-3'>Exit room</button>
          </Container>
        </Container>
        <Container className='col-sm'>
          <ul>
            <h3 className='pt-4'>Who's Playin'?</h3>
            {
              players.map(player => {
                return (<li className='card user-card text-center d-flex flex-column justify-content-center my-3'
                  style={{ backgroundColor: '#4e4d83', color: '#ffffff' }}>{player}</li>);
              })
            }
          </ul>
        </Container>
      </Container>
    </Container >
  );
};

export default WaitingRoomPage;
