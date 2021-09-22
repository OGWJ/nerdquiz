import React, { useContext, useEffect, useState } from "react";
import { GameContext, GameStateTypes } from "../../models/GameStateTypes";

import './style.css'
import { HomeButton } from "../../components";

const Loading = () => {
  return <div class="lds-dual-ring"></div>;
}

const QuizFinishedPage = () => {

  const game = useContext(GameContext);
  // const [scores, setScores] = useState(null);
  const fakeScores = [
    { position: 1, name: 'sophie', score: 15 },
    { position: 2, name: 'fred', score: 10 },
    { position: 3, name: 'phil', score: 4 },
    { position: 4, name: 'henry', score: 0 }
  ]
  const [scores, setScores] = useState(fakeScores)

  const handleClick = () => {
    game.setState(GameStateTypes.HOME);
  }

  useEffect(() => {
    // get the scores, update state!
  }, [])

  if (!scores) {
    return (
      <div className='vh-100 d-flex align-items-center justify-content-center'>
        <Loading />
      </div>
    )
  } else {
    return (
      <>
        <div className='container p-nav leaderboard-container'>
          <table className='table'>
            <thead>
              <tr className='d-flex justify-content-between'>
                <th scope='col'>Rank</th>
                <th scope='col'>Username</th>
                <th scope='col'>Score</th>
              </tr>
            </thead>
            <tbody>
              {
                scores.map(user => {
                  return (
                    <>
                      <tr className='d-flex justify-content-between'>
                        <th scope='row'>{user.position}</th>
                        <td>{user.name}</td>
                        <td>{user.score}</td>
                      </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
          <HomeButton text={'Play Again?'} />
        </div>
      </>
    )
  }
};

export default QuizFinishedPage;
