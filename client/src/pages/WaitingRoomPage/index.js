import React, { useState } from "react";
import { socket } from "../../service/socket";
import './style.css';

const WaitingRoomPage = () => {

  // todo get colors for each player
  // with const colorList

  const [players, setPlayers] = useState(['jessica', 'bill']);

  // Listen for others entering room to update the state
  socket.on('user enter room', eventInfo => {
    setPlayers(prev => prev + eventInfo.player);
  })

  // Listen for other leaving room to update the state
  socket.on('user exits room', eventInfo => {
    setPlayers(prev => prev.filter(player => player != eventInfo.player));
  })

  // TODO create color generation stuff

  return (
    <div className='p-nav'>
      <h3 className='pt-4 px-4'>Hostmame's Room</h3>
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
    </div >
  );
};

export default WaitingRoomPage;
