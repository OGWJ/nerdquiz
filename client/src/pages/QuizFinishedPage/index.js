import React, { useContext } from "react";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";
import { socket } from "../../service/socket";

import './style.css'

const QuizFinishedPage = () => {

  const game = useContext(GameContext);

  const handleClick = () => {
    game.setState(GameStateTypes.HOME);
  }
  socket.on("quiz ended", settings =>{
    console.log(settings)
  })

  return (
    <>
      <div className='container p-nav leaderboard-container'>
        <table className='table'>
          <thead>
            <tr className='d-flex justify-content-between'>
              <th scope='col'>Rank</th>
              <th scope='col'>Username</th>
              <th scope='col'>Category</th>
              <th scope='col'>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className='d-flex justify-content-between'>
              <th scope='row'>1</th>
              <td>Mad Lad</td>
              <td>Video Games</td>
              <td>69420</td>
            </tr>
            <tr className='d-flex justify-content-between'>
              <th scope='row'>2</th>
              <td>Big Sal 6</td>
              <td>Marvel Films</td>
              <td>666</td>
            </tr>
          </tbody>
        </table>

        <button onClick={handleClick}>Go Again?</button>
      </div>
    </>
  )
};

export default QuizFinishedPage;
