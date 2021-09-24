import React, { useContext, useState } from "react";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";
import { socket } from "../../service/socket";

import './style.css'

const QuizFinishedPage = () => {

  const game = useContext(GameContext);
  const [settings, setSettings] = useState([])

  const handleClick = () => {
    setSettings("")
    game.setState(GameStateTypes.HOME);
  }
  
  console.log(game.scores)
  let count = 1;
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
    {game.scores.map((user)=>{
      return(
          <tr className='d-flex justify-content-between' >
            <td scope='row'>{count++}</td>
            <td>{user.user}</td>
            <td>{game.gameSettings.category}</td>
            <td>{user.score}</td>
            </tr>)})}
            </tbody>
        </table>
      </div>
      <button onClick={handleClick}>Go Again?</button>
     
    </>
  )};

export default QuizFinishedPage;
