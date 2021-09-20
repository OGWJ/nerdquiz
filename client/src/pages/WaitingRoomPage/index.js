import React from "react";
import './style.css';

const WaitingRoomPage = () => {

  // todo get colors for each player
  // with const colorList

  return (
    <div className='p-nav'>
      <h3 className='pt-4 px-4'>Hostmame's Room</h3>
      <h5 className='px-4'><small>Category is</small> <em>Video Games</em></h5>
      <h5 className='px-4'><small>Difficulty is</small> <em>Hard!</em></h5>
      <ul>
        <li className='card user-card text-center d-flex flex-column justify-content-center my-3'
          style={{ backgroundColor: '#4e4d83', color: '#ffffff' }}>Username A</li>
        <li className='card user-card text-center d-flex flex-column justify-content-center my-3'
          style={{ backgroundColor: '#24a14b', color: '#ffffff' }}>Username B</li>
        <li className='card user-card text-center d-flex flex-column justify-content-center my-3'
          style={{ backgroundColor: '#ea323d', color: '#ffffff' }}>Username C</li>
      </ul>
    </div >
  );
};

export default WaitingRoomPage;
